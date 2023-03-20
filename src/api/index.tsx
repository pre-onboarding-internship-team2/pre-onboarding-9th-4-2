import axios from 'axios';

export default async function tableApi() {
  const response = await axios.get('/data/mock_data.json');
  return response.data.response;
}
