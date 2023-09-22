import connection from "../connection";
import { Book } from "../entity/book.entity";

export const BookRepository = connection.getRepository(Book).extend({
    
})