export const ROLES = {
  USER: "USER",
  ADMIN: "ADMIN",
} as const;

export const PERMISSIONS = {
  VIEW_USERS: "VIEW_USERS",
  MANAGE_USERS: "MANAGE_USERS",
  VIEW_ANALYTICS: "VIEW_ANALYTICS",
  MANAGE_CONTENT: "MANAGE_CONTENT",
  VIEW_LOGS: "VIEW_LOGS",
} as const;

export const ROLE_PERMISSIONS = {
  USER: [] as string[],

  ADMIN: [
    PERMISSIONS.VIEW_USERS,
    PERMISSIONS.MANAGE_USERS,
    PERMISSIONS.VIEW_ANALYTICS,
    PERMISSIONS.MANAGE_CONTENT,
    PERMISSIONS.VIEW_LOGS,
  ],
};

export const hasPermission = ({
  role,
  permission,
}: {
  role: keyof typeof ROLE_PERMISSIONS;
  permission: (typeof PERMISSIONS)[keyof typeof PERMISSIONS];
}) => {
  return ROLE_PERMISSIONS[role]?.includes(permission);
};