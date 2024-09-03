import db from '../src/package/postgresql';

const tableName = 'public.duty';

describe('PostgreSQL CRUD Operations', () => {
  beforeAll(async () => {
    await db.query(`
    CREATE TABLE IF NOT EXISTS ${tableName} (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100)
    )
  `);

    console.log('Test table created successfully');
  });

  afterAll(async () => {
    await db.query(`DROP TABLE IF EXISTS ${tableName}`);
    await db.close();
  });

  describe('PostgreSQL CRUD Operations', () => {
    let userId: number;

    test('Create User', async () => {
      const newUser = { name: 'Jane Doe' };
      const createdUser = await db.create(tableName, newUser);
      userId = createdUser[0].id;
      expect(createdUser).toHaveLength(1);
      expect(createdUser[0]).toMatchObject(newUser);
    });

    test('Read Users', async () => {
      const users = await db.read(tableName);
      expect(users.length).toBeGreaterThanOrEqual(1);
    });

    test('Update User', async () => {
      const updatedUser = { name: 'Jane Smith' };
      const conditions = 'id = $1';
      const params = [userId];
      const updatedResult = await db.update(
        tableName,
        updatedUser,
        conditions,
        params
      );
      expect(updatedResult).toHaveLength(1);
      expect(updatedResult[0].name).toBe('Jane Smith');
    });

    test('Delete User', async () => {
      const deleteConditions = 'id = $1';
      const deletedResult = await db.delete(tableName, deleteConditions, [
        userId,
      ]);
      expect(deletedResult).toHaveLength(1);
      expect(deletedResult[0].id).toBe(userId);
    });
  });
});
