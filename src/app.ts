import Logger from './core/Logger';
import express, { Request, Response, NextFunction } from 'express';
import routes from './routes';
import { ApiError, ErrorType, InternalError, NotFoundError } from './core/ApiError';
import { environment } from './config';
import { QueryFailedError } from 'typeorm';
import { BadRequestResponse, InternalErrorResponse } from './core/ApiResponse';
import { CronJobs } from './cronjobs';
import Container from 'typedi';

process.on('uncaughtException', (e) => {
    Logger.error(e);
});

const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(
    express.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 }),
);

// Routes
app.use('/', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => next(new NotFoundError()));

// Start cron jobs
Container.get(CronJobs).startCronJobs();

// Middleware Error Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ApiError) {
        ApiError.handle(err, res);
        if (err.type === ErrorType.INTERNAL)
            Logger.error(
                `500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`,
            );
    } else if (err instanceof QueryFailedError) {
        switch (err.driverError.code) {
            case 'ER_DUP_ENTRY':
                return new BadRequestResponse(err.message.split("'", 2)[1] + ' already exists').send(res);
            default:
                return new InternalErrorResponse(err.message).send(res);
        }
    } else {
        Logger.error(
            `500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`,
        );
        Logger.error(err);
        if (environment === 'development') {
            return res.status(500).send(err);
        }
        ApiError.handle(new InternalError(), res);
    }
});

export default app;