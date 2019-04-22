namespace Interfaces.Services {
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
    }
}