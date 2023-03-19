const BASE_URL =
  'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/8c82d2f4-c58e-4329-a41e-972dfcc7e976/mock_data.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230319T133445Z&X-Amz-Expires=86400&X-Amz-Signature=ab68f9dd5122e83599200abd9f8dc0206ccfe7eaa1a3044e9fc613f087eb76da&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22mock_data.json%22&x-id=GetObject';

export async function fetchData() {
  const response = await fetch(`${BASE_URL}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}
