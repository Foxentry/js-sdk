import { Response } from '../../src/Response';
import ApiClient from '../../src/ApiClient';

/**
 * Tests for Email Search API endpoint
 */
describe('Email Search', () => {
    let api: ApiClient;

    beforeAll(() => {
        const apiKey = process.env.API_KEY; // API key need to be set in the test/config.ts file
        api = new ApiClient(apiKey);
    });

    /**
   * Test valid email search.
   */
    test('search results', async () => {
        // Input string for email search.
        const input = 'info@';

        // Options that will be sent within the request.
        const options = {
            resultsLimit: 5
        };

        // Perform email search.
        const response: Response = await api.email.setOptions(options).search(input);
        const result = response.getResult();

        // Assertions.
        expect(response).toBeInstanceOf(Response);
        expect(response.getStatus()).toEqual(200);
        expect(response.getErrors()).toHaveLength(0);
        expect(response.getResponse().resultsCount).toBeGreaterThan(0);
        expect(result).not.toBeNull();
    });

    /**
     * Test email search when the input parameter is specified as the entire query.
     */
    test('query input', async () => {
        // Query that will be sent to the API for validation.
        const query = {
            value: 'info@'
        };

        // Options that will be sent within the request.
        const options = {
            resultsLimit: 5
        };

        // Perform email validation.
        const response: Response = await api.email.setOptions(options).search(query);

        // Assertions.
        expect(response).toBeInstanceOf(Response);
        expect(response.getStatus()).toEqual(200);
    });

});
