import db from '../package/postgresql';

const tableName = 'public.duty';

export interface Duty {
  id: number;
  name: string;
  is_done: boolean;
}

export const createDuty = async (name: string): Promise<Duty[]> => {
  try {
    const data = await db.create(tableName, {
      name,
    });

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateDuty = async (id: number, name: string, is_done: boolean): Promise<Duty[]> => {
  try {
    const data = await db.update(tableName, { name, is_done }, 'id = $1', [id]);

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const listDuties = async (): Promise<Duty[]> => {
  try {
    const data = await db.read(tableName, '', []); // Pass an empty string for no condition
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteDuty = async (id: number): Promise<Duty[]> => {
  try {
    const data = await db.delete(tableName, 'id = $1', [id]);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
