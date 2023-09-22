import { db } from "../config";
import { Book } from "./entity/book.entity";
import { DataSource } from "typeorm";

const connection = new DataSource({
    type: "mysql",
    host: db.host,
    username: db.user,
    password: db.password,
    database: db.name,
    logging: false,
    port: parseInt(db.port!),
    entities: [Book],
    synchronize: true,
});

export default connection;