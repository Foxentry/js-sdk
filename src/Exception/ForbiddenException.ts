import FoxentryException from './FoxentryException';

/**
 * ForbiddenException
 *
 * This exception is thrown when access to a resource is forbidden for the current user or client.
 * It represents a 403 Forbidden status code.
 */
export default class ForbiddenException extends FoxentryException {
    /**
     * The HTTP status code associated with this exception.
     */
    protected code: number = 403;
}
