import { Index as IIndexModel } from "../../../interfaces/models/Courses/Index/Index";
import { Course } from "../../../interfaces/models/Courses/Course";

/**
 * Interface for service to work with course index
 */
export interface Index {
    /** Get index */
    get(course: Course): Promise<IIndexModel>;
}