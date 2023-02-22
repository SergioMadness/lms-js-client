/**
 * Interface for service to upload files
 */
export interface Storage {
    /**
     * Upload temporary files
     * 
     * @param file 
     */
    uploadTemporary(file: any): Promise<string>;

    /**
     * Remove file
     * 
     * @param id 
     */
    remove(id: string): Promise<boolean>;
}