import { ApiClient, Response } from "../../src/index";

/**
 * Tests for Name Validate API endpoint
 */
describe("Name Validate", () => {
  let api: ApiClient;

  beforeAll(() => {
    const apiKey = process.env.API_KEY; // API key needs to be set in the test/config.ts file
    api = new ApiClient(apiKey);
  });

  test("valid name validation", async () => {
    const query = {
      name: "Pavel",
    };

    // 2.1 applies corrections by default (correctionMode "full"), which would
    // turn even a clean name into "validWithCorrection"; disable it for a
    // straightforward valid case.
    const options = {
      dataScope: "basic",
      correctionMode: "none",
    };

    const response: Response = await api
      .name()
      .setOptions(options)
      .validate(query);
    const result = response.getResult();

    expect(response).toBeInstanceOf(Response);
    expect(response.getStatus()).toBe(200);
    expect(result.isValid).toBe(true);
    expect(result.proposal).toBe("valid");
    expect(result.data).toBeTruthy();
  });

  test("invalid name", async () => {
    const query = {
      name: "Paeeewas",
    };

    const options = {
      dataScope: "basic",
      correctionMode: "none",
    };

    const response: Response = await api
      .name()
      .setOptions(options)
      .validate(query);
    const result = response.getResult();

    expect(response).toBeInstanceOf(Response);
    expect(response.getStatus()).toBe(200);
    expect(result.isValid).toBe(false);
    expect(result.proposal).toBe("invalid");
    expect(result.errors).toBeTruthy();
  });

  test("invalid name with correction", async () => {
    const query = {
      name: "pavel", // lowercase; corrected to "Pavel"
    };

    const options = {
      dataScope: "basic",
      correctionMode: "full",
    };

    const response: Response = await api
      .name()
      .setOptions(options)
      .validate(query);
    const result = response.getResult();

    expect(response).toBeInstanceOf(Response);
    expect(response.getStatus()).toBe(200);
    expect(result.isValid).toBe(false);
    expect(result.proposal).toBe("invalidWithCorrection");
    expect(response.getResultCorrected()).toBeTruthy();
  });

  test("invalid name with suggestion (correctionMode suggestion)", async () => {
    const query = {
      name: "PaVelll",
    };

    const options = {
      dataScope: "basic",
      correctionMode: "suggestion",
    };

    const response: Response = await api
      .name()
      .setOptions(options)
      .validate(query);
    const result = response.getResult();

    expect(response.getStatus()).toBe(200);
    expect(result.isValid).toBe(false);
    expect(result.proposal).toBe("invalidWithSuggestion");
    expect(response.getSuggestions()).toBeTruthy();
    expect(response.getSuggestions().length).toBeGreaterThan(0);
  });

  test("valid full name validation", async () => {
    const query = {
      nameSurname: "Pavel Novák",
    };

    const options = {
      dataScope: "full",
    };

    const response: Response = await api
      .name()
      .setOptions(options)
      .validate(query);
    const result = response.getResult();

    expect(response).toBeInstanceOf(Response);
    expect(response.getStatus()).toBe(200);
    expect(result.isValid).toBe(true); // Adjust this expectation based on your API response
    expect(result.proposal).toBe("valid");
    // 2.1 relocated `details` from result.details to result.data.details.
    expect(result.data.details).toBeTruthy();
  });

  test("reports validated components via dataTypes (2.1)", async () => {
    const query = {
      nameSurname: "Pavel Novák",
    };

    const options = {
      dataScope: "full",
    };

    const response: Response = await api
      .name()
      .setOptions(options)
      .validate(query);
    const result = response.getResult();

    expect(response.getStatus()).toBe(200);
    expect(result.dataTypes).toBeTruthy();
    expect(result.dataTypes.valid).toEqual(
      expect.arrayContaining(["name", "surname"]),
    );
    expect(result.dataTypes.invalid).toEqual([]);
  });

  test("returns vocative (5th case) forms (2.1)", async () => {
    const query = {
      nameSurname: "Petr Novák",
    };

    const options = {
      dataScope: "full",
      dataLanguage: "cs",
    };

    const response: Response = await api
      .name()
      .setOptions(options)
      .validate(query);
    const result = response.getResult();

    expect(response.getStatus()).toBe(200);
    expect(result.data.vocativeName).toBe("Petře");
    expect(result.data.vocativeSurname).toBe("Nováku");
    expect(result.data.vocativeNameSurname).toBe("Petře Nováku");
  });

  test("name validation with custom ID", async () => {
    const customRequestId = "MyCustomID";

    const query = {
      name: "Pavel",
    };

    const response: Response = await api
      .name()
      .setCustomId(customRequestId)
      .validate(query);

    const request = response.getRequest();

    expect(response).toBeInstanceOf(Response);
    expect(response.getStatus()).toBe(200);
    expect(request?.customId).toBeTruthy();
  });

  test("name validation with client information", async () => {
    const query = {
      name: "Pavel",
    };

    const options = {
      dataScope: "basic",
    };

    const response: Response = await api
      .name()
      .setOptions(options)
      .setClientCountry("CZ")
      .setClientIP("127.0.0.1")
      .setClientLocation(50.073658, 14.41854)
      .validate(query);

    const result = response.getResult();

    expect(response).toBeInstanceOf(Response);
    expect(response.getStatus()).toBe(200);
    expect(result.isValid).toBe(true);
  });

  test("settings should not persist between calls", async () => {
    const query = {
      name: "Pavel",
    };

    const response: Response = await api
      .name()
      .includeRequestDetails(true)
      .validate(query);
    const result = response.getRequest();
    expect(result.query).not.toBeUndefined();

    const secondResponse: Response = await api.name().validate(query);
    const secondResult = secondResponse.getRequest();
    expect(secondResult.query).toBeUndefined();
  });
});
