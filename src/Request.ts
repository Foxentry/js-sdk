import { ExceptionBuilder } from './Exception/ExceptionBuilder';
import axios, { Axios, AxiosResponse } from "axios";
import ipRegex from 'ip-regex';

/**
 * Request class for handling API requests.
 */
export default class Request {
    private baseUri: string = "https://api.foxentry.com/";
    private method: string = "POST";
    private headers: Record<string, any> = {
        "Foxentry-Include-Request-Details": false,
        "Content-Type": "application/json",
        "Accept": "application/json",
        "User-Agent": "FoxentrySdk (JS/1.1.0; ApiReference/2.0)"
    };
    private body: object | null = null;
    private customId: string | null = null;
    private query: Record<string, any> = {};
    private options: Record<string, any> | null = null;
    private endpoint: string = "";
    private httpClient: Axios;
    private apiKey: string = "";
    private client: Record<string, any> | null = null;

    constructor() {
        this.httpClient = axios.create({
            baseURL: this.baseUri
        });
    }

    public setAuth(apiKey: string): void {
        this.apiKey = apiKey;
        this.setHeader("Authorization", `Bearer ${this.apiKey}`);
    }

    public setHeader(key: string, value: any): void {
        this.headers[key] = value;
    }

    public setCustomId(id: string): void {
        this.customId = id;
    }

    public setQuery(query: Record<string, any>): void {
        this.query = query;
    }

    public setOptions(options: Record<string, any>): void {
        this.options = options;
    }

    public setBaseURL(url: string): void {
        this.baseUri = url;
        this.httpClient.defaults.baseURL = this.baseUri;
    }

    public setEndpoint(endpoint: string): void {
        this.endpoint = endpoint;
    }

    public setClientIP(ip: string): void {
        if (!ipRegex({exact: true, includeBoundaries: true}).test(ip)) {
            throw new Error("The specified IP address is not valid.");
        }

        this.client = this.client || {};
        this.client.ip = ip;
    }

    public setClientCountry(country: string): void {
        if (country.length !== 2 || !/^[A-Z]{2}$/.test(country)) {
            throw new Error("The provided country code does not conform to the ISO-3166-1 alpha-2 format.");
        }

        this.client = this.client || {};
        this.client.country = country;
    }

    public setClientLocation(lat: number, lon: number): void {
        this.client = this.client || {};
        this.client.location = { lat, lon };
    }

    public async send(): Promise<AxiosResponse> {
        try {
            this.buildBody();
            this.validate();

            const response = await this.httpClient.request({
                method: this.method,
                url: this.endpoint,
                headers: this.headers,
                data: JSON.stringify(this.body)
            })

            return response;
        } catch (error: any) {
            if (error?.isAxiosError)
                throw ExceptionBuilder.fromRequestException(error);
            else
                throw error;
        }
    }


    private buildBody(): void {
        this.body = {
            request: {
                customId: this.customId,
                query: this.query,
                options: this.options,
                client: this.client
            }
        };
    }

    private validate(): void {
        if (!this.apiKey) {
            throw new Error("API key is required. Please set the API key.");
        }

        if (!this.endpoint) {
            throw new Error("Endpoint is not set. Please specify the API endpoint.");
        }

        if (Object.keys(this.query).length === 0) {
            throw new Error("Request query is empty.");
        }

        if (!this.body) {
            throw new Error("Request body is empty.");
        }
    }
}
