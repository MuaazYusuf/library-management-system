import { Sequelize } from "sequelize-typescript";
import { db } from "../config";
import { Dialect } from "sequelize";

const connection = new Sequelize({
    dialect: db.dialect as Dialect,
    host: db.host,
    username: db.user,
    password: db.password,
    database: db.name,
    logging: false,
    port: parseInt(db.port!)
});

export default connection;