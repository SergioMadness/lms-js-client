/**
 * A comment of the thread of a student (lms-comments B2C)
 *
 * A student sees only the own thread of an item: the questions and the
 * answers of the teacher and of the AI tutor, oldest first.
 */
export interface Comment {
    id: string;

    authorName: string;

    authorAvatar: string | null;

    /** An answer of the AI tutor */
    isAi: boolean;

    /** Plain text */
    text: string;

    /** "Y-m-d H:i:s" */
    createdAt: string | null;

    updatedAt: string | null;

    wasUpdated: boolean;
}

/** One page of a thread */
export interface CommentPage {
    items: Comment[];

    total: number;

    pageQty: number;
}
