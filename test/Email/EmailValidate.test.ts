import ApiClient from "../../src/ApiClient";
import { Response } from "../../src/Response";

/**
 * Tests for Email Validate API endpoint
 */
describe('Email Validate', () => {
    let api: ApiClient;

    beforeAll(() => {
        const apiKey = process.env.API_KEY; // API key need to be set in the test/config.ts file
        api = new ApiClient(apiKey);
    });

    /**
     * Valid email validation test
     */
    test('valid email', async () => {
        const emailToValidate = 'info@foxentry.com';
        const options = { validationType: 'extended' }; // Set validation type to extended

        const response: Response = await api.email().setOptions(options).validate(emailToValidate);
        const result = response.getResult();

        expect(response).toBeInstanceOf(Response);
        expect(response.getStatus()).toBe(200);
        expect(result.isValid).toBe(true);
        expect(result.proposal).toBe('valid');
        expect(result.data).toBeTruthy();
    });

    /**
     * Invalid email validation test
     */
    test('invalid email', async () => {
        const emailToValidate = 'invalidUser@foxentry.com';
        const options = { validationType: 'extended' }; // Set validation type to extended

        const response: Response = await api.email().setOptions(options).validate(emailToValidate);
        const result = response.getResult();

        expect(response).toBeInstanceOf(Response);
        expect(response.getStatus()).toBe(200);
        expect(result.isValid).toBe(false);
        expect(result.proposal).toBe('invalid');
        expect(result.errors).toBeTruthy();
    });

    /**
     * Invalid email with suggestion validation test
     */
    test('invalid email with suggestion', async () => {
        const emailToValidate = 'info@gmali.com';
        const options = { validationType: 'extended' }; // Set validation type to extended

        const response: Response = await api.email().setOptions(options).validate(emailToValidate);
        const result = response.getResult();

        expect(response).toBeInstanceOf(Response);
        expect(response.getStatus()).toBe(200);
        expect(result.isValid).toBe(false);
        expect(result.proposal).toBe('invalidWithSuggestion');
        expect(response.getSuggestions()).toBeTruthy();
    });

    /**
     * Invalid email with correction validation test
     */
    test('invalid email with correction', async () => {
        const emailToValidate = 'info@foxentry,com'; // Comma instead of dot
        const options = { validationType: 'extended' }; // Set validation type to extended

        const response: Response = await api.email().setOptions(options).validate(emailToValidate);
        const result = response.getResult();

        expect(response).toBeInstanceOf(Response);
        expect(response.getStatus()).toBe(200);
        expect(result.isValid).toBe(false);
        expect(result.proposal).toBe('invalidWithCorrection');
        expect(response.getResultCorrected()).toBeTruthy();
    });

    /**
     * Invalid email with partial correction validation test
     */
    test('invalid email with partial correction', async () => {
        const emailToValidate = 'infogmail.com'; // Missing "@" symbol
        const options = { validationType: 'extended' }; // Set validation type to extended

        const response: Response = await api.email().setOptions(options).validate(emailToValidate);
        const result = response.getResult();

        expect(response).toBeInstanceOf(Response);
        expect(response.getStatus()).toBe(200);
        expect(result.isValid).toBe(false);
        expect(result.proposal).toBe('invalidWithPartialCorrection');
        expect(response.getResultCorrected()).toBeTruthy();
    });

    /**
     * Disallowed disposable email validation test
     */
    test('disallowed disposable email', async () => {
        const emailToValidate = 'rasini3451@naymedia.com';
        const options = { acceptDisposableEmails: false }; // Disposable emails not accepted

        const response: Response = await api.email().setOptions(options).validate(emailToValidate);
        const result = response.getResult();

        expect(response).toBeInstanceOf(Response);
        expect(response.getStatus()).toBe(200);
        expect(result.isValid).toBe(false);
        expect(result.proposal).toBe('invalid');
        expect(result.flags.isDisposableEmailAddress).toBe(true);
        expect(result.errors).toBeTruthy();
    });

    /**
     * Disallowed freemail validation test
     */
    test('disallowed freemail', async () => {
        const emailToValidate = 'info@gmail.com';
        const options = { acceptFreemails: false }; // Freemails not accepted

        const response: Response = await api.email().setOptions(options).validate(emailToValidate);
        const result = response.getResult();

        expect(response).toBeInstanceOf(Response);
        expect(response.getStatus()).toBe(200);
        expect(result.isValid).toBe(false);
        expect(result.proposal).toBe('invalid');
        expect(result.flags.isFreemail).toBe(true);
        expect(result.errors).toBeTruthy();
    });

    /**
     * Custom ID validation test
     */
    test('email with custom ID', async () => {
        const customRequestId = 'orderEmailValidation'; // Set custom request ID
        const emailToValidate = 'info@foxentry.com';

        const response: Response = await api.email().setCustomId(customRequestId).validate(emailToValidate);
        const request = response.getRequest();

        expect(response).toBeInstanceOf(Response);
        expect(response.getStatus()).toBe(200);
        expect(request.customId).toBe(customRequestId);
    });

    /**
     * Client information validation test
     */
    test('email with client information', async () => {
        const emailToValidate = 'info@foxentry.com';

        const response: Response = await api.email()
            .setClientCountry('CZ')
            .setClientIP('127.0.0.1')
            .setClientLocation(50.073658, 14.418540)
            .validate(emailToValidate);

        const result = response.getResult();

        expect(response).toBeInstanceOf(Response);
        expect(response.getStatus()).toBe(200);
        expect(result.isValid).toBe(true);
    });

    /**
     * Query as input validation test
     */
    test('email when passing query as input', async () => {
        const query = { email: 'info@foxentry.com' }; // Set query as input
        const options = { validationType: 'extended' }; // Set validation type to extended

        const response: Response = await api.email().setOptions(options).validate(query);

        expect(response).toBeInstanceOf(Response);
        expect(response.getStatus()).toBe(200);
    });

    /**
     * Response headers test
     */
    test('response headers', async () => {
        const emailToValidate = 'info@foxentry.com';
        const options = { validationType: 'extended' };// Set validation type to extended

        const response: Response = await api.email().setOptions(options).validate(emailToValidate)

        expect(response).toBeInstanceOf(Response);
        expect(response.getStatus()).toBe(200);
        expect(response.getHeaders()).toBeTruthy();
        expect(response.getRateLimit()).toBeDefined();
        expect(response.getRateLimitPeriod()).toBeDefined();
        expect(response.getRateLimitRemaining()).toBeDefined();
        expect(response.getDailyCreditsLeft()).toBeDefined();
        expect(response.getDailyCreditsLimit()).toBeDefined();
        expect(response.getApiVersion()).toBeDefined();
    });

    test("settings should not persist between calls", async () => {
        const response: Response = await api.email()
          .includeRequestDetails(true)
          .validate('info@foxentry.com');
        const result = response.getRequest();
        expect(result.query).not.toBeUndefined();

        const secondResponse: Response = await api.email()
          .validate('info@foxentry.com');
        const secondResult = secondResponse.getRequest();
        expect(secondResult.query).toBeUndefined();
    });
});
