import { File } from '../models/File';

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

    /**
     * Get file by id
     * 
     * @param id 
     */
    get(id: string): Promise<File>;
}