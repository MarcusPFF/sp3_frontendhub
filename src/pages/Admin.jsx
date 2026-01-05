import { useState, useEffect, useCallback } from "react";
import facade from "../apiFacade.js";
import styles from "./Admin.module.css";

const AVAILABLE_ROLES = ["user", "admin"];

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [expandedUsers, setExpandedUsers] = useState(new Set());
  const [newRoleForUser, setNewRoleForUser] = useState({});

  const loadUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const data = await facade.userFacade.getAll();
      setUsers(data);
    } catch (err) {
      let errorMessage = "Failed to load users. Please try again.";
      if (err.message) {
        errorMessage = err.message;
      } else if (err.status === 0) {
        errorMessage = "Unable to connect to server. Please make sure the API server is running on http://localhost:7070";
      } else if (err.status) {
        errorMessage = `Error ${err.status}: Failed to load users.`;
      }
      setError(errorMessage);
      console.error("Error loading users:", err);
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
      // Clear the new role input for this user when closing
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
    if (!role || !role.trim()) {
      setError("Please select a role to add");
      return;
    }
    setError(null);
    setSuccess(null);
    try {
      await facade.userFacade.addRole(userDTO, role);
      setSuccess(`Role "${role}" added to user "${userDTO.username}"`);
      setNewRoleForUser(prev => {
        const updated = { ...prev };
        delete updated[userDTO.username];
        return updated;
      });
      await loadUsers();
    } catch (err) {
      let errorMessage = "Failed to add role. Please try again.";
      if (err.message) {
        errorMessage = err.message;
      }
      setError(errorMessage);
      console.error("Error adding role:", err);
    }
  };

  const handleRemoveRole = async (userDTO, role) => {
    setError(null);
    setSuccess(null);
    try {
      await facade.userFacade.removeRole(userDTO, role);
      setSuccess(`Role "${role}" removed from user "${userDTO.username}"`);
      await loadUsers();
    } catch (err) {
      let errorMessage = "Failed to remove role. Please try again.";
      if (err.message) {
        errorMessage = err.message;
      }
      setError(errorMessage);
      console.error("Error removing role:", err);
    }
  };

  const handleDeleteUser = async (userDTO) => {
    if (!window.confirm(`Are you sure you want to delete user "${userDTO.username}"?`)) {
      return;
    }
    setError(null);
    setSuccess(null);
    try {
      await facade.userFacade.delete(userDTO);
      setSuccess(`User "${userDTO.username}" deleted successfully`);
      // Remove from expanded if it was expanded
      const newExpanded = new Set(expandedUsers);
      newExpanded.delete(userDTO.username);
      setExpandedUsers(newExpanded);
      await loadUsers();
    } catch (err) {
      let errorMessage = "Failed to delete user. Please try again.";
      if (err.message) {
        errorMessage = err.message;
      }
      setError(errorMessage);
      console.error("Error deleting user:", err);
    }
  };

  const getRolesDisplay = (roles) => {
    if (!roles || roles.length === 0) {
      return "No roles";
    }
    return Array.isArray(roles) ? roles.join(", ") : roles;
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
              {users.map((user) => {
                const isExpanded = expandedUsers.has(user.username);
                const availableRolesToAdd = AVAILABLE_ROLES.filter(
                  (role) => !user.roles || !user.roles.includes(role)
                );

                return (
                  <div key={user.username} className={styles.userRow}>
                    <div
                      className={styles.userRowHeader}
                      onClick={() => toggleUser(user.username)}
                    >
                      <div className={styles.userRowInfo}>
                        <span className={styles.userRowName}>{user.username}</span>
                        <span className={styles.userRowRoles}>
                          {getRolesDisplay(user.roles)}
                        </span>
                      </div>
                      <span className={styles.expandIcon}>
                        {isExpanded ? "▼" : "▶"}
                      </span>
                    </div>

                    {isExpanded && (
                      <div className={styles.userRowContent}>
                        <div className={styles.expandedSection}>
                          <div className={styles.rolesSection}>
                            <h3 className={styles.rolesTitle}>Roles:</h3>
                            {user.roles && user.roles.length > 0 ? (
                              <div className={styles.rolesList}>
                                {user.roles.map((role) => (
                                  <div key={role} className={styles.roleBadge}>
                                    <span>{role}</span>
                                    <button
                                      className={styles.removeRoleButton}
                                      onClick={() => handleRemoveRole(user, role)}
                                      title={`Remove role "${role}"`}
                                    >
                                      ×
                                    </button>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className={styles.noRoles}>No roles assigned</p>
                            )}
                          </div>

                          {availableRolesToAdd.length > 0 && (
                            <div className={styles.addRoleSection}>
                              <h3 className={styles.rolesTitle}>Add Role:</h3>
                              <div className={styles.addRoleForm}>
                                <select
                                  className={styles.roleSelect}
                                  value={newRoleForUser[user.username] || ""}
                                  onChange={(e) =>
                                    setNewRoleForUser({
                                      ...newRoleForUser,
                                      [user.username]: e.target.value,
                                    })
                                  }
                                >
                                  <option value="">Select a role...</option>
                                  {availableRolesToAdd.map((role) => (
                                    <option key={role} value={role}>
                                      {role}
                                    </option>
                                  ))}
                                </select>
                                <button
                                  className={styles.addButton}
                                  onClick={() =>
                                    handleAddRole(
                                      user,
                                      newRoleForUser[user.username]
                                    )
                                  }
                                  disabled={!newRoleForUser[user.username]}
                                >
                                  Add Role
                                </button>
                              </div>
                            </div>
                          )}

                          <div className={styles.deleteSection}>
                            <button
                              className={styles.deleteUserButton}
                              onClick={() => handleDeleteUser(user)}
                            >
                              Delete User
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
