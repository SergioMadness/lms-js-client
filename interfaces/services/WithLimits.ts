/**
 * Interface for services with pagination
 */
interface WithLimits {
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