import { IndexItem as IIndexItem } from "../../../interfaces/models/Courses/Index/IndexItem";

export class IndexItem implements IIndexItem {
    private id: string;

    private label: string;

    private alias: string;

    private available: boolean;

    private passed: boolean;

    private success: boolean;

    private failed: boolean;

    private items: Array<IIndexItem>;

    setId(id: string): IndexItem {
        this.id = id;

        return this;
    }

    getId(): string {
        return this.id;
    }

    setLabel(label: string): IndexItem {
        this.label = label;

        return this;
    }

    getLabel(): string {
        return this.label;
    }

    setIsAvailable(flag: boolean): IndexItem {
        this.available = flag;

        return this;
    }

    isAvailable(): boolean {
        return this.available;
    }

    setIsPassed(flag: boolean): IndexItem {
        this.passed = flag;

        return this;
    }

    isPassed(): boolean {
        return this.passed;
    }

    setIsSuccessful(flag: boolean): IndexItem {
        this.success = flag;

        return this;
    }

    isSuccessful(): boolean {
        return this.success;
    }

    setIsFailed(flag: boolean): IndexItem {
        this.failed = flag;

        return this;
    }

    isFailed(): boolean {
        return this.failed;
    }

    addItem(item: IIndexItem): IndexItem {
        this.items.push(item);

        return this;
    }

    setItems(items: Array<IIndexItem>): IndexItem {
        this.items = items;

        return this;
    }

    children(): Array<IIndexItem> {
        return this.items;
    }
}