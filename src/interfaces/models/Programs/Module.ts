import { Model } from "../Model";
import { Course } from "../Courses/Course";

/**
 * Interface for program module
 */
export interface Module extends Model<Module> {

    /** Module id */
    readonly id: string;

    /** Module title */
    readonly title: string;

    /** Variadic module */
    readonly isVariadic: boolean;

    /** Module selected */
    readonly isSelected: boolean;

    /** List of courses */
    readonly courses: Array<Course>;
}