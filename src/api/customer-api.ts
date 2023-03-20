import { CustomerType } from "../types/customer.types";

const url = `https://s3.us-west-2.amazonaws.com/secure.notion-static.com/8c82d2f4-c58e-4329-a41e-972dfcc7e976/mock_data.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230320T111636Z&X-Amz-Expires=86400&X-Amz-Signature=5219d6bdfa9a537e65229ec8856e493bba36be49e324230bac1488e8444038b4&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22mock_data.json%22&x-id=GetObject`;

export const getCustomers = async (): Promise<CustomerType[] | undefined> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
