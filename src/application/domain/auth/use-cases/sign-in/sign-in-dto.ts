import { generateSchema } from "@anatine/zod-openapi";
import { z } from "zod";

export const signInBody = z.object({
  email: z.string().email().min(1),
  password: z.string().min(8),
});

export const signInOpenAPIBody = generateSchema(signInBody);

export type SignInBody = z.infer<typeof signInBody>;
