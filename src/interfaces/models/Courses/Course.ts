import { Model } from "../Model";

/**
 * Interface for course model
 */
export interface Course extends Model<Course> {

    /** Course title */
    readonly title: string;

    /** Course uri */
    readonly alias: string;

    /** Note */
    readonly note: string;

    /** Description */
    readonly description: string;
}