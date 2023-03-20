import axios from "axios";
import { Data } from "../types/type";

export const fetcher = async () => {
  try {
    const response = await axios.get("/public/mock_data.json");
    const initialData: Data[] = response.data;
    const data = initialData.filter((item: Data) => {
      const today = new Date(2023, 3, 8);
      const itemDate = new Date(item.transaction_time);
      return (
        today.getFullYear() === itemDate.getFullYear() &&
        today.getMonth() === itemDate.getMonth() + 1 &&
        today.getDate() === itemDate.getDate()
      );
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};
