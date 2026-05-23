export interface DatabaseAdapter {

    connect(): Promise<void>;

    disconnect(): Promise<void>;

    query(sql: string): Promise<any[]>;

    getSchema(): Promise<string>;
}
