import { fetchData } from '@api/api';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import { IData } from '@common/types';
import TableFunc from '@utils/tableFunc';
import { useSearchParams } from 'react-router-dom';

function useSortableTable() {
  const { isLoading, isError, data, error } = useQuery<IData[], Error>('switchone', fetchData);
  const { isToday, pagination, filterByStatus, sortByField } = TableFunc();
  const [searchParams] = useSearchParams();

  const todayData = data ? data.filter((dataArray) => isToday(dataArray.transaction_time)) : [];

  const [tableData, setTableData] = useState(todayData);

  useEffect(() => {
    setTableData(sortByField(filterByStatus(pagination(todayData))));
  }, [searchParams]);

  return { isLoading, isError, tableData, todayData, error };
}

export default useSortableTable;
