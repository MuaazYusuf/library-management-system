import { Inject, Service } from "typedi";
import { BookService, BorrowingService } from "./service";
import { FunctionHelper } from "./helpers/functionHelper";
import Logger from "./core/Logger";
import { Constants } from "./core/constants";

var cron = require('node-cron');

@Service()
export class CronJobs {
    private bookService: BookService;
    private borrowingService: BorrowingService
    constructor(@Inject() bookService: BookService, @Inject() borrowingService: BorrowingService) {
        this.bookService = bookService;
        this.borrowingService = borrowingService;
    }

    startCronJobs() {
        this.markDueBorrowingsAsDue().start();
    }

    markDueBorrowingsAsDue() {
        // Every day At 12:00 AM 
        return cron.schedule('0 0 * * *', async () => {
            try {
                const batchSize = 1000;
                let skip = 0;
                while (true) {
                    // Can be enhanced by another query
                    const nonReturnedBorrowings = await this.bookService.getAllNonReturnedBorrowings({ pageSize: batchSize, pageIndex: skip });
                    if (nonReturnedBorrowings.length === 0) break; // No more records to retrieve
                    // Can be enhanced as this causes n query problem
                    for (const book of nonReturnedBorrowings) {
                        if (FunctionHelper.isDueAfterSpecificDays(book.created_at, Constants.dueDaysConstraint)) // If that borrowing has exceeded the due days constraint, mark it as due
                            await this.borrowingService.borrowingRepository.update(book.borrowing_id, { isDue: true });
                    }
                    skip += batchSize;
                }
            } catch (error) {
                Logger.error(error)
            }
        });
    }
}