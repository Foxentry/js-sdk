import { ApiClient, Response } from "../../src/index";

/**
 * Tests for Location Validate API endpoint
 */
describe('Location Validate', () => {
    let api: ApiClient;

    beforeAll(() => {
        const apiKey = process.env.API_KEY; // API key needs to be set in the test/config.ts file
        api = new ApiClient(apiKey);
    });

    test("valid location data validation", async () => {
        const query = {
            streetWithNumber: "Thámova 137/16",
            city: "Praha",
            zip: "186 00"
        };

        const options = {
            dataScope: "basic",
            cityFormat: "minimal",
            zipFormat: true
        };

        const response: Response = await api.location().setOptions(options).validate(query);
        const result = response.getResult();

        expect(response).toBeInstanceOf(Response);
        expect(response.getStatus()).toBe(200);
        expect(result.isValid).toBe(true);
        expect(result.proposal).toBe("valid");
        expect(result.data).toBeTruthy();
    });

    test("invalid location data", async () => {
        const query = {
            streetWithNumber: "Thámova 123456789",
            city: "Parharlin",
            zip: "457545754"
        };

        const options = {
            dataScope: "basic",
            cityFormat: "minimal",
            zipFormat: true
        };

        const response: Response = await api.location().setOptions(options).validate(query);
        const result = response.getResult();

        expect(response).toBeInstanceOf(Response);
        expect(response.getStatus()).toBe(200);
        expect(result.isValid).toBe(false);
        expect(result.proposal).toBe("invalid");
        expect(result.errors).toBeTruthy();
    });

    test("invalid location data with correction", async () => {
        const query = {
            streetWithNumber: "Thámova 137",
            city: "Praha",
            zip: "18600"
        };

        const options = {
            dataScope: "basic",
            cityFormat: "minimal",
            zipFormat: true
        };

        const response: Response = await api.location().setOptions(options).validate(query);
        const result = response.getResult();

        expect(response).toBeInstanceOf(Response);
        expect(response.getStatus()).toBe(200);
        expect(result.isValid).toBe(false);
        expect(result.proposal).toBe("invalidWithCorrection");
        expect(response.getResultCorrected()).toBeTruthy();
    });

    test("invalid location data with suggestion", async () => {
        const query = {
            streetWithNumber: "Olšanská 2898/4",
            city: "Praha",
            zip: "130 00"
        };

        const options = {
            dataScope: "basic",
            cityFormat: "minimal",
            zipFormat: true
        };

        const response: Response = await api.location().setOptions(options).validate(query);
        const result = response.getResult();

        expect(response).toBeInstanceOf(Response);
        expect(response.getStatus()).toBe(200);
        expect(result.isValid).toBe(false);
        expect(result.proposal).toBe("invalidWithSuggestion");
        expect(response.getSuggestions()).toBeTruthy();
    });

    test("location data validation with custom ID", async () => {
        const customRequestId = 'MyCustomID';

        const query = {
            streetWithNumber: "Thámova 123456789",
            city: "Parharlin",
            zip: "457545754"
        };

        const options = {
            dataScope: "basic",
            cityFormat: "minimal",
            zipFormat: true
        };

        const response: Response = await api.location()
            .setCustomId(customRequestId)
            .setOptions(options)
            .validate(query);

        const request = response.getRequest();

        expect(response).toBeInstanceOf(Response);
        expect(response.getStatus()).toBe(200);
        expect(request?.customId).toBeTruthy();
    });

    test("location data validation with client information", async () => {
        const query = {
            streetWithNumber: "Thámova 137/16",
            city: "Praha",
            zip: "186 00"
        };

        const options = {
            dataScope: "basic",
            cityFormat: "minimal",
            zipFormat: true
        };

        const response: Response = await api.location()
            .setOptions(options)
            .setClientCountry("CZ")
            .setClientIP("127.0.0.1")
            .setClientLocation(50.073658, 14.418540)
            .validate(query);

        const result = response.getResult();

        expect(response).toBeInstanceOf(Response);
        expect(response.getStatus()).toBe(200);
        expect(result.isValid).toBe(true);
    });
});
