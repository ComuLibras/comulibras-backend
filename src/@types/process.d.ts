declare module "process" {
  global {
    namespace NodeJS {
      interface ProcessEnv {
        readonly PORT: string;
        readonly JWT_SECRET: string;
      }
    }
  }
}
