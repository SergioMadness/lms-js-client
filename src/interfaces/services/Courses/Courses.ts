import { ListService } from "../ListService";
import { Course } from "../../../interfaces/models/Courses/Course";

/**
 * Interface for service to work with courses
 */
export interface Courses extends ListService<Course> {

}