import { Expose } from "class-transformer";
import { ShelfLocation } from "../../../data/enums";

export class CreateBookResponse {
    @Expose()
    id!: number;

    @Expose()
    name!: string;

    @Expose()
    author!: string;

    @Expose()
    isbn!: string;

    @Expose()
    quantity!: number;

    @Expose()
    shelfLocation!: ShelfLocation;
}