import axios from "axios";
import { Duty } from "../types/Duty";

const API_URL = process.env.REACT_APP_API_URL || "";

const dutyService = {
  getDuties: async (): Promise<Duty[]> => {
    try {
      const response = await axios.get<Duty[]>(`${API_URL}/list`);
      return response.data;
    } catch (error) {
      console.error("Error fetching duties:", error);
      throw error;
    }
  },

  addDuty: async (name: string): Promise<Duty[]> => {
    try {
      const response = await axios.post<Duty[]>(API_URL, { name });
      return response.data;
    } catch (error) {
      console.error("Error adding duty:", error);
      throw error;
    }
  },

  updateDuty: async (updatedDuty: Duty): Promise<void> => {
    try {
      await axios.post(`${API_URL}/${updatedDuty.id}`, updatedDuty);
    } catch (error) {
      console.error("Error updating duty:", error);
      throw error;
    }
  },

  deleteDuty: async (dutyId: number): Promise<void> => {
    try {
      await axios.delete(`${API_URL}/${dutyId}`);
    } catch (error) {
      console.error("Error deleting duty:", error);
      throw error;
    }
  },
};

export default dutyService;
