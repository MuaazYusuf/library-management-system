import { Inject, Service } from "typedi";
import { BorrowingRepository } from "../../database/repository";
import { BookService } from "./book.service";
import { BadRequestError } from "../../core/ApiError";
import { UserService } from "../user/user.service";

@Service()
export class BorrowingService {
    @Inject() bookService!: BookService;
    @Inject() userService!: UserService
    borrowingRepository: typeof BorrowingRepository = BorrowingRepository;

    async borrowBook(bookId: number, userId: number) {
        const book = await this.bookService.getBookById(bookId);
        const user = await this.userService.getUserById(userId);
        const alreadyBorrowed = await this.borrowingRepository.checkIfBookAlreadyBorrowed(userId, bookId);
        if (alreadyBorrowed) throw new BadRequestError('You\'ve already borrowed this book before');
        const borrowingsCount = await this.borrowingRepository.getCurrentBookBorrowingsCountByBookId(bookId);
        if (book?.quantity! <= borrowingsCount) throw new BadRequestError('Book isn\'t available');
        await this.borrowingRepository.save({ book: book!, user: user!, isReturned: false });
    }

    async returnBook(bookId: number, userId: number) {
        await this.bookService.getBookById(bookId);
        await this.userService.getUserById(userId);
        const alreadyBorrowed = await this.borrowingRepository.checkIfBookAlreadyBorrowed(userId, bookId);
        if (!alreadyBorrowed) throw new BadRequestError('You haven\'t borrowed this book before');
        alreadyBorrowed.isReturned = true;
        return await this.borrowingRepository.save(alreadyBorrowed);
    }
}