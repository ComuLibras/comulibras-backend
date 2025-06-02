const HTTP_RESPONSE_METADATA_KEY = "http-response";

export function HttpResponse(statusCode: Http.StatusCode) {
  return (target: object) => {
    Reflect.defineMetadata(HTTP_RESPONSE_METADATA_KEY, statusCode, target);
  };
}

export function getHttpResponse(target: object): Http.StatusCode {
  return Reflect.getMetadata(HTTP_RESPONSE_METADATA_KEY, target.constructor);
}
