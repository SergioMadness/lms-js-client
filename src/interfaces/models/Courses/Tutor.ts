/**
 * The AI tutor of a course (lms-ai)
 *
 * A lesson of the B2C API carries `tutor` when the tutor of its course is
 * turned on and paid for; the dialogue itself lives at
 * /api/v2/courses/{courseId}/tutor/*.
 */

/** What the lesson says about the tutor */
export interface TutorSettings {

    /** The tutor may be shown on this lesson */
    enabled: boolean;

    /** Questions the student may still ask today */
    remainingToday: number | null;
}

/** One line of the dialogue */
export interface TutorMessage {

    id: string;

    /** `user` or `assistant` */
    role: string;

    /** Plain text, never HTML */
    text: string;

    /** Lesson the question was asked on, when known */
    taskId: string | null;

    /** ISO 8601 */
    createdAt: string | null;
}

/** The dialogue of the student with the tutor of a course */
export interface TutorDialogue {

    /** Oldest first */
    messages: TutorMessage[];

    remainingToday: number | null;
}

/** The answer to one question */
export interface TutorAnswer {

    answer: TutorMessage;

    remainingToday: number | null;
}
