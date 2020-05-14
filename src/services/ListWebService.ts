import { WithLimits } from '../interfaces/services/WithLimits';
import { Conditional } from '../interfaces/services/Conditional';
import { WebService } from './WebService';

/**
 * Base web service
 */
export abstract class ListWebService<T> extends WebService {
    private whereConditions: Map<string, any> = new Map<string, any>();

    private limitConstraint: number = 10;

    private offsetConstraint: number = 0;

    /**
     * Set limit
     * 
     * @param limit 
     */
    limit(limit: number): WithLimits {
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
    offset(offset: number): WithLimits {
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
    where(key: string, value: any): Conditional {
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