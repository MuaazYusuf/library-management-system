import { IPagination } from "../../routes/pagination.interface";
import connection from "../connection";
import { Book } from "../entity/book.entity";
export const BookRepository = connection.getRepository(Book).extend({
    async getBooks(whereConditions: string, parameters: Record<string, any>, pagination: IPagination): Promise<Book[]> {
        return await this.createQueryBuilder()
            .where(whereConditions, parameters)
            .skip(pagination.pageIndex)
            .take(pagination.pageSize)
            .getMany();
    }
})