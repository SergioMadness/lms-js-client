/// <reference path="../../interfaces/models/Blog/Topic.ts" />
namespace Models.Blog {

    /**
     * Topic model
     */
    export class Topic implements Interfaces.Models.Blog.Topic {
        /**
         * Topic id
         */
        id: number;
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
}