import { Comment, CommentPage } from '../models/Comment';

/** What a comment can be left on */
export type CommentItemType = 'task' | 'course' | 'program';

/**
 * Interface for service to work with comments
 */
export interface Comments {
    /** The own thread of the student on an item, oldest first */
    list(itemId: string, itemType: CommentItemType, page?: number, limit?: number): Promise<CommentPage>;

    add(itemId: string, itemType: CommentItemType, text: string): Promise<Comment>;

    /** Refused once somebody has answered after it */
    update(id: string, text: string): Promise<Comment>;

    /** Refused once somebody has answered after it */
    remove(id: string): Promise<boolean>;
}
