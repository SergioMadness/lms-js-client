import { ListService } from "../ListService";
import { Task } from "../../../interfaces/models/Courses/Task";
import { TaskDeadline } from "../../../interfaces/models/Courses/TaskDeadline";

/**
 * Interface for service to work with tasks
 */
export interface Tasks extends ListService<Task> {
    /** Set course id */
    setCourseId(id: string): Tasks;

    /**
     * Get the task
     *
     * @param id
     * @param retake The student takes a passed task again: its time limit comes back
     */
    find(id: any, retake?: boolean): Promise<Task>;

    /**
     * Start the task
     *
     * Starts the countdown for a task limited by time and drops the proctoring
     * journal of the previous attempt, so a watched task has to be started even
     * when it is not timed. Calling it again does not move the deadline.
     *
     * @param taskId
     * @param retake The same flag the task was opened with
     */
    start(taskId: string, retake?: boolean): Promise<TaskDeadline>;

    /**
     * Report the active time spent on the task since the previous report
     *
     * @param taskId
     * @param seconds Delta, not a running total; the server caps it by the wall clock
     *
     * @return Total of the current attempt
     */
    reportTime(taskId: string, seconds: number): Promise<number>;
}
