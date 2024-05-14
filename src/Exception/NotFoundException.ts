import FoxentryException from './FoxentryException';

/**
 * NotFoundException
 *
 * This exception is thrown when a resource or endpoint is not found on the server.
 * It represents a 404 Not Found status code.
 */
export default class NotFoundException extends FoxentryException {
    /**
     * The HTTP status code associated with this exception.
     */
    protected code: number = 404;
}
