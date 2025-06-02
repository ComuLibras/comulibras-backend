declare namespace Express {
  type Roles =
    import("../../src/application/domain/accounts/entities/role").Roles;
  interface Request {
    metadata?: {
      account?: {
        id: string;
        role: Roles;
      };
    };
  }
}
