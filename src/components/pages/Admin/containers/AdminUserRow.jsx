import styles from "../css-modules/Admin.module.css";

const AVAILABLE_ROLES = ["user", "admin"];

export default function AdminUserRow({
  user,
  currentUsername,
  isExpanded,
  newRoleForUser,
  onToggle,
  onAddRole,
  onRemoveRole,
  onDeleteUser,
  onRoleSelectChange,
}) {
  const isCurrentUser = user.username === currentUsername;
  const availableRolesToAdd = AVAILABLE_ROLES.filter(
    (role) => !user.roles || !user.roles.includes(role)
  );

  const getRolesDisplay = (roles) => {
    if (!roles || roles.length === 0) return "No roles";
    return Array.isArray(roles) ? roles.join(", ") : roles;
  };

  const renderRoleBadge = (role) => {
    return (
      <div key={role} className={styles.roleBadge}>
        <span>{role}</span>
        {!isCurrentUser && (
          <button
            className={styles.removeRoleButton}
            onClick={() => onRemoveRole(user, role)}
            title={`Remove role "${role}"`}
          >
            ×
          </button>
        )}
      </div>
    );
  };

  const renderRoleOption = (role) => {
    return (
      <option key={role} value={role}>
        {role}
      </option>
    );
  };

  return (
    <div className={styles.userRow}>
      <div className={styles.userRowHeader} onClick={() => onToggle(user.username)}>
        <div className={styles.userRowInfo}>
          <span className={styles.userRowName}>{user.username}</span>
          <span className={styles.userRowRoles}>{getRolesDisplay(user.roles)}</span>
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
              {user.roles && user.roles.length > 0 ? 
                (<div className={styles.rolesList}>
                  {user.roles.map(renderRoleBadge)}
                </div>) 
                : 
                (<p className={styles.noRoles}>No roles assigned</p>)
              }
              {isCurrentUser && (
                  <p className={styles.disabledHint}>
                    You cannot modify roles for your own account
                    </p>)
              }
            </div>

            {availableRolesToAdd.length > 0 && (
              <div className={styles.addRoleSection}>
                <h3 className={styles.rolesTitle}>Add Role:</h3>
                <div className={styles.addRoleForm}>
                  <select
                    className={styles.roleSelect}
                    value={newRoleForUser[user.username] || ""}
                    onChange={(e) => onRoleSelectChange(user.username, e.target.value)}
                    disabled={isCurrentUser}
                  >
                    <option value="">Select a role...</option>
                    {availableRolesToAdd.map(renderRoleOption)}
                  </select>
                  <button
                    className={styles.addButton}
                    onClick={() => onAddRole(user, newRoleForUser[user.username])}
                    disabled={!newRoleForUser[user.username] || isCurrentUser}
                  >
                    Add Role
                  </button>
                </div>
                {isCurrentUser && (
                  <p className={styles.disabledHint}>You cannot modify roles for your own account</p>
                )}
              </div>
            )}

            <div className={styles.deleteSection}>
              <button
                className={styles.deleteUserButton}
                onClick={() => onDeleteUser(user)}
                disabled={isCurrentUser}
              >
                Delete User
              </button>
              {isCurrentUser && (
                <p className={styles.disabledHint}>You cannot delete your own account</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

