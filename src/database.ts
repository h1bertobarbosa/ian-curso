import { Pool, PoolClient } from "pg";

export class Database {
  private _connection: PoolClient;

  constructor() {
    (async () => {
      const pool = new Pool({
        connectionString:
          "postgres://curso_ian:123456@localhost:5432/curso_ian",
      });
      this._connection = await pool.connect();
    })();
  }

  get connection(): PoolClient {
    return this._connection;
  }
}
