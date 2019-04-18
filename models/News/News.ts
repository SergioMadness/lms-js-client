/// <reference path="../../interfaces/models/News/News.ts" />
namespace Models.News {
    /**
     * News model
     */
    export class News implements Interfaces.Models.News.News {
        /**
         * News id
         */
        id: number;
        
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
}