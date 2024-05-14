import FoxentryException from './FoxentryException';

/**
 * PaymentRequiredException
 *
 * This exception is thrown when payment is required to access a service or resource.
 * It represents a 402 Payment Required status code.
 */
export default class PaymentRequiredException extends FoxentryException {
    /**
     * The HTTP status code associated with this exception.
     */
    protected code: number = 402;
}
