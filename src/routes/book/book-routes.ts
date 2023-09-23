import express from 'express';
import asyncHandler from '../../helpers/asyncHelper'
import createBookSchema from './schema/create-book.schema';
import validator, { ValidationSource } from '../../helpers/validator';
import { SuccessMsgResponse, SuccessResponse } from '../../core/ApiResponse';
import getByIdSchema from '../get-by-id.schema';
import Container from 'typedi';
import { BookService } from '../../service';
import { plainToClass } from 'class-transformer';
import { CreateBookResponse } from './response/create-book.response';
import updateBookSchema from './schema/update-book.schema';
import getBooksSchema from './schema/get-books.schema';
import { GetBooksFilter } from './filter/get-books-filter';
import { GetBooksQueryBuilder } from './filter/builder/get-books-query.builder';
import { IPagination } from '../pagination.interface';

const router = express.Router();

const bookService = Container.get(BookService);

router.post('/',
    validator(createBookSchema),
    asyncHandler(async (req, res) => {
        new SuccessResponse('Book created successfully', plainToClass(CreateBookResponse, await bookService.create(req.body), { excludeExtraneousValues: true })).send(res);
    })
)

router.get('/:id',
    validator(getByIdSchema, ValidationSource.PARAM),
    asyncHandler(async (req, res) => {
        new SuccessResponse('Success', await bookService.getBookById(parseInt(req.params.id))).send(res);
    })
)

router.delete('/:id',
    validator(getByIdSchema, ValidationSource.PARAM),
    asyncHandler(async (req, res) => {
        await bookService.deleteBookById(parseInt(req.params.id));
        new SuccessMsgResponse('Success').send(res);
    })
)

router.put('/:id',
    validator(getByIdSchema, ValidationSource.PARAM),
    validator(updateBookSchema),
    asyncHandler(async (req, res) => {
        new SuccessResponse('Success', await bookService.updateBookById(parseInt(req.params.id), req.body)).send(res);
    })
)

router.get('/',
    validator(getBooksSchema, ValidationSource.QUERY),
    asyncHandler(async (req, res) => {
        const builder = new GetBooksQueryBuilder();        
        const query = plainToClass(GetBooksFilter, req.query);
        const pagination: IPagination = {pageSize: query.pageSize, pageIndex: query.pageIndex}
        const { whereConditions, parameters } = builder.withName(query.name)
        .withAuthor(query.author)
        .withISBN(query.isbn).build();
        new SuccessResponse('Success', await bookService.getBookByFilters(whereConditions, parameters, pagination)).send(res);
    })
)

export default router;