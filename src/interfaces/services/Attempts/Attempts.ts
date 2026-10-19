import { Attempt } from "../../models/Courses/Attempt";

/**
 * Interface for service to work with attempta
 */
export interface Attempts {
    /**
     * Get taskattempt
     * 
     * @param courseId
     * @param taskId 
     */
    get(courseId: string, taskId: string): Promise<Attempt>;

    /**
     * Save attempt
     * 
     * @param courseId
     * @param taskId 
     * @param data 
     * @param retake The same flag the task was opened and started with
     */
    save(courseId:string, taskId: string, data: any, retake?: boolean): Promise<Attempt>;
}
