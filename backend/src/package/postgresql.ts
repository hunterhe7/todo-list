import { Pool, PoolClient } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

class PostgreSQL {
  private pool: Pool;
  private static instance: PostgreSQL;

  private constructor() {
    this.pool = new Pool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    });

    this.initialize().catch(err => {
      console.error('Failed to initialize database:', err);
      process.exit(1);
    });
  }

  public static getInstance(): PostgreSQL {
    if (!PostgreSQL.instance) {
      PostgreSQL.instance = new PostgreSQL();
    }
    return PostgreSQL.instance;
  }

  private async initialize() {
    try {
      await this.createTable(); // Better to use migration
      console.log('Table created or already exists');
    } catch (err) {
      console.error('Error creating table:', err);
      throw err;
    }
  }

  private async createTable(): Promise<void> {
    const query = `
      CREATE TABLE IF NOT EXISTS public.duty (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        is_done BOOLEAN NOT NULL DEFAULT FALSE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;
    await this.query(query);
  }

  async query(text: string, params?: any[]): Promise<any> {
    let client: PoolClient | null = null;
    try {
      client = await this.pool.connect();
      const res = await client.query(text, params);
      return res.rows;
    } catch (err) {
      console.error('Database query error:', err);
      throw err;
    } finally {
      if (client) client.release();
    }
  }

  async create(table: string, data: Record<string, any>): Promise<any> {
    if (Object.keys(data).length === 0) {
      throw new Error('Data object cannot be empty');
    }

    const keys = Object.keys(data)
      .map(key => `"${key}"`)
      .join(', ');
    const values = Object.values(data);
    const placeholders = values.map((_, i) => `$${i + 1}`).join(', ');

    const query = `INSERT INTO ${table} (${keys}) VALUES (${placeholders}) RETURNING *`;

    return this.query(query, values);
  }

  async read(table: string, conditions: string = '', params: any[] = []): Promise<any> {
    const query = `SELECT * FROM ${table} ${conditions ? 'WHERE ' + conditions : ''}`;
    return this.query(query, params);
  }

  async update(
    table: string,
    data: Record<string, any>,
    conditions: string,
    params: any[] = []
  ): Promise<any> {
    const updates = Object.keys(data)
      .map((key, i) => `"${key}" = $${i + 1}`)
      .join(', ');
    const values = [...Object.values(data)];

    const adjustedConditions = conditions.replace(
      /\$(\d+)/g,
      (_, num) => `$${parseInt(num) + Object.keys(data).length}`
    );

    const query = `
      UPDATE ${table} 
      SET ${updates}, updated_at = CURRENT_TIMESTAMP 
      WHERE ${adjustedConditions} 
      RETURNING *
    `;

    return this.query(query, [...values, ...params]);
  }

  async delete(table: string, conditions: string, params: any[]): Promise<any> {
    const query = `DELETE FROM ${table} WHERE ${conditions} RETURNING *`;
    return this.query(query, params);
  }

  async close(): Promise<void> {
    await this.pool.end();
  }
}

export default PostgreSQL.getInstance();
