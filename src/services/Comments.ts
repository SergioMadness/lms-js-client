import * as constants from './HttpMethods';
import { WebService } from './WebService';
import { Comment, CommentPage } from '../interfaces/models/Comment';
import { CommentItemType, Comments as IComments } from '../interfaces/services/Comments';

export const METHOD_COMMENTS = '/api/v2/comments';

export const METHOD_COMMENT = '/api/v2/comments/{id}';

/**
 * Service to work with comments
 *
 * The AI tutor of a course answers a question on a lesson in a queued job,
 * so its answer turns up in the thread later. Refusals: 403 for a foreign
 * comment or one that has an answer, 404 for a missing one.
 */
export class Comments extends WebService implements IComments {

    async list(itemId: string, itemType: CommentItemType, page: number = 1, limit: number = 50): Promise<CommentPage> {
        const response = await this.getTransport().send(METHOD_COMMENTS, constants.HTTP_METHOD_GET, new Map<string, any>([
            ['itemId', itemId],
            ['itemType', itemType],
            ['page', page],
            ['limit', limit]
        ]));

        return {
            items: (response.data ?? []).map(Comments.commentOf),
            total: Number(response.meta.get('total') ?? 0),
            pageQty: Number(response.meta.get('pageQty') ?? 1)
        };
    }

    async add(itemId: string, itemType: CommentItemType, text: string): Promise<Comment> {
        const response = await this.getTransport().send(METHOD_COMMENTS, constants.HTTP_METHOD_POST, new Map<string, any>([
            ['itemId', itemId],
            ['itemType', itemType],
            ['comment', text]
        ]));

        return Comments.commentOf(response.data);
    }

    async update(id: string, text: string): Promise<Comment> {
        const response = await this.getTransport().send(METHOD_COMMENT, constants.HTTP_METHOD_POST, new Map<string, any>([
            ['id', id],
            ['comment', text]
        ]));

        return Comments.commentOf(response.data);
    }

    async remove(id: string): Promise<boolean> {
        await this.getTransport().send(METHOD_COMMENT, constants.HTTP_METHOD_DELETE, new Map<string, any>([
            ['id', id]
        ]));

        return true;
    }

    /** Items of a list come as Maps, a single answer too, nested objects are plain */
    private static commentOf(data: any): Comment {
        const get = (key: string) => data instanceof Map ? data.get(key) : data[key];
        const user = get('user') ?? {};

        return {
            id: String(get('id') ?? ''),
            authorName: user.name ?? '',
            authorAvatar: user.avatar || null,
            isAi: get('is_ai') === true,
            text: get('comment') ?? '',
            createdAt: get('created_at') ?? null,
            updatedAt: get('updated_at') ?? null,
            wasUpdated: get('was_updated') === true
        };
    }
}
