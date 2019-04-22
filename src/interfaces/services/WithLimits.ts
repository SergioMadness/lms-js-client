namespace Interfaces.Services {
    /**
     * Interface for services with pagination
     */
    export interface WithLimits {
        /**
         * Set limit
         * 
         * @param limit 
         */
        limit(limit: number): WithLimits;

        /**
         * Set offset
         * 
         * @param offset 
         */
        offset(offset: number): WithLimits;
    }
}