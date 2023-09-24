export class FunctionHelper {
    constructor() { }

    public static isDueAfterSpecificDays(inputDate: Date, days: number): boolean {
        const currentDate = new Date();
        const dueDate = new Date(inputDate);
        dueDate.setDate(dueDate.getDate() + days);
        return currentDate >= dueDate;
    }
}