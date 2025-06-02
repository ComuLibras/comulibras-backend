import { type ZodSchema } from 'zod';

export type Schemas = {
  body?: ZodSchema;
  query?: ZodSchema;
  params?: ZodSchema;
};

export function Schema(schemas: Schemas) {
  return (target: object) => {
    Object.entries(schemas).forEach(([key, value]) => {
      Reflect.defineMetadata(`schema.${key}`, value, target);
    });
  };
}

export function getSchema(
  target: object,
  key: keyof Schemas,
): ZodSchema | undefined {
  return Reflect.getMetadata(`schema.${key}`, target.constructor);
}
