import * as Duty from '../model/duty';
import { HttpError } from '../package/http_error';

export async function createDuty(name: string) {
  try {
    name = name.trim();
    if (name.length === 0) {
      throw new HttpError(400, 'Name cannot be empty');
    }
    if (name.length > 100) {
      throw new HttpError(400, 'Name cannot exceed 100 characters');
    }

    const [duty] = await Duty.createDuty(name);
    if (!duty) {
      throw new HttpError(500, 'Failed to create duty');
    }

    return duty;
  } catch (error) {
    console.error('Create duty error:', error);
    throw error;
  }
}

export async function updateDuty(id: number, name: string, is_done: boolean) {
  try {
    name = name.trim();
    if (name.length === 0) {
      throw new HttpError(400, 'Name cannot be empty');
    }
    if (name.length > 100) {
      throw new HttpError(400, 'Name cannot exceed 100 characters');
    }

    const [duty] = await Duty.updateDuty(id, name, is_done);
    if (!duty) {
      throw new HttpError(500, 'Failed to update duty');
    }

    return duty;
  } catch (error) {
    console.error('Update duty error:', error);
    throw error;
  }
}

export async function deleteDuty(id: number) {
  try {
    const [duty] = await Duty.deleteDuty(id);
    if (!duty) {
      throw new HttpError(500, 'Failed to delete duty');
    }

    return duty;
  } catch (error) {
    console.error('Delete duty error:', error);
    throw error;
  }
}

export async function listDuties() {
  try {
    const duties = await Duty.listDuties();

    return duties.sort((a, b) => {
      if (a.is_done !== b.is_done) {
        return a.is_done ? 1 : -1;
      }
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
  } catch (error) {
    console.error('List duties error:', error);
    throw error;
  }
}
