export async function fetchData() {
  const response = await fetch('/mock_data.json');

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}
