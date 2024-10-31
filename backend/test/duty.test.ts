import db from '../src/package/postgresql';
import * as DutyService from '../src/service/duty';

const tableName = 'public.duty';

describe('duty test', () => {
  beforeAll(async () => {
    await db.query(`DROP TABLE IF EXISTS ${tableName}`);

    await db.query(`
    CREATE TABLE IF NOT EXISTS ${tableName} (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100),
      is_done BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

    console.log('Test table created successfully');
  });

  afterAll(async () => {
    await db.close();
  });

  describe('duty test', () => {
    let dutyId: number;
    test('create duty -> update duty -> list duties', async () => {
      const createResult = await DutyService.createDuty('test');
      dutyId = createResult[0].id;
      expect(createResult[0].name).toEqual('test');

      const updateResult = await DutyService.updateDuty(dutyId, 'test2', false);
      expect(updateResult[0].name).toEqual('test2');

      const listResult = await DutyService.listDuties();
      expect(listResult[0].name).toEqual('test2');
    });
  });
});
