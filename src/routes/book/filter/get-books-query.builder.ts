import { BaseQueryBuilder } from "../../base-query.builder";

export class GetBooksQueryBuilder extends BaseQueryBuilder {
    constructor() {
        super();
    }

    withName(name: string | undefined): GetBooksQueryBuilder {
        if (name) {
            this.queryConditions.push(
                `book.name LIKE :name`
            );
            this.parameters['name'] = `%${name.toLowerCase()}%`;
        }
        return this;
    }

    withAuthor(author: string | undefined): GetBooksQueryBuilder {
        if (author) {
            this.queryConditions.push(
                `book.author LIKE :author`
            );
            this.parameters['author'] = `%${author.toLowerCase()}%`;
        }
        return this;
    }

    withISBN(isbn: string | undefined): GetBooksQueryBuilder {
        if (isbn) {
            this.queryConditions.push('book.isbn = :isbn');
            this.parameters['isbn'] = isbn;
        }

        return this;
    }
}