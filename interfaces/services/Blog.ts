/// <reference path="../models/Blog/Topic.ts" />
/// <reference path="ListService.ts" />
namespace Services {
    /**
     * Interface for service to work with blog
     */
    export interface Blog extends ListService<Models.Blog.Topic> {

    }
}