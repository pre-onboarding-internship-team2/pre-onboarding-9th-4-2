import { CustomerType } from "../types/customer.types";

export const getCustomers = async (): Promise<CustomerType[] | undefined> => {
  try {
    const response = await fetch(`/mock.json`);
    if (!response.ok) {
      throw new Error(response.statusText || JSON.stringify(response.status));
    }
    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
