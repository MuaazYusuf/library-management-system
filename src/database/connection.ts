import { db, environment } from "../config";
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
    synchronize: environment == 'development' ? true : false,
    migrations: [__dirname + '/../database/migrations/'],
    migrationsTableName: "migrations",
});

export default connection;