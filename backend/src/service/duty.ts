import * as Duty from '../model/duty';

export async function createDuty(name: string) {
  console.log('service createDuty', name);

  const res = Duty.createDuty(name);
  return res;
}

export async function updateDuty(id: number, name: string, isDone: boolean) {
  console.log('service updateDuty', id, name, isDone);

  const res = Duty.updateDuty(id, name, isDone);
  return res;
}

export async function deleteDuty(id: number) {
  console.log('service deleteDuty', id);

  const res = Duty.deleteDuty(id);
  return res;
}

export async function listDuties() {
  console.log('service listDuties');

  const res = Duty.listDuties();
  return res;
}
