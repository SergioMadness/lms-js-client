import { WebService } from "./WebService";
import * as constants from './HttpMethods';
import { Storage as IStorage } from '../interfaces/services/Storage';
import { File as IFile } from "../interfaces/models/File";
import { File } from "../models/File";

export const METHOD_UPLOAD_TEMPORARY = '/api/v2/files/temporary';

export const METHOD_GET_FILE = '/api/v2/files/{fileId}';

export class Storage extends WebService implements IStorage {

    /**
     * Get file by id
     * 
     * @param id 
     */
    async get(id: string): Promise<IFile> {
        const response = await this.getTransport().send(METHOD_GET_FILE, constants.HTTP_METHOD_GET, new Map<string, any>([
            ['fileId', id]
        ]));

        return new File(response.data);
    }

    /**
     * Upload file
     * 
     * @param file 
     */
    async uploadTemporary(file: object): Promise<string> {
        const response = await this.getTransport().sendMultipart(METHOD_UPLOAD_TEMPORARY, new Map<string, any>([
            ['file', file]
        ]));

        return response.data;
    }

    /**
     * Remove file
     * 
     * @param id 
     */
    async remove(id: string): Promise<boolean> {
        const response = await this.getTransport().send(METHOD_UPLOAD_TEMPORARY, constants.HTTP_METHOD_DELETE, new Map<string, any>([
            ['raw-content', id]
        ]));

        return true;
    }
}