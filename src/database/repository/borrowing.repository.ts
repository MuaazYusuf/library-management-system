import connection from "../connection";
import { Borrowing } from "../entity/borrowing.entity";

export const BorrowingRepository = connection.getRepository(Borrowing).extend({
    async getCurrentBookBorrowingsCountByBookId(bookId: number): Promise<number> {
        return await this.createQueryBuilder('borrowings')
            .where('borrowings.book_id = :bookId', { bookId })
            .andWhere('borrowings.is_returned = :isReturned', { isReturned: false })
            .getCount();
    },
    async checkIfBookAlreadyBorrowed(userId: number, bookId: number): Promise<Borrowing | null> {
        return await this.createQueryBuilder('borrowings')
        .where('borrowings.book_id = :bookId', { bookId })
        .andWhere('borrowings.user_id = :userId', { userId })
        .andWhere('borrowings.is_returned = :isReturned', { isReturned: false })
        .getOne()
    }
})