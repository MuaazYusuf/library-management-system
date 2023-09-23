import { db } from "../config";
import { DataSource } from "typeorm";

const connection = new DataSource({
    type: "mysql",
    host: db.host,
    username: db.user,
    password: db.password,
    database: db.name,
    logging: false,
    port: parseInt(db.port!),
    entities: [__dirname + '/../database/**/*.entity{.ts,.js}'],
    synchronize: true,
});

export default connection;