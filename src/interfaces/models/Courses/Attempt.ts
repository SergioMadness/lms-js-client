import { Model } from "../Model";

/**
 * Interface for attempt model
 */
export interface Attempt extends Model<Attempt> {

    /**
     * Attempt status
     */
    getStatus(): string;

    /**
     * Mark
     */
    getMark(): number;

    /**
     * Progress id
     */
    getProgressId(): string;

    /**
     * Task id
     */
    getTaskId(): string;

    /**
     * Check is audited
     */
    isAudited(): boolean;

    /**
     * Check is wating for audit
     */
    isWaitForAudit(): boolean;

    /**
     * Check attempt successful
     */
    isSuccessful(): boolean;

    /**
     * Get date of attempt
     */
    getCreatedAt(): Date;

    /** Check is public */
    isPublic(): boolean;

    /** Get attempt data */
    getData(): any;
}