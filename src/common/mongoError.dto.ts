export interface MongoError {
    driver: boolean,
    name: "MongoError" | string,
    index: number,
    code: number,
    keyPattern: {
        [key: string]: number
    },
    keyValue: {
        [key: string]: any
    }
}