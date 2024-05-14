import FoxentryException from './FoxentryException';

/**
 * ServerErrorException
 *
 * This exception is thrown when the server encounters an internal error.
 * It represents a 500 Internal Server Error status code.
 */
export default class ServerErrorException extends FoxentryException {
    /**
     * The HTTP status code associated with this exception.
     */
    protected code: number = 500;
}
