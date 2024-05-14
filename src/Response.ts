import { AxiosHeaderValue, AxiosHeaders } from "axios";

/**
 * Response class for handling API responses.
 */
export class Response {
    private data: any;
    private headers: any;

    constructor(response: any, headers: any) {
        if (typeof response !== 'object')
            response = JSON.parse(response);

        this.headers = headers;
        this.data = response;
    }

    public getStatus(): number {
        return this.data?.status;
    }

    public getHeaders(): AxiosHeaders {
        return this.headers;
    }

    public getRateLimit(): AxiosHeaderValue {
        return this.headers.get('foxentry-rate-limit');
    }

    public getRateLimitPeriod(): number {
        return this.headers.get('foxentry-rate-limit-period');
    }

    public getRateLimitRemaining(): number {
        return this.headers.get('foxentry-rate-limit-remaining');
    }

    public getDailyCreditsLeft(): number {
        return this.headers.get('foxentry-daily-credits-left');
    }

    public getDailyCreditsLimit(): number {
        return this.headers.get('foxentry-daily-credits-limit');
    }

    public getApiVersion(): number {
        return parseFloat(this.headers.get('foxentry-api-version'))
    }

    public getRequest(): any {
        return this.data?.request ?? null;
    }

    public getResponse(): any {
        return this.data?.response ?? null;
    }

    public getResult(): any {
        let result = this.getResponse()?.result ?? null;
        if (!result) {
            result = this.getResponse()?.results ?? null;
        }
        return result;
    }

    public getResultCorrected(): any {
        return this.getResponse()?.resultCorrected ?? null;
    }

    public getSuggestions(): any {
        return this.getResponse()?.suggestions ?? null;
    }

    public getErrors(): any {
        return this.data?.errors ?? null;
    }
}
