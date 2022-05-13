import { Model } from "../Model";

/**
 * Interface for attempt model
 */
export interface Attempt extends Model<Attempt> {
    /** Status */
    readonly status: string;

    /** Mark */
    readonly mark: number;

    /** Check is public */
    isPublic(): boolean;

    /** Get attempt data */
    getData(): any;
}