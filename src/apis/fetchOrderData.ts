export async function fetchOrderData() {
  try {
    const response = await fetch("/data/mockData.json");
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
