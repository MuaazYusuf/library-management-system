import { Column, CreateDateColumn, DeleteDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { ShelfLocation } from "../../data/enums";
import { Exclude, Transform } from 'class-transformer';
import moment from "moment";
import { DatabaseConstants } from "../../core/database-constants";
import { Borrowing } from "./borrowing.entity";


@Unique(['isbn'])
@Entity({ name: "books" })
export class Book {

    @PrimaryGeneratedColumn()
    declare id: number

    @Column({
        length: DatabaseConstants.MEDIUM_TEXT_LENGTH,
        name: 'name',
        nullable: false,
    })
    
    @Index('book-name')
    declare name: string;

    @Column({
        length: DatabaseConstants.MEDIUM_TEXT_LENGTH,
        name: 'author',
        nullable: false,
    })
    @Index('book-author')
    declare author: string;

    @Column({
        name: 'isbn',
        nullable: false,
        length: DatabaseConstants.ISBN_LENGTH
    })
    @Index('book-isbn')
    declare isbn: string;

    @Column({
        name: 'quantity'
    })
    declare quantity: number;

    @Column({
        name: 'shelf_location',
        type: 'enum',
        enum: ShelfLocation,
    })
    declare shelfLocation: ShelfLocation;

    @OneToMany(() => Borrowing, (borrowing) => borrowing.book)
    declare borrowings: Borrowing[];

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

    @DeleteDateColumn({ name: 'deleted_at' })
    @Transform(({ value }) => moment(value).toISOString())
    declare deletedAt: Date;
}