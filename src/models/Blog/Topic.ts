import { Topic as TopicModel } from '../../interfaces/models/Blog/Topic';
import { Model } from '../Model';

/**
 * Topic model
 */
export class Topic extends Model implements TopicModel {

    constructor(attributes: Map<string, any>) {
        super();
        this.fill(attributes);
    }

    fill(attributes: Map<string, any>): TopicModel {
        this.id = attributes.get('id');
        this.name = attributes.get('name');
        this.title = attributes.get('title');
        this.preview = attributes.get('preview');
        this.body = attributes.get('body');
        this.publishDate = attributes.get('publish_date');
        this.cover = attributes.get('cover');

        return this;
    }
    /**
     * Topic name
     */
    name: string;
    /**
     * Topic title
     */
    title: string;
    /**
     * Topic short text
     */
    preview: string;
    /**
     * Topic body
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