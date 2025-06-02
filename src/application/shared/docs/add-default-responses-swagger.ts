import { Operation } from "swagger-jsdoc";

type DefaultResponse = "400" | "401" | "403" | "500";
interface IOptions {
  omitResponses: DefaultResponse[];
}

export function addDefaultResponsesSwagger(
  operation: Operation,
  options?: IOptions,
): Operation {
  const formattedOperation = {
    ...operation,
    responses: {
      "400": { $ref: "#/components/responses/ValidationError" },
      "401": { $ref: "#/components/responses/UnauthorizedError" },
      "403": { $ref: "#/components/responses/ForbiddenError" },
      "500": { $ref: "#/components/responses/InternalServerError" },
      ...operation.responses,
    },
  };

  (options?.omitResponses ?? []).forEach((omitResponse) => {
    delete formattedOperation.responses[omitResponse];
  });

  return formattedOperation;
}
