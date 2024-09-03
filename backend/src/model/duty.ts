import db from '../package/postgresql';

const tableName = 'public.duty';

export interface Duty {
  id: number;
  name: string;
  isDone: boolean;
}

export const createDuty = async (name: string) => {
  try {
    const data = await db.create(tableName, {
      name,
      isDone: false,
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateDuty = async (id: number, name: string, isDone: boolean) => {
  try {
    const data = await db.update(
      tableName,
      { name, isDone },
      'id = $1',
      [id]
    );

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const listDuties = async () => {
  try {
    const data = await db.read(tableName, '', []); // Pass an empty string for no condition
    return data;
  } catch (error) {
    console.log(error);
    throw error; // Optionally rethrow the error for handling further up the stack
  }
};

export const deleteDuty = async (id: number) => {
  try {
    const data = await db.delete(tableName, 'id = $1', [id]);
    return data;
  } catch (error) {
    console.log(error);
  }
};
