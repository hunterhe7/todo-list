import { useEffect, useState } from "react";
import { Duty } from "../types/Duty";
import dutyService from "../service/dutyService";

export const useDuties = () => {
  const [duties, setDuties] = useState<Duty[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDuties = async () => {
      try {
        const duties = await dutyService.getDuties();
        setDuties(duties.sort((a, b) => a.id - b.id));
      } catch (err) {
        console.error("Error fetching duties:", err);
        setError("Failed to load duties.");
      }
    };
    fetchDuties();
  }, []);

  const addDuty = async (name: string) => {
    try {
      const duty = await dutyService.addDuty(name);
      setDuties([...duties, ...duty]);
    } catch (err) {
      console.error("Error adding duty:", err);
      setError("Failed to add duty.");
    }
  };

  const updateDuty = async (updatedDuty: Duty) => {
    try {
      await dutyService.updateDuty(updatedDuty);
      setDuties(
        duties.map((duty) => (duty.id === updatedDuty.id ? updatedDuty : duty))
      );
    } catch (err) {
      console.error("Error updating duty:", err);
      setError("Failed to update duty.");
    }
  };

  const deleteDuty = async (dutyId: number) => {
    try {
      await dutyService.deleteDuty(dutyId);
      setDuties(duties.filter((duty) => duty.id !== dutyId));
    } catch (err) {
      console.error("Error deleting duty:", err);
      setError("Failed to delete duty.");
    }
  };

  return { duties, error, addDuty, updateDuty, deleteDuty };
};
