import BaseResource, {Endpoint} from './BaseResource';
import { Response } from '../Response';

/**
 * Phone resource class for validating phone numbers.
 */
export default class Phone extends BaseResource {
    /**
     * Validate a phone number.
     *
     * @param query Query parameters for the validation request
     *
     * @returns The response from the validation request
     */
    public validate(query: Record<string, any>): Promise<Response> {
        return super.send(Endpoint.PhoneValidate, query);
    }
}
