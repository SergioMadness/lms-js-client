import { Attempt as IAttempt } from '../../interfaces/models/Courses/Attempt';
import { Model } from '../Model';

export class Attempt extends Model implements IAttempt {

    private mark: number;

    private progressId: string;

    private taskId: string;

    private audited: boolean = false;

    private wait_audit: boolean = true;

    private success: boolean = false;

    private date: Date;

    private data: any;

    private isAttemptPublic: boolean = false;

    constructor(attributes: Map<string, any> = null) {
        super();

        if (attributes) {
            this.fill(attributes);
        }
    }

    getStatus(): string {
        throw new Error('Method not implemented.');
    }

    setMark(mark: number): Attempt {
        this.mark = mark;

        return this;
    }

    getMark(): number {
        return this.mark;
    }

    setProgressId(progressId: string): Attempt {
        this.progressId = progressId;

        return this;
    }

    getProgressId(): string {
        return this.progressId;
    }

    setTaskId(taskId: string): Attempt {
        this.taskId = taskId;

        return this;
    }

    getTaskId(): string {
        return this.taskId;
    }

    setIsAudited(audited: boolean = true): Attempt {
        this.audited = audited;

        return this;
    }

    isAudited(): boolean {
        return this.audited;
    }

    setIsWaitAudit(flag: boolean = true): Attempt {
        this.wait_audit = flag;

        return this;
    }

    isWaitForAudit(): boolean {
        return this.wait_audit;
    }

    setIsSuccessful(flag: boolean = true): Attempt {
        this.success = flag;

        return this;
    }

    isSuccessful(): boolean {
        return this.success;
    }

    setCreatedAt(date: Date): Attempt {
        this.date = date;

        return this;
    }

    getCreatedAt(): Date {
        return this.date;
    }

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
        this.setId(attributes.get('id'));
        this.setMark(attributes.get('mark'));
        this.setData(attributes.get('data'));
        this.setIsAudited(attributes.get('audited'));
        this.setIsSuccessful(attributes.get('success'));
        this.setIsWaitAudit(attributes.get('wait_audit'));
        this.setIsWaitAudit(attributes.get('wait_audit'));
        this.setCreatedAt(new Date(attributes.get('created_at')));
        this.setTaskId(attributes.get('task_id'));
        this.setProgressId(attributes.get('progress_id'));

        return this;
    }
}