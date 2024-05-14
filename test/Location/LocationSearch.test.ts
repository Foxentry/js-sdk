import { ApiClient, Response } from "../../src/index";

/**
 * Tests for Location Search API endpoint
 */
describe('Location Search', () => {
    let api: ApiClient;

    beforeAll(() => {
        const apiKey = process.env.API_KEY; // API key needs to be set in the test/config.ts file
        api = new ApiClient(apiKey);
    });

    test("valid street search", async () => {
        const query = {
            type: "street",
            value: "tha"
        };

        const options = {
            resultsLimit: 10
        };

        const response: Response = await api.location.setOptions(options).search(query);
        const result = response.getResult();

        expect(response).toBeInstanceOf(Response);
        expect(response.getStatus()).toBe(200);
        expect(response.getErrors()).toHaveLength(0);
        expect(response.getResponse().resultsCount).toBeGreaterThan(0);
        expect(result).toBeTruthy();
    });

    test("valid city search", async () => {
        const query = {
            type: "city",
            value: "pra"
        };

        const options = {
            resultsLimit: 10
        };

        const response: Response = await api.location.setOptions(options).search(query);
        const result = response.getResult();

        expect(response).toBeInstanceOf(Response);
        expect(response.getStatus()).toBe(200);
        expect(response.getErrors()).toHaveLength(0);
        expect(response.getResponse().resultsCount).toBeGreaterThan(0);
        expect(result).toBeTruthy();
    });

    test("valid street with number search", async () => {
        const query = {
            type: "streetWithNumber",
            value: "Jeseniova 56"
        };

        const options = {
            resultsLimit: 10
        };

        const response: Response = await api.location.setOptions(options).search(query);
        const result = response.getResult();

        expect(response).toBeInstanceOf(Response);
        expect(response.getStatus()).toBe(200);
        expect(response.getErrors()).toHaveLength(0);
        expect(response.getResponse().resultsCount).toBeGreaterThan(0);
        expect(result).toBeTruthy();
    });

    test("valid ZIP code search", async () => {
        const query = {
            type: "zip",
            value: "1"
        };

        const options = {
            resultsLimit: 10
        };

        const response: Response = await api.location.setOptions(options).search(query);
        const result = response.getResult();

        expect(response).toBeInstanceOf(Response);
        expect(response.getStatus()).toBe(200);
        expect(response.getErrors()).toHaveLength(0);
        expect(response.getResponse().resultsCount).toBeGreaterThan(0);
        expect(result).toBeTruthy();
    });

    test("valid full address search", async () => {
        const query = {
            type: "full",
            value: "Jeseniova Praha"
        };

        const options = {
            resultsLimit: 10
        };

        const response: Response = await api.location.setOptions(options).search(query);
        const result = response.getResult();

        expect(response).toBeInstanceOf(Response);
        expect(response.getStatus()).toBe(200);
        expect(response.getErrors()).toHaveLength(0);
        expect(response.getResponse().resultsCount).toBeGreaterThan(0);
        expect(result).toBeTruthy();
    });

    test("location data validation with custom ID", async () => {
        const customRequestId = 'MyCustomID';

        const query = {
            type: "street",
            value: "tha"
        };

        const options = {
            resultsLimit: 10
        };

        const response: Response = await api.location
            .setCustomId(customRequestId)
            .setOptions(options)
            .search(query);

        const request = response.getRequest();

        expect(response).toBeInstanceOf(Response);
        expect(response.getStatus()).toBe(200);
        expect(response.getErrors()).toHaveLength(0);
        expect(response.getResponse().resultsCount).toBeGreaterThan(0);
        expect(request?.customId).toBeTruthy();
    });

    test("location data validation with client information", async () => {
        const query = {
            type: "street",
            value: "tha"
        };

        const options = {
            resultsLimit: 10
        };

        const response: Response = await api.location
            .setOptions(options)
            .setClientCountry("CZ")
            .setClientIP("127.0.0.1")
            .setClientLocation(50.073658, 14.418540)
            .search(query);

        const result = response.getResult();

        expect(response).toBeInstanceOf(Response);
        expect(response.getStatus()).toBe(200);
        expect(response.getErrors()).toHaveLength(0);
        expect(response.getResponse().resultsCount).toBeGreaterThan(0);
        expect(result).toBeTruthy();
    });
});