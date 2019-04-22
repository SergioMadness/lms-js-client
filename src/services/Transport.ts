namespace Services {
    /**
     * Class to process requests
     */
    export class Transport implements Interfaces.Services.Transport {
        /**
         * Send request, get response
         * 
         * @param apiMethod 
         * @param httpMethod 
         * @param data 
         */
        async send(apiMethod: string, httpMethod: string, data: Map<string, any>): Promise<Array<Map<string, any>>> {
            const response = await request(httpMethod, this.prepareUrl(apiMethod),
                httpMethod === HTTP_METHOD_GET ? this.prepareData(data) : {},
                httpMethod !== HTTP_METHOD_GET ? this.prepareData(data) : {},
            );
            return response.json<Array<Map<string, any>>>();
        }

        /**
         * Prepare URL
         * 
         * @param apiMethod 
         */
        prepareUrl(apiMethod: string): string {
            return apiMethod;
        }

        /**
         * Prepare data
         * 
         * @param data 
         */
        prepareData(data: Map<string, any>): Map<string, any> {
            return data
        }
    }
}