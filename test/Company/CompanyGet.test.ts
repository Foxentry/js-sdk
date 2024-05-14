import { ApiClient, Response } from "../../src/index";

/**
 * Tests for Company Get API endpoint
 */
describe('Company Get', () => {
    let api: ApiClient;

    beforeAll(() => {
        const apiKey = process.env.API_KEY; // API key need to be set in the test/config.ts file
        api = new ApiClient(apiKey);
    });

    test("basic data scope", async () => {
        const query = {
            country: 'CZ',
            registrationNumber: '04997476'
        };

        const options = {
            dataScope: 'basic'
        };

        const response: Response = await api.company.setOptions(options).get(query);
        const result = response.getResult();

        expect(response).toBeInstanceOf(Response);
        expect(response.getStatus()).toBe(200);
        expect(result[0]?.data).toBeTruthy();
    });

    test("extended data scope", async () => {
        const query = {
            country: 'CZ',
            registrationNumber: '04997476'
        };

        const options = {
            dataScope: 'extended'
        };

        const response: Response = await api.company.setOptions(options).get(query);
        const result = response.getResult();

        expect(response).toBeInstanceOf(Response);
        expect(response.getStatus()).toBe(200);
        expect(result[0]?.data?.vat).toBeTruthy();
    });

    test("full data scope", async () => {
        const query = {
            country: 'CZ',
            registrationNumber: '04997476'
        };

        const options = {
            dataScope: 'full'
        };

        const response: Response = await api.company.setOptions(options).get(query);
        const result = response.getResult();

        expect(response).toBeInstanceOf(Response);
        expect(response.getStatus()).toBe(200);
        expect(result[0]?.data?.registrations).toBeTruthy();
    });

    test("company data with custom ID", async () => {
        const customRequestId = 'MyCustomID';
        const query = {
            country: 'CZ',
            registrationNumber: '04997476'
        };

        const options = {
            dataScope: 'basic'
        };

        const response: Response = await api.company
            .setCustomId(customRequestId)
            .setOptions(options)
            .get(query);

        const request = response.getRequest();

        expect(response).toBeInstanceOf(Response);
        expect(response.getStatus()).toBe(200);
        expect(request?.customId).toBeTruthy();
    });

    test("company data with client information", async () => {
        const query = {
            country: 'CZ',
            registrationNumber: '04997476'
        };

        const options = {
            dataScope: 'basic'
        };

        const response: Response = await api.company
            .setOptions(options)
            .setClientCountry('CZ')
            .setClientIP('127.0.0.1')
            .setClientLocation(50.073658, 14.418540)
            .get(query);

        const result = response.getResult();

        expect(response).toBeInstanceOf(Response);
        expect(response.getStatus()).toBe(200);
        expect(result[0]?.data).toBeTruthy();
    });
});
