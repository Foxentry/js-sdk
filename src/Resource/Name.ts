import BaseResource, {Endpoint} from './BaseResource';
import { Response } from '../Response';

/**
 * Name resource class for validating names.
 */
export default class Name extends BaseResource {
    /**
     * Validate a name.
     *
     * @param query Query parameters for the validation request
     *
     * @returns The response from the validation request
     */
    public validate(query: Record<string, any>): Promise<Response> {
        return super.send(Endpoint.NameValidate, query);
    }
}
