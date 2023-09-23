import { Pagination } from "../../pagination";

export class GetBooksFilter extends Pagination {
    name?: string;
    author?: string;
    isbn?: string;
}