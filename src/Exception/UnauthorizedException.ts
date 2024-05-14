import FoxentryException from './FoxentryException';

/**
 * UnauthorizedException
 *
 * This exception is thrown when the request is unauthorized.
 * Usually triggered when API authentication fails or an invalid API key is used.
 */
export default class UnauthorizedException extends FoxentryException {
    /**
     * The HTTP status code associated with this exception.
     */
    protected code: number = 401;
}
