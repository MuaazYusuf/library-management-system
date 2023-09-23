import { Expose } from "class-transformer";

export class CreateUserResponse {
    @Expose()
    id!: number;

    @Expose()
    name!: string;

    @Expose()
    email!: string;
}