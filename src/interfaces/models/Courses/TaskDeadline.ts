/**
 * Countdown of a task returned when the task is started
 *
 * Both fields are null when the task is not limited by time: starting it is
 * still needed for a proctored task, because the server drops the previous
 * journal at that moment.
 */
export interface TaskDeadline {

    /** Moment the countdown ends, ISO 8601 */
    expiresAt: string | null;

    /** Seconds left until the deadline */
    secondsLeft: number | null;
}
