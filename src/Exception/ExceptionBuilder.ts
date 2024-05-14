import { AxiosError } from "axios";
import BadRequestException from "./BadRequestException";
import FoxentryException from "./FoxentryException";
import ForbiddenException from "./ForbiddenException";
import NotFoundException from "./NotFoundException";
import PaymentRequiredException from "./PaymentRequiredException";
import ServerErrorException from "./ServerErrorException";
import ServiceUnavailableException from "./ServiceUnavailableException";
import TooManyRequestsException from "./TooManyRequestsException";
import UnauthorizedException from "./UnauthorizedException";

export class ExceptionBuilder {
    /**
     * Create a Exception based on the given AxiosError.
     *
     * @param e The AxiosError to convert into a specific exception
     * @returns The corresponding error instance
     */
    static fromRequestException(e: AxiosError): FoxentryException {
        if (e.response) {
            const statusCode = e.response.status;

            switch (statusCode) {
                case 400:
                    return new BadRequestException('Request was invalid or cannot be processed.');
                case 401:
                    return new UnauthorizedException('Unauthorized. Did you set your API key?');
                case 402:
                    return new PaymentRequiredException('Payment is required to access this resource.');
                case 403:
                    return new ForbiddenException('Forbidden.');
                case 404:
                    return new NotFoundException('Resource or endpoint requested is not found on the server.');
                case 429:
                    return new TooManyRequestsException('Too many requests have been made in the given time frame or the daily limit has been reached.');
                case 500:
                    return new ServerErrorException('Internal server error.');
                case 503:
                    return new ServiceUnavailableException('The server is temporarily unable to handle the request.');
                default:
                    return new FoxentryException(`Request exception: ${e.response.statusText}`);
            }
        } else {
            return new FoxentryException(`Exception: ${e.message}`);
        }
    }
}