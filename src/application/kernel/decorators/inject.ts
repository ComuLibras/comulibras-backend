export function Inject(token: string) {
  return (target: object, key: string | undefined, index: number) => {
    Reflect.defineMetadata(`inject:${index}`, token, target);
  };
}
