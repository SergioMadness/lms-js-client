/**
 * Interface for service to work with certificates
 */
export interface Certificates {
    /**
     * Get certificate image
     * 
     * @param courseId 
     * @param taskId 
     */
    getImage(courseId: string, taskId: string): Promise<string>;
}