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
     */
    save(courseId:string, taskId: string, data: any): Promise<Attempt>;
}