import { Model } from "./Model";
import { File as IFile } from '../interfaces/models/File';

export class File extends Model implements IFile {
    id: string;

    name: string;

    url: string;

    size: number;

    constructor(attributes: Map<string, any>) {
        super();
        if (attributes) {
            this.fill(attributes);
        }
    }

    fill(attributes: Map<string, any>): File {
        this.id = attributes.get('id');
        this.name = attributes.get('name');
        this.url = attributes.get('url');
        this.size = attributes.get('size');

        return this;
    }
}