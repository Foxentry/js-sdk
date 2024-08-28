
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
     * Api key
     */
    private apiKey: string | null = null;

    /**
     * Api version
     */
    private apiVersion: string = '2.0';

    /**
     * ApiClient constructor.
     * @param apiKey The API key for authentication
     */
    constructor(apiKey: string | null = null) {
        this.apiKey = apiKey;
    }

    /**
     * Email resource.
     */
    public email(): Email {
        const request = new Request(this.apiVersion, this.apiKey);
        return new Email(request);
    }

    /**
     * Location resource.
     */
    public location(): Location {
        const request = new Request(this.apiVersion, this.apiKey);
        return new Location(request);
    }

    /**
     * Company resource.
     */
    public company(): Company {
        const request = new Request(this.apiVersion, this.apiKey);
        return new Company(request);
    }

    /**
     * Name resource.
     */
    public name(): Name {
        const request = new Request(this.apiVersion, this.apiKey);
        return new Name(request);
    }

    /**
     * Phone resource.
     */
    public phone(): Phone {
        const request = new Request(this.apiVersion, this.apiKey);
        return new Phone(request);
    }

    /**
     * Set API key for authentication.
     * @param apiKey The API key to set
     * @return {ApiClient}
     */
    public setAuth(apiKey: string): ApiClient {
        this.apiKey = apiKey;
        return this;
    }

    /**
     * Set the API version for requests.
     * @param version The API version to set
     * @return {ApiClient}
     */
    public setApiVersion(version: string): ApiClient {
        this.apiVersion = version;
        return this;
    }
}
