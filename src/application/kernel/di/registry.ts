/* eslint-disable @typescript-eslint/no-explicit-any */
export class Registry {
  private static instance: Registry | undefined;

  static getInstance() {
    if (!this.instance) {
      this.instance = new Registry();
    }

    return this.instance;
  }

  private constructor() {}

  private readonly implementations: Map<string, Registry.Implementations> =
    new Map();

  register(impl: Registry.Constructor, token?: string) {
    token = token ?? impl.name;

    if (this.implementations.has(token)) {
      throw new Error(`Provider ${token} already registered.`);
    }

    this.implementations.set(token, impl);
  }

  resolve<TImpl extends Registry.Constructor>(
    impl: TImpl,
    token?: string,
  ): InstanceType<TImpl> {
    token = token ?? impl.name;
    const implementation = this.implementations.get(token);

    if (!implementation) {
      throw new Error(`Provider ${token} not registered.`);
    }

    const paramTypes: object[] =
      Reflect.getMetadata("design:paramtypes", implementation) ?? [];
    const deps = paramTypes.filter(Boolean).map((_, index) => {
      const dependencyToken = Reflect.getMetadata(
        `inject:${index}`,
        implementation,
      );

      return this.resolve(dependencyToken, dependencyToken);
    });

    return new implementation(...deps);
  }
}

export namespace Registry {
  export type Constructor<T = any> = new (...args: any[]) => T;
  export type Implementations = Constructor;
}
