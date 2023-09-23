import { BeforeInsert, Column, CreateDateColumn, DeleteDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { DatabaseConstants } from "../../core/database-constants";
import moment from "moment";
import { Transform } from "class-transformer";
import { Borrowing } from "./borrowing.entity";

@Unique(['email'])
@Entity({ name: "users" })
export class User {
    @PrimaryGeneratedColumn()
    declare id: number

    @Column({
        length: DatabaseConstants.MEDIUM_TEXT_LENGTH,
        name: 'name',
        nullable: false,
    })
    declare name: string;

    @Column({
        length: DatabaseConstants.EMAIL_LENGTH,
        name: 'email',
        nullable: false,
    })
    @Index('email')
    declare email: string;

    @OneToMany(() => Borrowing, (borrowing) => borrowing.user)
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

    @BeforeInsert()
    emailToLowerCase() {
        this.email = this.email.trim().toLowerCase();
    }
}