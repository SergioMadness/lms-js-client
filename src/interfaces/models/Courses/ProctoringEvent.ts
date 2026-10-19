/**
 * Event collected while a proctored task is being passed
 *
 * The kinds are decided by the server: a task carries the aliases it watches
 * (`proctoring_signals`), and anything else is dropped without a word. Nothing
 * here proves cheating - the collector lives in the client and can be turned
 * off, so an empty journal means "no data", not "a clean attempt".
 */
export interface ProctoringEvent {

    /** Signal alias, one of the aliases the task lists */
    type: string;

    /** Moment of the event, ISO 8601. The server replaces anything unparseable, future or older than an hour with its own clock */
    at?: string;

    /** Details of the event; the core keeps only the numeric `duration` and `count` */
    payload?: any;
}
