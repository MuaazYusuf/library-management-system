import { Book } from "../../database/entity/book.entity";
import { Service } from "typedi";
import { BookRepository } from "../../database/repository";

@Service()
export class BookService {
    bookRepository: typeof BookRepository = BookRepository

    async create(item: {}): Promise<Book> {
        return this.bookRepository.save(item);
    }

    async getBookById(id: number): Promise<Book | null> {
        return await this.bookRepository.findOneBy({ id });
    }
}