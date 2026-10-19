import { Model } from "../Model";

/**
 * Interface for user->process link model
 */
export interface UserHasProcess extends Model<UserHasProcess> {

    /**
     * Get date till what process is available, null when the access is unlimited
     */
    getTill(): Date | null;

    /**
     * Get progress
     */
    getProgress(): number;

    /**
     * Check process was finished
     */
    isFinished(): boolean;

    /**
     * Get finish date, null while the process is not finished
     */
    getFinishDate(): Date | null;
}