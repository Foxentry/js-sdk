import { ApiClient, Response } from "../../src/index";

/**
 * Tests for Company Search API endpoint
 */
describe('Company Search', () => {
    let api: ApiClient;

    beforeAll(() => {
        const apiKey = process.env.API_KEY; // API key need to be set in the test/config.ts file
        api = new ApiClient(apiKey);
    });

    test("valid company name search", async () => {
        const query = {
            type: 'name',
            value: 'Web'
        };

        const options = {
            resultsLimit: 10
        };

        const response: Response = await api.company().setOptions(options).search(query);
        const result = response.getResult();

        expect(response).toBeInstanceOf(Response);
        expect(response.getStatus()).toBe(200);
        expect(response.getErrors()).toHaveLength(0);
        expect(response.getResponse()?.resultsCount).toBeGreaterThan(0);
        expect(result).toBeTruthy();
    });

    test("valid registration number search", async () => {
        const query = {
            type: 'registrationNumber',
            value: '10'
        };

        const options = {
            resultsLimit: 10
        };

        const response: Response = await api.company().setOptions(options).search(query);
        const result = response.getResult();

        expect(response).toBeInstanceOf(Response);
        expect(response.getStatus()).toBe(200);
        expect(response.getErrors()).toHaveLength(0);
        expect(response.getResponse()?.resultsCount).toBeGreaterThan(0);
        expect(result).toBeTruthy();
    });

    test("valid tax number search", async () => {
        const query = {
            type: 'taxNumber',
            value: '10'
        };

        const options = {
            resultsLimit: 10
        };

        const response: Response = await api.company().setOptions(options).search(query);
        const result = response.getResult();

        expect(response).toBeInstanceOf(Response);
        expect(response.getStatus()).toBe(200);
        expect(response.getErrors()).toHaveLength(0);
        expect(response.getResponse()?.resultsCount).toBeGreaterThan(0);
        expect(result).toBeTruthy();
    });

    test("valid VAT number search", async () => {
        const query = {
            type: 'vatNumber',
            value: 'CZ04997476'
        };

        const options = {
            resultsLimit: 10
        };

        const response: Response = await api.company().setOptions(options).search(query);
        const result = response.getResult();

        expect(response).toBeInstanceOf(Response);
        expect(response.getStatus()).toBe(200);
        expect(response.getErrors()).toHaveLength(0);
        expect(response.getResponse()?.resultsCount).toBeGreaterThan(0);
        expect(result).toBeTruthy();
    });

    test("company data search with custom ID", async () => {
        const customRequestId = 'MyCustomID';

        const query = {
            type: 'name',
            value: 'Web'
        };

        const options = {
            resultsLimit: 10
        };

        const response: Response = await api.company()
            .setCustomId(customRequestId)
            .setOptions(options)
            .search(query);

        const request = response.getRequest();

        expect(response).toBeInstanceOf(Response);
        expect(response.getStatus()).toBe(200);
        expect(response.getErrors()).toHaveLength(0);
        expect(response.getResponse()?.resultsCount).toBeGreaterThan(0);
        expect(request?.customId).toBeTruthy();
    });

    test("company data search with client information", async () => {
        const query = {
            type: 'name',
            value: 'Web'
        };

        const options = {
            resultsLimit: 10
        };

        const response: Response = await api.company()
            .setOptions(options)
            .setClientCountry('CZ')
            .setClientIP('127.0.0.1')
            .setClientLocation(50.073658, 14.418540)
            .search(query);

        const result = response.getResult();

        expect(response).toBeInstanceOf(Response);
        expect(response.getStatus()).toBe(200);
        expect(response.getErrors()).toHaveLength(0);
        expect(response.getResponse()?.resultsCount).toBeGreaterThan(0);
        expect(result).toBeTruthy();
    });
});
