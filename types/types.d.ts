
// Create a type for the roles
export type Role = "admin" | "teacher" | "student";

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Role; // <-- fixed from Roles to Role
    };
  }
}

declare global {
  // eslint-disable-next-line no-var
  var _mongoose:
    | {
        conn: mongoose.Connection | null;
        promise: Promise<mongoose.Connection> | null;
      }
    | undefined;
}

export {};
