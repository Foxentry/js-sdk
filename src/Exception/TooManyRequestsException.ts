import FoxentryException from './FoxentryException';

/**
 * TooManyRequestsException
 *
 * This exception is thrown when there are too many requests made in a given time frame.
 * It represents a 429 Too Many Requests status code.
 */
export default class TooManyRequestsException extends FoxentryException {
    /**
     * The HTTP status code associated with this exception.
     */
    protected code: number = 429;
}
