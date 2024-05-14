import FoxentryException from "./FoxentryException";

/**
 * BadRequestException
 *
 * This exception is thrown when the request is invalid or cannot be processed.
 * It represents a 400 Bad Request status code.
 */
export default class BadRequestException extends FoxentryException {
    /**
     * The HTTP status code associated with this exception.
     */
    protected code: number = 400;
}
