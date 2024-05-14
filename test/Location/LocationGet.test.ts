import { ApiClient, Response } from "../../src/index";

/**
 * Tests for Location Get API endpoint
 */
describe('Location Get', () => {
    let api: ApiClient;

    beforeAll(() => {
        const apiKey = process.env.API_KEY; // API key needs to be set in the test/config.ts file
        api = new ApiClient(apiKey);
    });

    test("retrieve full data scope by internal ID", async () => {
        const query = {
            country: 'CZ',
            id: 'd2ade877-1e95-4a83-baa6-5431ce5b3ca8'
        };

        const options = {
            idType: 'internal',
            dataScope: 'full'
        };

        const response: Response = await api.location.setOptions(options).get(query);
        const result = response.getResult();

        expect(response).toBeInstanceOf(Response);
        expect(response.getStatus()).toBe(200);
        expect(result[0].data).toBeTruthy();
    });

    test("retrieve full data scope by external ID", async () => {
        const query = {
            country: 'CZ',
            id: '22349995'
        };

        const options = {
            idType: 'external',
            dataScope: 'full'
        };

        const response: Response = await api.location.setOptions(options).get(query);
        const result = response.getResult();

        expect(response).toBeInstanceOf(Response);
        expect(response.getStatus()).toBe(200);
        expect(result[0].data).toBeTruthy();
    });

    test("location data retrieval with custom ID", async () => {
        const customRequestId = 'MyCustomID';

        const query = {
            country: 'CZ',
            id: '22349995'
        };

        const options = {
            idType: 'external',
            dataScope: 'full'
        };

        const response: Response = await api.location
            .setCustomId(customRequestId)
            .setOptions(options)
            .get(query);

        const request = response.getRequest();

        expect(response).toBeInstanceOf(Response);
        expect(response.getStatus()).toBe(200);
        expect(request?.customId).toBeTruthy();
    });

    test("location data retrieval with client information", async () => {
        const query = {
            country: 'CZ',
            id: '22349995'
        };

        const options = {
            idType: 'external',
            dataScope: 'full'
        };

        const response: Response = await api.location
            .setOptions(options)
            .setClientCountry('CZ')
            .setClientIP('127.0.0.1')
            .setClientLocation(50.073658, 14.418540)
            .get(query);

        const result = response.getResult();

        expect(response).toBeInstanceOf(Response);
        expect(response.getStatus()).toBe(200);
        expect(result[0].data).toBeTruthy();
    });
});
