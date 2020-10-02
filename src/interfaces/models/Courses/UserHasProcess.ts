import { Model } from "../Model";

/**
 * Interface for user->process link model
 */
export interface UserHasProcess extends Model<UserHasProcess> {

    /**
     * Get date till what process is available
     */
    getTill(): Date;

    /**
     * Get progress
     */
    getProgress(): number;

    /**
     * Check process was finished
     */
    isFinished(): boolean;

    /**
     * Get finish date
     */
    getFinishDate(): Date;
}