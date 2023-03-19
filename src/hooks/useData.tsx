import { useQuery } from 'react-query';
import { fetchData } from '../api/api';
import { IData } from '../types/type';

function useData() {
  const { isLoading, isError, data, error } = useQuery<IData[], Error>('switchone', fetchData);

  return { isLoading, isError, data, error };
}

export default useData;
