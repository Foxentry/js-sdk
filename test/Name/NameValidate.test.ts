import { Response } from '../../src/Response';
import ApiClient from '../../src/ApiClient';

/**
 * Tests for Name Validate API endpoint
 */
describe('Name Validate', () => {
    let api: ApiClient;

    beforeAll(() => {
        const apiKey = process.env.API_KEY; // API key needs to be set in the test/config.ts file
        api = new ApiClient(apiKey);
    });

    test("valid name validation", async () => {
        const query = {
            name: "Pavel"
        };

        const options = {
            dataScope: "basic"
        };

        const response: Response = await api.name.setOptions(options).validate(query);
        const result = response.getResult();

        expect(response).toBeInstanceOf(Response);
        expect(response.getStatus()).toBe(200);
        expect(result.isValid).toBe(true);
        expect(result.proposal).toBe("valid");
        expect(result.data).toBeTruthy();
    });

    test("invalid name", async () => {
        const query = {
            name: "Paeeewas"
        };

        const options = {
            dataScope: "basic",
            validationDepth: "strict"
        };

        const response: Response = await api.name.setOptions(options).validate(query);
        const result = response.getResult();

        expect(response).toBeInstanceOf(Response);
        expect(response.getStatus()).toBe(200);
        expect(result.isValid).toBe(false);
        expect(result.proposal).toBe("invalid");
        expect(result.errors).toBeTruthy();
    });

    test("invalid name with correction", async () => {
        const query = {
            name: "Palve"
        };

        const options = {
            dataScope: "basic",
            validationDepth: "strict"
        };

        const response: Response = await api.name.setOptions(options).validate(query);
        const result = response.getResult();

        expect(response).toBeInstanceOf(Response);
        expect(response.getStatus()).toBe(200);
        expect(result.isValid).toBe(false);
        expect(result.proposal).toBe("invalidWithCorrection");
        expect(response.getResultCorrected()).toBeTruthy();
    });

    test("valid full name validation", async () => {
        const query = {
            nameSurname: "Pavel Novák"
        };

        const options = {
            dataScope: "full"
        };

        const response: Response = await api.name.setOptions(options).validate(query);
        const result = response.getResult();

        expect(response).toBeInstanceOf(Response);
        expect(response.getStatus()).toBe(200);
        expect(result.isValid).toBe(true); // Adjust this expectation based on your API response
        expect(result.proposal).toBe("valid");
        expect(result.details).toBeTruthy();
    });

    test("name validation with custom ID", async () => {
        const customRequestId = 'MyCustomID';

        const query = {
            name: "Pavel"
        };

        const response: Response = await api.name
            .setCustomId(customRequestId)
            .validate(query);

        const request = response.getRequest();

        expect(response).toBeInstanceOf(Response);
        expect(response.getStatus()).toBe(200);
        expect(request?.customId).toBeTruthy();
    });

    test("name validation with client information", async () => {
        const query = {
            name: "Pavel"
        };

        const options = {
            dataScope: "basic"
        };

        const response: Response = await api.name
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
