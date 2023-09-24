import { INonReturnedBorrowings } from "../../data/interfaces";
import { IPagination } from "../../routes/pagination.interface";
import connection from "../connection";
import { Book } from "../entity/book.entity";
export const BookRepository = connection.getRepository(Book).extend({
    async getBooks(whereConditions: string, parameters: Record<string, any>, pagination: IPagination): Promise<Book[]> {
        return await this.createQueryBuilder()
            .where(whereConditions, parameters)
            .offset(pagination.pageIndex)
            .limit(pagination.pageSize)
            .getMany();
    },
    async getAllNonReturnedBorrowings(pagination: IPagination): Promise<INonReturnedBorrowings[]> {
        return await this.createQueryBuilder('book')
            .innerJoinAndSelect('book.borrowings', 'borrowing')
            .select('book.id')
            .addSelect('borrowing.id')
            .addSelect('borrowing.isReturned')
            .addSelect('borrowing.created_at')
            .offset(pagination.pageIndex)
            .limit(pagination.pageSize)
            .getRawMany();
    }
})