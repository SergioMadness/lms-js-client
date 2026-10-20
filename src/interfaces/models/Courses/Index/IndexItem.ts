/**
 * Interface for index item
 */
export interface IndexItem {
    /** Get item id */
    getId(): string;

    /** Get lable */
    getLabel(): string;

    /** Get task type */
    getType(): string;

    /** Check item is available */
    isAvailable(): boolean;

    /** Check item was passed */
    isPassed(): boolean;

    /** Check step is successful */
    isSuccessful(): boolean;

    /** Step failed */
    isFailed(): boolean;

    /** The step is closed by its schedule or by the schedule of a section above it */
    isScheduled(): boolean;

    /** When the step closed by a schedule opens (ISO 8601); null when it is not known yet */
    getOpensAt(): string | null;

    /** Get children */
    children(): Array<IndexItem>;
}