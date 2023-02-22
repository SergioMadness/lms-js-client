import { WebService } from "./WebService";
import * as constants from './HttpMethods';
import { Storage as IStorage } from '../interfaces/services/Storage';

export const METHOD_UPLOAD_TEMPORARY = '/api/v2/files/temporary';

export class Storage extends WebService implements IStorage {
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