import db from '../package/postgresql';
import { z } from 'zod';

const tableName = 'public.duty';

const DutySchema = z.object({
  id: z.number(),
  name: z.string(),
  is_done: z.boolean(),
  created_at: z.date(),
  updated_at: z.date(),
});

export type Duty = z.infer<typeof DutySchema>;

const validateDuties = (data: unknown): Duty[] => {
  return z.array(DutySchema).parse(data);
};

export const createDuty = async (name: string): Promise<Duty[]> => {
  const data = await db.create(tableName, {
    name,
  });
  console.log('step model createDuty res', data);

  return validateDuties(data);
};

export const updateDuty = async (id: number, name: string, is_done: boolean): Promise<Duty[]> => {
  const data = await db.update(tableName, { name, is_done }, 'id = $1', [id]);
  console.log('step model updateDuty res', data);

  return validateDuties(data);
};

export const listDuties = async (): Promise<Duty[]> => {
  const data = await db.read(tableName, '', []); // Pass an empty string for no condition
  console.log('step model listDuties res', data);

  return validateDuties(data);
};

export const deleteDuty = async (id: number): Promise<Duty[]> => {
  const data = await db.delete(tableName, 'id = $1', [id]);
  console.log('step model deleteDuty res', data);

  return validateDuties(data);
};
