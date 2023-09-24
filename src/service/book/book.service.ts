import { Book } from "../../database/entity/book.entity";
import { Service } from "typedi";
import { BookRepository } from "../../database/repository";
import { NotFoundError } from "../../core/ApiError";
import { IPagination } from "../../routes/pagination.interface";
import { INonReturnedBorrowings } from "../../data/interfaces";

@Service()
export class BookService {
    bookRepository: typeof BookRepository = BookRepository;

    async create(item: {}): Promise<Book> {
        return this.bookRepository.save(item);
    }

    async getBookById(id: number): Promise<Book | null> {
        const book = await this.bookRepository.findOneBy({ id });
        if (!book) throw new NotFoundError('Book not found');
        return book;
    }

    async deleteBookById(id: number) {
        await this.getBookById(id);
        await this.bookRepository.delete(id);
    }

    async updateBookById(id: number, data: {}) {
        await this.getBookById(id);
        return await this.bookRepository.save({ id, ...data });
    }

    async getBookByFilters(whereConditions: string, parameters: Record<string, any>, pagination: IPagination) {
        return await this.bookRepository.getBooks(whereConditions, parameters, pagination);
    }

    async getAllNonReturnedBorrowings(pagination: IPagination): Promise<INonReturnedBorrowings[]> {        
        return await this.bookRepository.getAllNonReturnedBorrowings(pagination);
    }
}