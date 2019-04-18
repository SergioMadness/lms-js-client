/// <reference path="../models/News/News.ts" />
/// <reference path="ListService.ts" />
namespace Services {
    /**
     * Interface for service to work with news
     */
    export interface News extends ListService<Models.News.News> {

    }
}