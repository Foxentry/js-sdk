import BaseResource, {Endpoint} from './BaseResource';
import { Response } from '../Response';

/**
 * Location resource class for validating, searching, and retrieving information about addresses.
 */
export default class Location extends BaseResource {
    /**
     * Validate an address.
     *
     * @param query Query parameters for the validation request
     *
     * @returns A promise resolving to the response from the validation request
     */
    public validate(query: Record<string, any>): Promise<Response> {
        return super.send(Endpoint.LocationValidate, query);
    }

    /**
     * Search for a location.
     *
     * @param query Query parameters for the search request
     *
     * @returns A promise resolving to the response from the API
     */
    public search(query: Record<string, any>): Promise<Response> {
        return super.send(Endpoint.LocationSearch, query);
    }

    /**
     * Get location details.
     *
     * @param query Query parameters for the get request
     *
     * @returns A promise resolving to the response from the API
     */
    public get(query: Record<string, any>): Promise<Response> {
        return super.send(Endpoint.LocationGet, query);
    }

    /**
     * Localize a location.
     *
     * @param query Query parameters for the localize request
     *
     * @returns A promise resolving to the response from the API
     */
    public localize(query: Record<string, any>): Promise<Response> {
        return super.send(Endpoint.LocationLocalize, query);
    }
}
