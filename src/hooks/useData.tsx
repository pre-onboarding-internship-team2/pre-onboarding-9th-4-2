import { IData } from '../types/type';
import { fetchData } from '@api/api';
import { useQuery } from 'react-query';
import isToday from '@utils/isToday';

function useData() {
  const { isLoading, isError, data, error } = useQuery<IData[], Error>('switchone', fetchData);

  const todayData = data?.filter((dataArray) => isToday(dataArray.transaction_time));

  return { isLoading, isError, todayData, error };
}

export default useData;
