import { Response } from '../Response';
import BaseResource from './BaseResource';

/**
 * Email resource class for validating and searching email addresses.
 */
export default class Email extends BaseResource {

    /**
     * Validate an email address.
     *
     * @param query Email address to validate
     * @returns The response from the validation request
     */
    public validate(query: string | Record<string, any>): Promise<Response> {
        const emailQuery = typeof query === 'string' ? { email: query } : query;
        return super.send(emailQuery, 'validate');
    }


    /**
     * Search for information related to an email address.
     *
     * @param query Email address to search for
     * @returns The response from the search request
     */
    public search(query: string | Record<string, any>): Promise<Response> {
        const searchQuery = typeof query === 'string' ? { value: query } : query;
        return super.send(searchQuery, 'search');
    }
}