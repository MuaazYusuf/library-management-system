import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";
import { Book } from "./book.entity";
import { Transform, Type } from "class-transformer";
import moment from "moment";

@Entity({ name: "borrowings" })
export class Borrowing {
    @PrimaryGeneratedColumn()
    declare id: number;

    @Type(() => User)
    @ManyToOne(() => User, (user) => user.borrowings)
    @JoinColumn({ name: 'user_id' })
    declare user: User;

    @Type(() => Book)
    @ManyToOne(() => Book, (book) => book.borrowings)
    @JoinColumn({ name: 'book_id' })
    declare book: Book;

    @Column({ name: 'is_returned', default: false })
    declare isReturned: boolean;

    @Transform(({ value }) => moment(value).toISOString())
    @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    declare createdAt: Date;

    @Transform(({ value }) => moment(value).toISOString())
    @UpdateDateColumn({
        name: 'updated_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
    })
    declare updatedAt: Date;
}
