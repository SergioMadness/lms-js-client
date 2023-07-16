import { Model } from './Model';

export interface File extends Model<File> {
    id: string;

    name: string;

    url: string;

    size: number;
}