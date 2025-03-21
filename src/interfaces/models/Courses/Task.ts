import { Model } from "../Model";
import { Attempt } from "./Attempt";

/**
 * Interface for course model
 */
export interface Task extends Model<Task> {

    /** Course title */
    readonly title: string;

    /** Course uri */
    readonly alias: string;

    /** Note */
    readonly note: string;

    /** Description */
    readonly description: string;

    getAttempt(): Attempt;
}