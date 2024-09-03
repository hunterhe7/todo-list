import axios from "axios";
import { Duty } from "../types/Duty";

const API_URL = "http://localhost:8000/duty";

const dutyService = {
  getDuties: async (): Promise<Duty[]> => {
    const response = await axios.get<Duty[]>(`${API_URL}/list`);
    return response.data;
  },
  addDuty: async (name: string): Promise<Duty[]> => {
    const response = await axios.post<Duty[]>(API_URL, { name });
    return response.data;
  },
  updateDuty: async (updatedDuty: Duty): Promise<void> => {
    await axios.post(`${API_URL}/${updatedDuty.id}`, updatedDuty);
  },
  deleteDuty: async (dutyId: number): Promise<void> => {
    await axios.delete(`${API_URL}/${dutyId}`);
  },
};

export default dutyService;
