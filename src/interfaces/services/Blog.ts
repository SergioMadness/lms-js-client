import { ListService } from './ListService';
import { Topic } from '../models/Blog/Topic';

/**
 * Interface for service to work with blog
 */
export interface Blog extends ListService<Topic> {

}