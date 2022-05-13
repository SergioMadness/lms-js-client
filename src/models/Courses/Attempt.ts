import { Attempt as IAttempt } from '../../interfaces/models/Courses/Attempt';
import { Model } from '../Model';

export class Attempt extends Model implements IAttempt {

    /** Status */
    public status: string;

    /** Mark */
    public mark: number;

    protected isAttemptPublic: boolean = false;

    protected data: any;

    setIsPublic(flag: boolean = true): Attempt {
        this.isAttemptPublic = flag;

        return this;
    }

    /** Check is public */
    isPublic(): boolean {
        return this.isAttemptPublic;
    }

    /** Get attempt data */
    getData(): any {
        return this.data;
    }

    setData(data: any): Attempt {
        this.data = data;

        return this;
    }

    fill(attributes: Map<string, any>): IAttempt {
        this.id = attributes.get('id');
        this.status = attributes.get('id');
        this.mark = attributes.get('mark');
        this.data = attributes.get('data');

        return this;
    }
}