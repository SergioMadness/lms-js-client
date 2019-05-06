namespace Interfaces {
    /**
     * Interface for models could be convert to map
     */
    export interface Arrayable {
        toArray(): Map<string, any>;
    }
}