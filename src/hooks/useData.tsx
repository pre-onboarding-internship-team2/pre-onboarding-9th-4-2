import { fetchData } from '@api/api';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';

import { IData } from '@common/types';

import TableFunc from '@utils/tableFunc';

function useSortableTable() {
  const { isLoading, isError, data, error } = useQuery<IData[], Error>('switchone', fetchData, {
    refetchInterval: 5000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  const { isToday, pagination, filterByStatus, sortByField, searchByName } = TableFunc();
  const [searchParams] = useSearchParams();

  const todayData = data ? data.filter((dataArray) => isToday(dataArray.transaction_time)) : [];

  const [tableData, setTableData] = useState(todayData);

  useEffect(() => {
    setTableData(sortByField(pagination(filterByStatus(searchByName(todayData)))));
  }, [searchParams]);

  return { isLoading, isError, tableData, todayData, error };
}

export default useSortableTable;
