import { ApiClient, Response } from "../../src/index";

/**
 * Tests for Location Localize API endpoint
 */
describe('Location Localize', () => {
    let api: ApiClient;

    beforeAll(() => {
        const apiKey = process.env.API_KEY; // API key needs to be set in the test/config.ts file
        api = new ApiClient(apiKey);
    });

    test("localization of location data based on coordinates", async () => {
        const query = {
            lat: 50.0919999,
            lon: 14.4527403
        };

        const options = {
            resultsLimit: 10,
            radius: 15,
            acceptNearest: false
        };

        const response: Response = await api.location.setOptions(options).localize(query);
        const result = response.getResult();

        expect(response).toBeInstanceOf(Response);
        expect(response.getStatus()).toBe(200);
        expect(response.getErrors()).toHaveLength(0);
        expect(response.getResponse().resultsCount).toBeGreaterThan(0);
        expect(result).toBeTruthy();
    });

    test("location data localization with custom ID", async () => {
        const customRequestId = 'MyCustomID';

        const query = {
            lat: 50.0919999,
            lon: 14.4527403
        };

        const options = {
            resultsLimit: 10,
            radius: 15,
            acceptNearest: false
        };

        const response: Response = await api.location
            .setCustomId(customRequestId)
            .setOptions(options)
            .localize(query);

        const request = response.getRequest();

        expect(response).toBeInstanceOf(Response);
        expect(response.getStatus()).toBe(200);
        expect(response.getErrors()).toHaveLength(0);
        expect(response.getResponse().resultsCount).toBeGreaterThan(0);
        expect(request?.customId).toBeTruthy();
    });

    test("location data localization with client information", async () => {
        const query = {
            lat: 50.0919999,
            lon: 14.4527403
        };

        const options = {
            resultsLimit: 10,
            radius: 15,
            acceptNearest: false
        };

        const response: Response = await api.location
            .setOptions(options)
            .setClientCountry("CZ")
            .setClientIP("127.0.0.1")
            .setClientLocation(50.073658, 14.418540)
            .localize(query);

        const result = response.getResult();

        expect(response).toBeInstanceOf(Response);
        expect(response.getStatus()).toBe(200);
        expect(response.getErrors()).toHaveLength(0);
        expect(response.getResponse().resultsCount).toBeGreaterThan(0);
        expect(result).toBeTruthy();
    });
});
