import FoxentryException from './FoxentryException';

/**
 * ServiceUnavailableException
 *
 * This exception is thrown when the service or endpoint is temporarily unavailable.
 * It represents a 503 Service Unavailable status code.
 */
export default class ServiceUnavailableException extends FoxentryException {
    /**
     * The HTTP status code associated with this exception.
     */
    protected code: number = 503;
}
