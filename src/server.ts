import "reflect-metadata";
require('dotenv').config();
import Logger from './core/Logger';
import { port } from './config';
import app from './app';
import connection from "./database/connection";

const start = async (): Promise<void> => {
    try {
        await connection.sync();
        app.listen(3000, () => {
            Logger.info(`server running on port : ${port}`);
        });
    } catch (error) {
        Logger.error(error);
        process.exit(1);
    }
};

void start();