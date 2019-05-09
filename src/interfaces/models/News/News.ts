import { Model } from '../Model';

/**
 * Interface for News model
 */
export interface News extends Model<News> {
    /**
     * Model name
     */
    readonly name: string;

    /**
     * News title
     */
    readonly title: string;

    /**
     * News preview / short text
     */
    readonly preview: string;

    /**
     * News body
     */
    readonly body: string;

    /**
     * Publish date
     */
    readonly publishDate: Date;

    /**
     * Cover for news
     */
    readonly cover: string;
}