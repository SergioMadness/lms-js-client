import { News as NewsModel } from '../../interfaces/models/News/News';
import { Model } from '../Model';

/**
 * News model
 */
export class News extends Model implements NewsModel {
    fill(attributes: Map<string, any>): NewsModel {
        this.id = attributes.get('id');
        this.name = attributes.get('name');
        this.body = attributes.get('body');
        this.preview = attributes.get('preview');
        this.title = attributes.get('title');
        this.publishDate = attributes.get('publish_date');
        this.cover = attributes.get('cover');

        return this;
    }

    constructor(attributes: Map<string, any>) {
        super();
        this.fill(attributes);
    }

    /**
     * News name
     */
    name: string;

    /**
     * News title
     */
    title: string;

    /**
     * news short text
     */
    preview: string;

    /**
     * News body
     */
    body: string;

    /**
     * Publish date
     */
    publishDate: Date;

    /**
     * Cover image url
     */
    cover: string;
}