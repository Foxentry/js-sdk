import { ApiClient, Response } from "../../src/index";

/**
 * Tests for Phone Validate API endpoint
 */
describe('Phone Validate', () => {
    let api: ApiClient;

    beforeAll(() => {
        const apiKey = process.env.API_KEY; // API key needs to be set in the test/config.ts file
        api = new ApiClient(apiKey);
    });

    test("valid phone number validation", async () => {
        const query = {
            numberWithPrefix: "+420607123456"
        };

        const options = {
            validationType: "extended"
        };

        const response: Response = await api.phone().setOptions(options).validate(query);
        const result = response.getResult();

        expect(response).toBeInstanceOf(Response);
        expect(response.getStatus()).toBe(200);
        expect(result.isValid).toBe(true);
        expect(result.proposal).toBe("valid");
        expect(result.data).toBeTruthy();
    });

    test("invalid phone number", async () => {
        const query = {
            numberWithPrefix: "+42060712345"
        };

        const options = {
            validationType: "extended"
        };

        const response: Response = await api.phone().setOptions(options).validate(query);
        const result = response.getResult();

        expect(response).toBeInstanceOf(Response);
        expect(response.getStatus()).toBe(200);
        expect(result.isValid).toBe(false);
        expect(result.proposal).toBe("invalid");
        expect(result.errors).toBeTruthy();
    });

    test("valid phone number with suggestion", async () => {
        const query = {
            prefix: "+48",
            number: "728984101"
        };

        const options = {
            validationType: "extended"
        };

        const response: Response = await api.phone().setOptions(options).validate(query);
        const result = response.getResult();

        expect(response).toBeInstanceOf(Response);
        expect(response.getStatus()).toBe(200);
        expect(result.isValid).toBe(true);
        expect(result.proposal).toBe("validWithSuggestion");
        expect(response.getSuggestions()).toBeTruthy();
    });

    test("invalid phone number with correction", async () => {
        const query = {
            prefix: "+421",
            number: "607123456"
        };

        const options = {
            validationType: "extended"
        };

        const response: Response = await api.phone().setOptions(options).validate(query);
        const result = response.getResult();

        expect(response).toBeInstanceOf(Response);
        expect(response.getStatus()).toBe(200);
        expect(result.isValid).toBe(false);
        expect(result.proposal).toBe("invalidWithCorrection");
        expect(response.getResultCorrected()).toBeTruthy();
    });

    test("phone number validation with custom ID", async () => {
        const customRequestId = 'orderPhoneValidation';

        const query = {
            numberWithPrefix: "+420607123456"
        };

        const response: Response = await api.phone()
            .setCustomId(customRequestId)
            .validate(query);

        const request = response.getRequest();

        expect(response).toBeInstanceOf(Response);
        expect(response.getStatus()).toBe(200);
        expect(request?.customId).toBeTruthy();
    });

    test("phone number validation with client information", async () => {
        const query = {
            numberWithPrefix: "+420607123456"
        };

        const response: Response = await api.phone()
            .setClientCountry("CZ")
            .setClientIP("127.0.0.1")
            .setClientLocation(50.073658, 14.418540)
            .validate(query);

        const result = response.getResult();

        expect(response).toBeInstanceOf(Response);
        expect(response.getStatus()).toBe(200);
        expect(result.isValid).toBe(true);
    });

    test("settings should not persist between calls", async () => {
        const query = {
            numberWithPrefix: "+420607123456"
        };

        const response: Response = await api.phone()
          .includeRequestDetails(true)
          .validate(query);
        const result = response.getRequest();
        expect(result.query).not.toBeUndefined();

        const secondResponse: Response = await api.phone()
          .validate(query);
        const secondResult = secondResponse.getRequest();
        expect(secondResult.query).toBeUndefined();
    });
});
