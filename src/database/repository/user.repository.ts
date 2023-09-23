import { IPagination } from "../../routes/pagination.interface";
import connection from "../connection";
import { User } from "../entity/user.entity";

export const UserRepository = connection.getRepository(User).extend({
    getUsers(whereConditions: string, parameters: Record<string, any>, pagination: IPagination) {
        return this.createQueryBuilder()
            .where(whereConditions, parameters)
            .skip(pagination.pageIndex)
            .take(pagination.pageSize)
            .getMany();
    }
})