import { Model } from "../Model";
import { Attempt } from "./Attempt";
import { TimeTracking } from "./TimeTracking";
import { CameraSettings } from "./CameraSettings";
import { TutorSettings } from "./Tutor";

/**
 * Interface for course model
 */
export interface Task extends Model<Task> {

    /** Course title */
    readonly title: string;

    /** Course uri */
    readonly alias: string;

    /** Note */
    readonly note: string;

    /** Description */
    readonly description: string;

    /** Task is watched while it is being passed */
    readonly proctored: boolean;

    /** Aliases of the signals the server expects to be collected and reported */
    readonly proctoringSignals: string[];

    /** Max qty of attempts, null when unlimited */
    readonly attemptsLimit: number | null;

    /** Attempts the student has spent */
    readonly attemptsUsed: number;

    /** Attempts left, null when unlimited; 0 means no answer is taken any more */
    readonly attemptsLeft: number | null;

    /** The time of an attempt is limited right now (a passed task drops the limit unless it is retaken) */
    readonly timeLimited: boolean;

    /** Minutes given for an attempt */
    readonly timeLimit: number | null;

    /** Moment the countdown started, ISO 8601; null means the task has to be started first */
    readonly startedAt: string | null;

    /** Moment the time is over, ISO 8601 */
    readonly expiresAt: string | null;

    /** Seconds left at the moment of the response */
    readonly secondsLeft: number | null;

    /** Periods of the active time counting; null when the time is not counted */
    readonly timeTracking: TimeTracking | null;

    /** Settings of the camera collector, null when the camera is not watched */
    readonly camera: CameraSettings | null;

    /** The AI tutor of the course, null when there is none for this lesson */
    readonly tutor: TutorSettings | null;

    /** The student may ask about the lesson in its comments; true unless the server says no */
    readonly comments: boolean;

    getAttempt(): Attempt;
}