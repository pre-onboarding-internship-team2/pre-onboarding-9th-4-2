const DATA_URL = import.meta.env.VITE_DATA_URL;

export async function fetchOrderData() {
  try {
    const response: Response = await fetch(DATA_URL);

    if (!response.ok) {
      throw new Error("Bad response");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(
      "Fetch Error: ",
      error instanceof Error ? error.message : error
    );
    throw error;
  }
}

// export async function fetchOrderData() {
//   // API 호출
//   const response = await fetch(DATA_URL);
//   // JSON 파싱
//   const data = await response.json();
//   return data;
// }