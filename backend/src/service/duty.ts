import * as Duty from '../model/duty';

export async function createDuty(name: string) {
  const res = await Duty.createDuty(name);

  return res;
}

export async function updateDuty(id: number, name: string, is_done: boolean) {
  const res = await Duty.updateDuty(id, name, is_done);

  return res;
}

export async function deleteDuty(id: number) {
  const res = await Duty.deleteDuty(id);

  return res;
}

export async function listDuties() {
  const res = await Duty.listDuties();

  return res;
}
