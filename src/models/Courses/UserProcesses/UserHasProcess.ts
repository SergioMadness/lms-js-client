import { Model } from "../../Model"
import { UserHasProcess as UserHasProcessModel } from "../../../interfaces/models/Courses/UserHasProcess"
import { Course } from "../Course";
import { Program } from "../../Programs/Program";
import { objectToMap } from '../../../services/Helpers';

export class UserHasProcess extends Model implements UserHasProcessModel {
    public till: Date | null;
    public progress: number;
    public processType: string;
    public finishedAt: Date | null;
    public process: any;

    constructor(attributes: Map<string, any>) {
        super();
        this.fill(attributes);
    }

    getTill(): Date | null {
        return this.till;
    }

    getProgress(): number {
        return this.progress;
    }

    isFinished(): boolean {
        return this.getProgress() === 100;
    }

    getFinishDate(): Date | null {
        return this.finishedAt;
    }

    fill(attributes: Map<string, any>): UserHasProcessModel {
        this.processType = attributes.get('process_type');
        this.process = this.processType === 'course' ? new Course(objectToMap(attributes.get('process'))) : new Program(objectToMap(attributes.get('process')));

        // both dates are nullable: an unlimited access and an unfinished process
        // carry no date, and new Date(null) would silently become 01.01.1970
        const till = attributes.get('till');
        this.till = till ? new Date(till) : null;
        this.progress = attributes.get('progress');
        const finishDate = attributes.get('finish_date');
        this.finishedAt = finishDate ? new Date(finishDate) : null;

        return this;
    }

}