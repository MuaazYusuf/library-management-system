
export class BaseQueryBuilder {
    protected queryConditions: string[] = [];
    protected parameters: Record<string, any> = {};
    constructor() { }

    build(): { whereConditions: string; parameters: Record<string, any> } {
        return {
            whereConditions: this.queryConditions.join(' AND '),
            parameters: this.parameters,
        };
    }
}