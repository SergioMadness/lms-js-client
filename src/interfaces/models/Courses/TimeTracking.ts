/**
 * How the active time of a task is counted, the same periods the website script uses
 */
export interface TimeTracking {

    /** Seconds away from the task before the counting pauses */
    pauseAfter: number;

    /** Seconds without any action before the counting pauses */
    idleAfter: number;

    /** Seconds between two reports */
    reportInterval: number;
}
