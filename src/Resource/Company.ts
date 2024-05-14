import BaseResource from './BaseResource';
import { Response } from '../Response';

/**
 * Company resource class for validating, searching, and retrieving company information.
 */
export default class Company extends BaseResource {
    /**
     * Validate a company.
     *
     * @param query Query parameters for the validation request
     *
     * @returns A promise resolving to the response from the validation request
     */
    public validate(query: Record<string, any>): Promise<Response> {
        return super.send(query, 'validate');
    }

    /**
     * Search for a company.
     *
     * @param query Query parameters for the search request
     *
     * @returns A promise resolving to the response from the API
     */
    public search(query: Record<string, any>): Promise<Response> {
        return super.send(query, 'search');
    }

    /**
     * Get company details.
     *
     * @param query Query parameters for the get request
     *
     * @returns A promise resolving to the response from the API
     */
    public get(query: Record<string, any>): Promise<Response> {
        return super.send(query, 'get');
    }
}
