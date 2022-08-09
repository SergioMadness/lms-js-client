/**
 * Interface for model with API response
 */
export interface Response {
    /**
     * Main response data
     */
    readonly data: any;

    /**
     * Meta data
     */
    readonly meta: Map<string, any>;

    /**
     * Check response has error
     */
    hasError(): boolean;

    /**
     * Get response status
     */
    getStatus(): number;

    /**
     * Get error message
     */
    getErrorMessage(): string;
}