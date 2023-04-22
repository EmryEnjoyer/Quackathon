import { Database } from "sqlite3"

export const executeQueries = (db: Database, queryGroup: any) => {
    Object.values(queryGroup).forEach((value: string) => {
        db.exec(value);
    })
}