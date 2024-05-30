
import Request from './Request';
import Company from './Resource/Company';
import Email from './Resource/Email';
import Location from './Resource/Location';
import Name from './Resource/Name';
import Phone from './Resource/Phone';

/**
 * API client class for interacting with Foxentry API.
 */
export default class ApiClient {
    /**
     * Email resource.
     */
    public email: Email;

    /**
     * Location resource.
     */
    public location: Location;

    /**
     * Company resource.
     */
    public company: Company;

    /**
     * Name resource.
     */
    public name: Name;

    /**
     * Phone resource.
     */
    public phone: Phone;

    /**
     * Request object for making API requests.
     */
    private request: Request;

    /**
     * ApiClient constructor.
     * @param apiKey The API key for authentication
     */
    constructor(apiKey: string | null = null) {
        this.request = new Request();

        if (apiKey) {
            this.request.setAuth(apiKey);
        }

        this.company = new Company(this.request);
        this.email = new Email(this.request);
        this.location = new Location(this.request);
        this.name = new Name(this.request);
        this.phone = new Phone(this.request);
    }

    /**
     * Sets the base URL for API requests.
     *
     * @param {string} url - The base URL to set.
     * @return {ApiClient} 
     */
    public setBaseURL(url: string): ApiClient {
        this.request.setBaseURL(url);
        return this;
    }

    /**
     * Set API key for authentication.
     * @param apiKey The API key to set
     * @return {ApiClient} 
     */
    public setAuth(apiKey: string): ApiClient {
        this.request.setAuth(apiKey);
        return this;
    }

    /**
     * Set the API version for requests.
     * @param version The API version to set
     * @return {ApiClient} 
     */
    public setApiVersion(version: string): ApiClient {
        this.request.setHeader("Api-Version", version);
        return this;
    }

    /**
     * Include request details in API responses.
     * @param value Whether to include request details (default: true)
     * @return {ApiClient} 
     */
    public includeRequestDetails(value: boolean = true): ApiClient {
        this.request.setHeader("Foxentry-Include-Request-Details", value);
        return this;
    }
}