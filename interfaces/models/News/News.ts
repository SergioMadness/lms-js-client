/// <reference path="../Model.ts" />
namespace Interfaces.Models.News {
    /**
     * Interface for News model
     */
    export interface News extends Model {
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
}