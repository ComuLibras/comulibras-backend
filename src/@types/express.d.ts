declare namespace Express {
  type Roles =
    import("@domain/accounts/entities/role").Roles;
  interface Request {
    metadata?: {
      account?: {
        id: string;
        role: Roles;
      };
    };
  }
}
