import { useEffect, useState } from "react";
import { Duty } from "../types/Duty";
import dutyService from "../service/dutyService";

export const useDuties = () => {
  const [duties, setDuties] = useState<Duty[]>([]);

  useEffect(() => {
    const fetchDuties = async () => {
      const duties = await dutyService.getDuties();
      setDuties(duties.sort((a, b) => a.id - b.id));
    };
    fetchDuties();
  }, []);

  const addDuty = async (name: string) => {
    const duty = await dutyService.addDuty(name);
    // console.log('added duty', duty);
    setDuties([...duties, ...duty]);
  };

  const updateDuty = async (updatedDuty: Duty) => {
    await dutyService.updateDuty(updatedDuty);
    setDuties(
      duties.map((duty) => (duty.id === updatedDuty.id ? updatedDuty : duty))
    );
  };

  const deleteDuty = async (dutyId: number) => {
    await dutyService.deleteDuty(dutyId);
    setDuties(duties.filter((duty) => duty.id !== dutyId));
  };

  return { duties, addDuty, updateDuty, deleteDuty };
};
