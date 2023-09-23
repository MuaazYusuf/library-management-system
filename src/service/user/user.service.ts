import { Service } from "typedi";
import { UserRepository } from "../../database/repository/user.repository";
import { NotFoundError } from "../../core/ApiError";
import { User } from "../../database/entity/user.entity";
import { IPagination } from "../../routes/pagination.interface";

@Service()
export class UserService {
    userRepository: typeof UserRepository = UserRepository

    async create(item: {}): Promise<User> {
        return this.userRepository.save(item);
    }

    async getUserById(id: number): Promise<User | null> {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) throw new NotFoundError('User not found');
        return user;
    }

    async deleteUserById(id: number) {
        await this.getUserById(id);
        await this.userRepository.delete(id);
    }

    async updateUserById(id: number, data: {}) {
        await this.getUserById(id);
        return await this.userRepository.save({ id, ...data });
    }

    async getUserByFilters(whereConditions: string, parameters: Record<string, any>, pagination: IPagination) {
        return await this.userRepository.getUsers(whereConditions, parameters, pagination);
    }
}
