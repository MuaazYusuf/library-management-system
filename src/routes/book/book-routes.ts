import express from 'express';
import asyncHandler from '../../helpers/asyncHelper'
import createBookSchema from './schema/create-book.schema';
import validator, { ValidationSource } from '../../helpers/validator';
import { SuccessResponse } from '../../core/ApiResponse';
import getBookByIdSchema from './schema/get-book-by-id.schema';
import Container from 'typedi';
import { BookService } from '../../service';
import { plainToClass } from 'class-transformer';
import { CreateBookResponse } from './response/create-book.response';

const router = express.Router();

const bookService = Container.get(BookService);

router.post('/',
    validator(createBookSchema),
    asyncHandler(async (req, res) => {
        const book = plainToClass(CreateBookResponse, await bookService.create(req.body), { excludeExtraneousValues: true });
        new SuccessResponse('Book created successfully', book).send(res);
    })
)

router.get('/:id',
    validator(getBookByIdSchema, ValidationSource.PARAM),
    asyncHandler(async (req, res) => {
        const book = await bookService.getBookById(parseInt(req.params.id));
        new SuccessResponse('Success', book).send(res);
    })
)

export default router;