import { generateSchema } from "@anatine/zod-openapi";
import { Operation } from "swagger-jsdoc";
import { z } from "zod";
import { Tags } from "../../../shared/docs/tags";
import { Roles } from "../../accounts/entities/role";

export const ACCOUNT_ALREADY_EXISTS_ERROR =
  "Já existe uma conta com este e-mail";

export const signUpSchema = z.object({
  accessToken: z.string().jwt(),
  role: z.nativeEnum(Roles).default(Roles.USER),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;

export const signUpHttpSchema = generateSchema(signUpSchema);

export const signUpSwagger: Operation = {
  tags: [Tags.AUTH],
  summary: "Criar uma conta",
  description: "Cria uma nova conta no sistema",
  security: [],
  requestBody: {
    required: true,
    content: {
      "application/json": {
        schema: { $ref: "#/components/schemas/SignUp" },
      },
    },
  },
  responses: {
    "200": {
      description: "Conta criada com sucesso",
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/SignUpResponse" },
        },
      },
    },
    "409": {
      description: "Conta já existe",
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/ErrorsResponse" },
          example: { messages: [ACCOUNT_ALREADY_EXISTS_ERROR] },
        },
      },
    },
  },
};
