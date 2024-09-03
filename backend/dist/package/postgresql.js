"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class PostgreSQL {
    constructor() {
        this.pool = new pg_1.Pool({
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
        });
        this.initialize(); // TODO better use migration
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.createTable('public.duty');
                console.log('Table created or already exists');
            }
            catch (err) {
                console.error('Error creating table:', err);
            }
        });
    }
    createTable(tableName) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
      CREATE TABLE IF NOT EXISTS ${tableName} (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL
      )
    `;
            yield this.query(query);
        });
    }
    query(text, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this.pool.connect();
            try {
                const res = yield client.query(text, params);
                return res.rows;
            }
            catch (err) {
                console.error('Database query error:', err);
                throw err;
            }
            finally {
                client.release();
            }
        });
    }
    create(table, data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (Object.keys(data).length === 0) {
                throw new Error('Data object cannot be empty');
            }
            const keys = Object.keys(data).join(', ');
            const values = Object.values(data);
            const placeholders = values.map((_, i) => `$${i + 1}`).join(', ');
            const query = `INSERT INTO ${table} (${keys}) VALUES (${placeholders}) RETURNING *`;
            console.log('Executing query:', query);
            return this.query(query, values);
        });
    }
    read(table_1) {
        return __awaiter(this, arguments, void 0, function* (table, conditions = '', params = []) {
            const query = `SELECT * FROM ${table} ${conditions}`;
            console.log('read query', query);
            return this.query(query, params);
        });
    }
    update(table_1, data_1, conditions_1) {
        return __awaiter(this, arguments, void 0, function* (table, data, conditions, params = []) {
            const updates = Object.keys(data)
                .map((key, i) => `${key} = $${i + 1}`)
                .join(', ');
            const values = [...Object.values(data)];
            const query = `UPDATE ${table} SET ${updates} WHERE ${conditions} RETURNING *`;
            // Adjust the parameter placeholders in the conditions
            const adjustedConditions = conditions.replace(/\$(\d+)/g, (_, num) => `$${parseInt(num) + Object.keys(data).length}`);
            const adjustedQuery = `UPDATE ${table} SET ${updates} WHERE ${adjustedConditions} RETURNING *`;
            console.log('update query', adjustedQuery);
            return this.query(adjustedQuery, [...values, ...params]);
        });
    }
    delete(table, conditions, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `DELETE FROM ${table} WHERE ${conditions} RETURNING *`;
            console.log('delete query', query);
            return this.query(query, params);
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.pool.end();
        });
    }
}
exports.default = new PostgreSQL();
