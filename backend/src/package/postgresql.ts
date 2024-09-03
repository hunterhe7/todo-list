import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

class PostgreSQL {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    });

    this.initialize(); // TODO better use migration
  }

  private async initialize() {
    try {
      await this.createTable('public.duty');
      console.log('Table created or already exists');
    } catch (err) {
      console.error('Error creating table:', err);
    }
  }

  private async createTable(tableName: string): Promise<void> {
    const query = `
      CREATE TABLE IF NOT EXISTS ${tableName} (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        "isDone" BOOLEAN NOT NULL DEFAULT FALSE
      )
    `;
    await this.query(query);
  }

  async query(text: string, params?: any[]): Promise<any> {
    const client = await this.pool.connect();
    try {
      const res = await client.query(text, params);
      return res.rows;
    } catch (err) {
      console.error('Database query error:', err);
      throw err;
    } finally {
      client.release();
    }
  }

  async create(table: string, data: any): Promise<any> {
    if (Object.keys(data).length === 0) {
      throw new Error('Data object cannot be empty');
    }

    const keys = Object.keys(data)
      .map(key => `"${key}"`)
      .join(', ');
    const values = Object.values(data);
    const placeholders = values.map((_, i) => `$${i + 1}`).join(', ');

    const query = `INSERT INTO ${table} (${keys}) VALUES (${placeholders}) RETURNING *`;

    console.log('Executing query:', query);

    return this.query(query, values);
  }

  async read(
    table: string,
    conditions: string = '',
    params: any[] = []
  ): Promise<any> {
    const query = `SELECT * FROM ${table} ${conditions}`;

    console.log('read query', query);

    return this.query(query, params);
  }

  async update(
    table: string,
    data: any,
    conditions: string,
    params: any[] = []
  ): Promise<any> {
    const updates = Object.keys(data)
      .map((key, i) => `"${key}" = $${i + 1}`)
      .join(', ');
    const values = [...Object.values(data)];
    const query = `UPDATE ${table} SET ${updates} WHERE ${conditions} RETURNING *`;

    // Adjust the parameter placeholders in the conditions
    const adjustedConditions = conditions.replace(
      /\$(\d+)/g,
      (_, num) => `$${parseInt(num) + Object.keys(data).length}`
    );

    const adjustedQuery = `UPDATE ${table} SET ${updates} WHERE ${adjustedConditions} RETURNING *`;

    console.log('update query', adjustedQuery);

    return this.query(adjustedQuery, [...values, ...params]);
  }

  async delete(table: string, conditions: string, params: any[]): Promise<any> {
    const query = `DELETE FROM ${table} WHERE ${conditions} RETURNING *`;

    console.log('delete query', query);

    return this.query(query, params);
  }

  async close(): Promise<void> {
    await this.pool.end();
  }
}

export default new PostgreSQL();
