import { Price } from "./Price";

export interface HasPrices {
    getPrices(): Array<Price>;
}