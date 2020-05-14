import { ListService } from "../ListService";
import { Task } from "../../../interfaces/models/Courses/Task";

/**
 * Interface for service to work with tasks
 */
export interface Tasks extends ListService<Task> {
    /** Set course id */
    setCourseId(id: string): Tasks;
}