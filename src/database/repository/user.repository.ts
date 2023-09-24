import { IPagination } from "../../routes/pagination.interface";
import connection from "../connection";
import { User } from "../entity/user.entity";

export const UserRepository = connection.getRepository(User).extend({
    async getUsers(whereConditions: string, parameters: Record<string, any>, pagination: IPagination) {
        return await this.createQueryBuilder()
            .where(whereConditions, parameters)
            .offset(pagination.pageIndex)
            .limit(pagination.pageSize)
            .getMany();
    }
})