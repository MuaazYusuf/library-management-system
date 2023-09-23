import express from 'express';
import asyncHandler from '../../helpers/asyncHelper'
import validator, { ValidationSource } from '../../helpers/validator';
import { SuccessMsgResponse, SuccessResponse } from '../../core/ApiResponse';
import Container from 'typedi';
import { plainToClass } from 'class-transformer';
import { IPagination } from '../pagination.interface';
import { UserService } from '../../service/user/user.service';
import createUserSchema from './schema/create-user.schema';
import { CreateUserResponse } from './response/CreateUser.response';
import getByIdSchema from '../get-by-id.schema';
import updateUserSchema from './schema/update-user.schema';
import getUsersSchema from './schema/get-users.schema';
import { Pagination } from '../pagination';

const router = express.Router();

const userService = Container.get(UserService);

router.post('/',
    validator(createUserSchema),
    asyncHandler(async (req, res) => {
        new SuccessResponse('User created successfully', plainToClass(CreateUserResponse, await userService.create(req.body), { excludeExtraneousValues: true })).send(res);
    })
)

router.get('/:id',
    validator(getByIdSchema, ValidationSource.PARAM),
    asyncHandler(async (req, res) => {
        new SuccessResponse('Success', await userService.getUserById(parseInt(req.params.id))).send(res);
    })
)

router.delete('/:id',
    validator(getByIdSchema, ValidationSource.PARAM),
    asyncHandler(async (req, res) => {
        await userService.deleteUserById(parseInt(req.params.id));
        new SuccessMsgResponse('Success').send(res);
    })
)

router.put('/:id',
    validator(getByIdSchema, ValidationSource.PARAM),
    validator(updateUserSchema),
    asyncHandler(async (req, res) => {
        new SuccessResponse('Success', await userService.updateUserById(parseInt(req.params.id), req.body)).send(res);
    })
)

router.get('/',
    validator(getUsersSchema, ValidationSource.QUERY),
    asyncHandler(async (req, res) => {
        const query = plainToClass(Pagination, req.query);
        const pagination: IPagination = { pageSize: query.pageSize, pageIndex: query.pageIndex }
        new SuccessResponse('Success', await userService.getUserByFilters('', {}, pagination)).send(res);
    })
)

export default router;