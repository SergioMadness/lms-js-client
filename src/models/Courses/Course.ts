import { Model } from "../Model"
import { Course as CourseModel } from "../../interfaces/models/Courses/Course"
import { HasPrices } from "../../interfaces/models/Payment/HasPrices";
import { Price } from "../../interfaces/models/Payment/Price";
import { Price as PriceModel } from "../Payment/Price";

export class Course extends Model implements CourseModel, HasPrices {
    public title: string;
    public alias: string;
    public note: string;
    public description: string;
    public type: string;
    public cover: string;
    public coverBig: string;
    public timeLimit: number;
    public timeLimitConverted: string;
    public accessType: string;
    public hasAccess: boolean;
    public noAccessMessage: string;
    public noAccessCode: string;
    private prices: Array<Price> = [];

    constructor(attributes: Map<string, any>) {
        super();
        this.fill(attributes);
    }

    addPrice(price: Price): CourseModel {
        this.prices.push(price);

        return this;
    }

    setPrices(prices: Array<Price>): CourseModel {
        this.prices = prices;

        return this;
    }

    getPrices(): Price[] {
        return this.prices;
    }

    fill(attributes: Map<string, any>): CourseModel {
        this.id = attributes.get('id');
        this.title = attributes.get('title');
        this.alias = attributes.get('alias');
        this.note = attributes.get('note');
        this.description = attributes.get('description');
        this.type = attributes.get('type');
        this.timeLimit = attributes.get('time_limit');
        this.timeLimitConverted = attributes.get('time_limit_converted');
        this.accessType = attributes.get('access_type');
        this.hasAccess = attributes.get('has_access');
        this.noAccessMessage = attributes.get('why_not_message');
        this.noAccessCode = attributes.get('why_not_code');

        if (attributes.get('prices')) {
            this.setPrices(attributes.get('prices').map(function (item: Map<string, any>) {
                return new PriceModel(item);
            }));
        }

        const cover = attributes.get('cover');
        if (cover && cover.medium) {
            this.cover = cover.medium;
        }
        if (cover && cover.big) {
            this.coverBig = cover.big;
        }

        return this;
    }

}