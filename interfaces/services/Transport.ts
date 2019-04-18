/**
 * Interface for classes implement communication with web services
 */
interface Transport {
    /**
     * Send data to api method
     * 
     * @param apiMethod 
     * @param httpMethod 
     * @param data 
     */
    send(apiMethod: string, httpMethod: string, data: any): object;
}