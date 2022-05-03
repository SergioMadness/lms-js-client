import { Index as IIndex } from "../../../interfaces/models/Courses/Index/Index";
import { IndexItem } from "../../../interfaces/models/Courses/Index/IndexItem";

export class Index implements IIndex {

    private items: Array<IndexItem> = new Array<IndexItem>();

    private currentItem: IndexItem;

    private currentIndex: number;

    getItems(): Array<IndexItem> {
        return this.items;
    }

    add(item: IndexItem): IIndex {
        this.items.push(item);

        return this;
    }
    next(): IIndex {
        ++this.currentIndex;

        if (this.currentIndex > this.items.length) {
            this.currentIndex = this.items.length - 1;
        }

        return this;
    }
    prev(): IIndex {
        --this.currentIndex;

        if (this.currentIndex < 0) {
            this.currentIndex = 0;
        }

        return this;
    }
    current(): IndexItem {
        return this.currentItem;
    }

    setCurrent(item: IndexItem): IIndex {
        this.currentItem = item;
        this.currentIndex = this.items.indexOf(item);

        return this;
    }
}