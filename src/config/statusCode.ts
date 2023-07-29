///
// ? Successful Responses (2xx)
///

export const HTTP_STATUS_OK = 200
export const HTTP_STATUS_CREATED = 201
export const HTTP_STATUS_NOT_CONTENT = 204

///
// ? Client Error Responses (4xx)
///

export const HTTP_STATUS_BAD_REQUEST = 400
export const HTTP_STATUS_UNAUTHORIZED = 401
export const HTTP_STATUS_FORBIDDEN = 403
export const HTTP_STATUS_NOT_FOUND = 404
export const HTTP_STATUS_NOT_ALLOWED = 405
export const HTTP_STATUS_NOT_ACCEPTABLE = 406
export const HTTP_STATUS_PROXY_AUTH_REQU = 407
export const HTTP_STATUS_REQUEST_TIMEOUT = 408
export const HTTP_STATUS_CONFLICT = 409
export const HTTP_STATUS_GONE = 410
export const HTTP_STATUS_LENGT_REQUIRED = 411
export const HTTP_STATUS_PRE_CONDITION_FAILED = 412
export const HTTP_STATUS_PAYLOAD_TOO_LARGE = 413
export const HTTP_STATUS_URI_TOO_LARGE = 414
export const HTTP_STATUS_UNSUPPORTED_MEDIA_TYPE = 415
export const HTTP_STATUS_RANGE_NOT_SATISFIABLE = 416
export const HTTP_STATUS_EXPECTATION_FAILED = 417
export const HTTP_STATUS_UNPROCESSABLE_ENTITY = 422
export const HTTP_STATUS_UPGRADE_REQUIRED = 426
export const HTTP_STATUS_PRECONDITION_REQUIRED = 428
export const HTTP_STATUS_TOO_MANY_REQUEST = 429
export const HTTP_STATUS_REQUEST_HEAD_TOO_LARGE = 431
export const HTTP_STATUS_UNAVAILABLE_LEGAL_REASON = 451

/**
 * ? Server error responses (5xx)
 */

export const HTTP_STATUS_INTERNAL_SERVER_ERROR = 500
export const HTTP_STATUS_NOT_IMPLEMENTED = 501
