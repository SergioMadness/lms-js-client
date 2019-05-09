import { ListService } from './ListService';
import { News as NewsModel } from '../models/News/News';

/**
 * Interface for service to work with news
 */
export interface News extends ListService<NewsModel> {

}