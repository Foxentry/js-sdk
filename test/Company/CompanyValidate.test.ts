import { ApiClient, Response } from "../../src/index";

/**
 * Tests for Company Validate API endpoint
 */
describe('Company Validate', () => {
    let api: ApiClient;

    beforeAll(() => {
        const apiKey = process.env.API_KEY; // API key need to be set in the test/config.ts file
        api = new ApiClient(apiKey);
    });

    test("valid company data", async () => {
        const query = {
            name: 'AVANTRO s.r.o.',
            registrationNumber: '04997476'
        };

        const options = {
            dataScope: 'basic'
        };

        const response: Response = await api.company().setOptions(options).validate(query);
        const result = response.getResult();

        expect(response).toBeInstanceOf(Response);
        expect(response.getStatus()).toBe(200);
        expect(result.isValid).toBe(true);
        expect(result.proposal).toBe('valid');
        expect(result.data).toBeTruthy();
    });

    test("invalid company data", async () => {
        const query = {
            name: 'AVANTRO',
            registrationNumber: '25547'
        };

        const options = {
            dataScope: 'basic'
        };

        const response: Response = await api.company().setOptions(options).validate(query);
        const result = response.getResult();

        expect(response).toBeInstanceOf(Response);
        expect(response.getStatus()).toBe(200);
        expect(result.isValid).toBe(false);
        expect(result.proposal).toBe('invalid');
        expect(result.errors).toBeTruthy();
    });

    test("invalid company data with correction", async () => {
        const query = {
            name: 'AVANTRO',
            registrationNumber: '04997476'
        };

        const options = {
            dataScope: 'basic'
        };

        const response: Response = await api.company().setOptions(options).validate(query);
        const result = response.getResult();

        expect(response).toBeInstanceOf(Response);
        expect(response.getStatus()).toBe(200);
        expect(result.isValid).toBe(false);
        expect(result.proposal).toBe('invalidWithCorrection');
        expect(response.getResultCorrected()).toBeTruthy();
    });

    test("invalid company data with suggestion", async () => {
        const query = {
            registrationNumber: '0499747'
        };

        const options = {
            dataScope: 'basic'
        };

        const response: Response = await api.company().setOptions(options).validate(query);
        const result = response.getResult();

        expect(response).toBeInstanceOf(Response);
        expect(response.getStatus()).toBe(200);
        expect(result.isValid).toBe(false);
        expect(result.proposal).toBe('invalidWithSuggestion');
        expect(response.getSuggestions()).toBeTruthy();
    });

    test("company data validation with custom ID", async () => {
        const customRequestId = 'MyCustomID';

        const query = {
            name: 'AVANTRO s.r.o.',
            registrationNumber: '04997476'
        };

        const options = {
            dataScope: 'basic'
        };

        const response: Response = await api.company()
            .setCustomId(customRequestId)
            .setOptions(options)
            .validate(query);

        const request = response.getRequest();

        expect(response).toBeInstanceOf(Response);
        expect(response.getStatus()).toBe(200);
        expect(request?.customId).toBeTruthy();
    });

    test("company data validation with client information", async () => {
        const query = {
            name: 'AVANTRO s.r.o.',
            registrationNumber: '04997476'
        };

        const options = {
            dataScope: 'basic'
        };

        const response: Response = await api.company()
            .setOptions(options)
            .setClientCountry('CZ')
            .setClientIP('127.0.0.1')
            .setClientLocation(50.073658, 14.418540)
            .validate(query);

        const result = response.getResult();

        expect(response).toBeInstanceOf(Response);
        expect(response.getStatus()).toBe(200);
        expect(result.isValid).toBe(true);
    });

});
