import Request from '../Request'
import { Response } from '../Response';

/**
 * Base resource class for handling common resource functionality.
 */
export default abstract class BaseResource {
    protected request: Request;

    /**
     * Initializes a new instance of the constructor class.
     *
     * @param {Request} request - The request object to be assigned to the request property.
     */
    constructor(request: Request) {
        this.request = request;
    }

    /**
     * Sets a custom ID for the resource.
     *
     * @param {string} id - The custom ID to set.
     * @return {this} The updated instance of the BaseResource.
     */
    public setCustomId(id: string): this {
        this.request.setCustomId(id);
        return this;
    }

    /**
     * Sets the options for the resource.
     *
     * @param {Record<string, any>} options - The options to set.
     * @return {this} The updated instance of the BaseResource.
     */
    public setOptions(options: Record<string, any>): this {
        this.request.setOptions(options);
        return this;
    }

    /**
     * Sets the client IP address for the resource.
     *
     * @param {string} ip - The IP address to set.
     * @return {this} The updated instance of the BaseResource.
     */
    public setClientIP(ip: string): this {
        this.request.setClientIP(ip);
        return this;
    }

    /**
     * Sets the client country for the request.
     *
     * @param {string} country - The country code to set. Must be a two-letter ISO-3166-1 alpha-2 code.
     * @return {this} The updated instance of the BaseResource.
     */
    public setClientCountry(country: string): this {
        this.request.setClientCountry(country);
        return this;
    }

    /**
     * Sets the client location for the resource.
     *
     * @param {number} lat - The latitude to set.
     * @param {number} lon - The longitude to set.
     * @return {this} The updated instance of the BaseResource.
     */
    public setClientLocation(lat: number, lon: number): this {
        this.request.setClientLocation(lat, lon);
        return this;
    }

    /**
     * Sends a request to the specified endpoint with the given query parameters.
     *
     * @param {Record<string, any>} query - The query parameters to send with the request.
     * @param {string} methodName - The name of the method to call on the endpoint.
     * @return {Promise<Response>} A promise that resolves to the response from the request.
     */
    protected async send(query: Record<string, any>, methodName: string): Promise<Response> {
        const callerClass = this.constructor.name.toLowerCase();
        const endpoint = `${callerClass}/${methodName}`;

        this.request.setEndpoint(endpoint);
        this.request.setQuery(query);
        const r = await this.request.send()
        return new Response(r.data, r.headers);
    }
}
