# Foxentry API JavaScript SDK

## Introduction
The Foxentry API SDK enables seamless integration of various data validation features into your applications. Whether you require validation for phone numbers, addresses, emails, or other data types, this library offers a user-friendly interface to interact with the Foxentry API. For more comprehensive information about Foxentry, please visit [foxentry.com](https://foxentry.com/)

If you have questions or need further assistance, reach out to us at [info@foxentry.cz](mailto:info@foxentry.cz)

## Requirements
To use the Foxentry API client, you need the following:
-   [A Foxentry account](https://app.foxentry.com/registration)
-   An Application project created with a generated API key
-   A JavaScript environment compatible with modern web standards.

## Installation

To begin using the Foxentry API SDK, run the following command:

```bash
npm install @foxentry/js-api-sdk
```

## Getting started

To initiate the usage of the Foxentry API SDK, create an instance of the API client with your API key. This instance allows you to access various resources (e.g., phone, location, email, etc.) and call their methods to access the Foxentry API's functionalities.

### Example of e-mail validation
```typescript
// Import the ApiClient class, making it available for use in this script.
import ApiClient from "../src/ApiClient";
import { Response } from "../src/Response";

/*
Create a new instance of the ApiClient class and provide your API key.
The API key can be generated in the Foxentry administration under Settings > API Keys section.
*/
const api: ApiClient = new ApiClient();
api.setAuth("[YOUR_API_KEY]");

// Request query
const query = {
    email:"info@foxentry.cz"
}

// Request options
const options = {
    acceptDisposableEmails: false // Disables acceptance of disposable emails.
}

// Set custom parameters for the email validation request.
api.email
    .setCustomId("CustomRequestID") // Sets a custom request ID.
    .setClientIP("127.0.0.1") // Sets the client IP address.
    .setClientCountry("CZ") // Sets the client country code.
    .setOptions(options)
    .validate(query) // Sends request to Foxentry API and performs email validation.
    .then((res: Response): void => {
        const result = res.getResult()
        const isValid: boolean = result?.isValid;
        
        // Displays the result of email validation.
        console.log(isValid ? "E-mail is valid" : "E-mail is invalid");
    }).catch(error => {
        console.error(error); //Catches an error
    });
```

## APIClient class

The APIClient class is the main class responsible for communication with the API.

It offers the following methods:

| Method                | Parameters       | Description                                  |
|-----------------------|------------------|----------------------------------------------|
| setAuth               | `API key`        | Sets API key, that will be used in requests  |
| setApiVersion         | `version number` | Sets specific API version, that will be used |
| includeRequestDetails | `true/false`     | Includes request details with every request  |

To access various resources from this class, simply provide the resource name, and you will be able to access the resource's methods, e.g., `api.email.search(query)`, `api.company.get(query)`, etc.

## Resources

The API client provides various resources, each with its own related methods listed below. You can click on the methods to navigate to the [API documentation](https://foxentry.dev/), where you can explore all request inputs, options, and more.

| Resource | Methods                                                                                                                                                                                                                                               |
| -------- |-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Company | [validate](https://foxentry.dev/reference/validatecompanydata)<br>[search](https://foxentry.dev/reference/companysearch)<br>[get](https://foxentry.dev/reference/getcompanydata)                                                                      |
| Email   | [validate](https://foxentry.dev/reference/validateemail)<br>[search](https://foxentry.dev/reference/emailsearch)                                                                                                                                      |
| Location | [validate](https://foxentry.dev/reference/locationvalidation)<br>[search](https://foxentry.dev/reference/locationsearch)<br>[get](https://foxentry.dev/reference/locationget)<br> [localization](https://foxentry.dev/reference/locationlocalization) |
| Name   | [validate](https://foxentry.dev/reference/namevalidation)                                                                                                                                                                                             |
| Phone   | [validate](https://foxentry.dev/reference/validatephonenumber)                                                                                                                                                                                        |

In each method, you **must specify query parameters** according to the specific endpoint in the [API documentation](https://foxentry.dev/).

To specify options, use the method **setOptions({})**

To specify the client, use the methods **setClientIP(ip)**, **setClientCountry(country)** or **setClientLocation(lat, lon)**.

## Response class

Response class is returned with every request providing methods below:

| Method             | Parameters | Description                                 |
|--------------------| --------- |---------------------------------------------|
| getStatus          | `None` | Returns status code of the response         |
| getResponse        | `None` | Returns full response from the API          |
| getRequest         | `None` | Returns informations about the sent request |
| getResult          | `None` | Returns result object from the response     |
| getResultCorrected | `None` | Returns corrected results from the response |
| getSuggestions     | `None` | Returns suggestions from the response       |
| getErrors          | `None` | Returns errors from the response            |
| getHeaders         | `None` | Returns request headers from the response   |
| getRateLimit       | `None` | Returns request rate limit for the API      |
| getRateLimitPeriod | `None` | Returns reset period of request rate limit  |
| getRateLimitRemaining | `None` | Returns remaining rate of requests          |
| getDailyCreditsLeft | `None` | Returns remaining daily credits             |
| getDailyCreditsLimit | `None` | Returns daily credits limit                 |
| getApiVersion | `None` | Returns API version used in the request     |

## Testing

The library includes unit tests to ensure its functionality and provide examples of how the library can be used. You can run the tests using Jest. Don't forget to set your API key for these tests, located in the \test\config.ts file.