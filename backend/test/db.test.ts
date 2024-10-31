// import db from '../src/package/postgresql';

// const tableName = 'public.duty';

// describe('PostgreSQL CRUD Operations', () => {
//   beforeAll(async () => {
//     await db.query(`DROP TABLE IF EXISTS ${tableName}`);
//     await db.query(`
//     CREATE TABLE IF NOT EXISTS ${tableName} (
//       id SERIAL PRIMARY KEY,
//       name VARCHAR(100)
//     )
//   `);

//     console.log('Test table created successfully');
//   });

//   afterAll(async () => {
//     await db.query(`DROP TABLE IF EXISTS ${tableName}`);
//     await db.close();
//   });

//   describe('Database Operations', () => {
//     let recordId: number;

//     test('Create Record', async () => {
//       const newRecord = { name: 'Test Duty' };
//       const createdRecord = await db.create(tableName, newRecord);
//       recordId = createdRecord[0].id;
//       expect(createdRecord).toHaveLength(1);
//       expect(createdRecord[0]).toMatchObject(newRecord);
//     });

//     test('Read Records', async () => {
//       const records = await db.read(tableName);
//       expect(records.length).toBeGreaterThanOrEqual(1);
//     });

//     test('Update Record', async () => {
//       const updatedRecord = { name: 'Updated Duty' };
//       const conditions = 'id = $1';
//       const params = [recordId];
//       const updatedResult = await db.update(
//         tableName,
//         updatedRecord,
//         conditions,
//         params
//       );
//       expect(updatedResult).toHaveLength(1);
//       expect(updatedResult[0].name).toBe('Updated Duty');
//     });

//     test('Delete Record', async () => {
//       const deleteConditions = 'id = $1';
//       const deletedResult = await db.delete(tableName, deleteConditions, [
//         recordId,
//       ]);
//       expect(deletedResult).toHaveLength(1);
//       expect(deletedResult[0].id).toBe(recordId);
//     });
//   });
// });
