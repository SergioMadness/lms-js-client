import { Model } from "../Model";
import { Price } from "../Payment/Price";

/**
 * A course of a program, as the program shows it (lms-courses ProgramTransformer)
 */
export interface ProgramCourse {
    readonly id: string;
    readonly title: string;
    readonly alias: string;
    readonly note: string;
    readonly cover: string | null;
    /** Minutes */
    readonly timeLimit: number | null;
    readonly accessType: string;
    /** 0..100, null for a guest */
    readonly progress: number | null;
    readonly finished: boolean;
    /** The server sends 1/0 here, a bool on the program itself */
    readonly hasAccess: boolean;
}

/**
 * The certificate of a finished program (lms-certificates), only for a signed-in student
 */
export interface ProgramCertificate {
    /** Issued already, or the program is finished and the school has a template */
    readonly available: boolean;
    readonly issued: boolean;
    readonly imageUrl: string | null;
    readonly pdfUrl: string | null;
}

/**
 * Interface for program model
 */
export interface Program extends Model<Program> {

    /** Program title */
    readonly title: string;

    /** Program uri */
    readonly alias: string;

    /** Note */
    readonly note: string;

    /** Description, HTML; only on a single program */
    readonly description: string;

    /** free | need_registration | payed | by_grant */
    readonly accessType: string;

    /** Minutes, the program's own or the sum of its courses */
    readonly timeLimit: number | null;

    readonly coursesCount: number;

    readonly hasAccess: boolean;

    /** ISO 8601, null when unlimited or not held */
    readonly accessTill: string | null;

    /** A signed-in student may enroll for free right now */
    readonly canEnroll: boolean;

    /** 0..100, null for a guest */
    readonly progress: number | null;

    readonly finished: boolean;

    readonly finishedAt: string | null;

    readonly courses: Array<ProgramCourse>;

    readonly certificate: ProgramCertificate | null;

    getPrices(): Price[];
}
