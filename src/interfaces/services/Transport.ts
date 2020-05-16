import { AuthCredentials } from "../../interfaces/models/Users/AuthCredentials";

/**
 * Interface for classes implement communication with web services
 */
export interface Transport {
    /**
     * Send data to api method
     * 
     * @param apiMethod 
     * @param httpMethod 
     * @param data 
     */
    send(apiMethod: string, httpMethod: string, data: Map<string, any>): Promise<Array<Map<string, any>>>;

    /**
     * Set authorization data
     * 
     * @param credentials 
     */
    setAuthCredentials(credentials: AuthCredentials): Transport;
}