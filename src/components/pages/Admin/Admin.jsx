import { useState, useEffect, useCallback } from "react";
import facade from "../../../apiFacade.js";
import { useAuth } from "../../../security/Auth";
import { logError, logInfo } from "../../../utils/logger";
import { showErrorNotification, showSuccessNotification } from "../../../utils/notification";
import AdminUserRow from "./containers/AdminUserRow";
import styles from "./css-modules/Admin.module.css";

export default function Admin() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [expandedUsers, setExpandedUsers] = useState(new Set());
  const [newRoleForUser, setNewRoleForUser] = useState({});

  const getErrorMessage = (err, defaultMsg) => {
    if (err.message) return err.message;
    if (err.status === 0) return "Unable to connect to server. Please make sure the API server is running.";
    if (err.status) return `Error ${err.status}: ${defaultMsg}`;
    return defaultMsg;
  };

  const handleSuccess = (message, logData) => {
    setSuccess(message);
    logInfo("Operation successful", logData);
    showSuccessNotification(message);
  };

  const handleError = (err, defaultMsg, logData) => {
    const errorMessage = getErrorMessage(err, defaultMsg);
    setError(errorMessage);
    logError("Operation failed", err, logData);
    showErrorNotification(errorMessage);
  };

  const loadUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const data = await facade.userFacade.getAll();
      setUsers(data);
    } catch (err) {
      handleError(err, "Failed to load users. Please try again.", { status: err.status });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const toggleUser = (username) => {
    const newExpanded = new Set(expandedUsers);
    if (newExpanded.has(username)) {
      newExpanded.delete(username);
      setNewRoleForUser(prev => {
        const updated = { ...prev };
        delete updated[username];
        return updated;
      });
    } else {
      newExpanded.add(username);
    }
    setExpandedUsers(newExpanded);
  };

  const handleAddRole = async (userDTO, role) => {
    if (userDTO.username === currentUser.username) {
      setError("You cannot modify roles for your own account");
      showErrorNotification("You cannot modify roles for your own account");
      return;
    }
    if (!role || !role.trim()) {
      setError("Please select a role to add");
      return;
    }
    setError(null);
    setSuccess(null);
    try {
      await facade.userFacade.addRole(userDTO, role);
      const successMsg = `Role "${role}" added to user "${userDTO.username}"`;
      handleSuccess(successMsg, { user: userDTO.username, role });
      setNewRoleForUser(prev => {
        const updated = { ...prev };
        delete updated[userDTO.username];
        return updated;
      });
      await loadUsers();
    } catch (err) {
      handleError(err, "Failed to add role. Please try again.", { user: userDTO.username, role });
    }
  };

  const handleRemoveRole = async (userDTO, role) => {
    if (userDTO.username === currentUser.username) {
      setError("You cannot modify roles for your own account");
      showErrorNotification("You cannot modify roles for your own account");
      return;
    }
    setError(null);
    setSuccess(null);
    try {
      await facade.userFacade.removeRole(userDTO, role);
      const successMsg = `Role "${role}" removed from user "${userDTO.username}"`;
      handleSuccess(successMsg, { user: userDTO.username, role });
      await loadUsers();
    } catch (err) {
      handleError(err, "Failed to remove role. Please try again.", { user: userDTO.username, role });
    }
  };

  const handleDeleteUser = async (userDTO) => {
    if (userDTO.username === currentUser.username) {
      setError("You cannot delete your own account");
      showErrorNotification("You cannot delete your own account");
      return;
    }
    if (!window.confirm(`Are you sure you want to delete user "${userDTO.username}"?`)) {
      return;
    }
    setError(null);
    setSuccess(null);
    try {
      await facade.userFacade.delete(userDTO);
      const successMsg = `User "${userDTO.username}" deleted successfully`;
      handleSuccess(successMsg, { user: userDTO.username });
      const newExpanded = new Set(expandedUsers);
      newExpanded.delete(userDTO.username);
      setExpandedUsers(newExpanded);
      await loadUsers();
    } catch (err) {
      handleError(err, "Failed to delete user. Please try again.", { user: userDTO.username });
    }
  };

  const handleRoleSelectChange = (username, role) => {
    setNewRoleForUser(prev => ({
      ...prev,
      [username]: role,
    }));
  };

  return (
    <section className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Admin - User Management</h1>

        {loading && <p className={styles.message}>Loading users...</p>}

        {error && (
          <div className={styles.error}>
            <p>{error}</p>
            <button className={styles.dismissButton} onClick={() => setError(null)}>
              Dismiss
            </button>
          </div>
        )}

        {success && (
          <div className={styles.success}>
            <p>{success}</p>
            <button className={styles.dismissButton} onClick={() => setSuccess(null)}>
              Dismiss
            </button>
          </div>
        )}

        {!loading && !error && users.length === 0 && (
          <p className={styles.message}>No users found.</p>
        )}

        {!loading && !error && users.length > 0 && (
          <div className={styles.scrollContainer}>
            <div className={styles.userList}>
              {users.map((user) => (
                <AdminUserRow
                  key={user.username}
                  user={user}
                  currentUsername={currentUser.username}
                  isExpanded={expandedUsers.has(user.username)}
                  newRoleForUser={newRoleForUser}
                  onToggle={toggleUser}
                  onAddRole={handleAddRole}
                  onRemoveRole={handleRemoveRole}
                  onDeleteUser={handleDeleteUser}
                  onRoleSelectChange={handleRoleSelectChange}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

