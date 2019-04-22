/// <reference path="../interfaces/services/Transport.ts" />
/// <reference path="../interfaces/services/WithLimits.ts" />
/// <reference path="../interfaces/services/Conditional.ts" />
namespace Services {
    /**
     * Base web service
     */
    export abstract class WebService<T> {
        private transport: Interfaces.Services.Transport;

        private whereConditions: Map<string, any>;

        private limitConstraint: number = 10;

        private offsetConstraint: number = 0;

        /**
         * Set transport
         * 
         * @param transport 
         */
        setTransport(transport: Interfaces.Services.Transport): Services.WebService<T> {
            this.transport = transport;

            return this;
        }

        /**
         * Get transport
         */
        getTransport(): Interfaces.Services.Transport {
            return this.transport;
        }

        /**
         * Set limit
         * 
         * @param limit 
         */
        limit(limit: number): Interfaces.Services.WithLimits {
            this.limitConstraint = limit;
            return this;
        }

        /**
         * Get limit
         */
        getLimit(): number {
            return this.limitConstraint;
        }

        /**
         * Set offset
         * 
         * @param offset 
         */
        offset(offset: number): Interfaces.Services.WithLimits {
            this.offsetConstraint = offset;
            return this;
        }

        /**
         * Get offset
         */
        getOffset(): number {
            return this.offsetConstraint;
        }

        /**
         * Add conditions
         * 
         * @param key 
         * @param value 
         */
        where(key: string, value: any): Interfaces.Services.Conditional {
            this.whereConditions.set(key, value);
            return this;
        }

        /**
         * Get conditions
         */
        getConditions(): Map<string, any> {
            return this.whereConditions;
        }

        /**
         * Get params
         */
        prepareParams(): any {
            let result = this.getConditions();
            result.set('limit', this.getLimit());
            result.set('offset', this.getOffset());

            return result;
        }
    }
}