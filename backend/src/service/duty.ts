import * as Duty from '../model/duty';

export async function createDuty(name: string) {
  console.log('service createDuty', name);

  const res = await Duty.createDuty(name);
  return res;
}

export async function updateDuty(id: number, name: string, is_done: boolean) {
  console.log('service updateDuty', id, name, is_done);

  const res = await Duty.updateDuty(id, name, is_done);
  return res;
}

export async function deleteDuty(id: number) {
  console.log('service deleteDuty', id);

  const res = await Duty.deleteDuty(id);
  return res;
}

export async function listDuties() {
  console.log('service listDuties');

  const res = await Duty.listDuties();

  console.log('service listDuties res', res);
  return res;
}
