import { ApiClient } from "../src/index";

/**
 * Tests for base request
 */
describe('Request', () => {
    let api: ApiClient;

    beforeAll(() => {
        const apiKey = process.env.API_KEY; // API key needs to be set in the test/config.ts file
        api = new ApiClient(apiKey);
    });

    test("test ip validation", async () => {
        expect(() => api.location()
            .setClientIP('127.0.0.1')
        ).not.toThrow();

        expect(() => api.location()
            .setClientIP('999.0.0.1')
        ).toThrow();

        expect(() => api.location()
            .setClientIP('::1')
        ).not.toThrow();

        expect(() => api.location()
            .setClientIP('2001:db8:a0b:12f0::::0:1')
        ).toThrow();
    });
});
