export default class FoxentryException extends Error {
    protected code: number = 0;

    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, FoxentryException.prototype);
    }

    /**
     * Returns the message associated with the exception.
     *
     * @return {string} The message associated with the exception.
     */
    public getMessage(): string {
        return this.message
    }

    /**
     * Returns the code associated with the exception, or null if no code is set.
     *
     * @return {number | null} The code associated with the exception, or null if without code.
     */
    public getStatusCode(): number | null {
        return this.code
    }
}