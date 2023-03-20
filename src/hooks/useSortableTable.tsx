import { fetchData } from '@api/api';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';

import { IData } from '@common/types';

import isToday from '@utils/isToday';

function useSortableTable() {
  const { isLoading, isError, data, error } = useQuery<IData[], Error>('switchone', fetchData);

  const todayData = data ? data.filter((dataArray) => isToday(dataArray.transaction_time)) : [];

  const [tableData, setTableData] = useState(todayData);

  const [searchParams] = useSearchParams();
  const sortField = searchParams.get('sort');
  const order = searchParams.get('order');

  useEffect(() => {
    if (sortField) {
      const sorted = [...todayData].sort((a, b) => {
        return (
          a[sortField as keyof IData]
            .toString()
            .localeCompare(b[sortField as keyof IData].toString(), 'en', {
              numeric: true,
            }) * (order === 'asc' || order == 'default' ? 1 : -1)
        );
      });
      setTableData(sorted);
    }
  }, [searchParams]);

  return { isLoading, isError, tableData, error };
}

export default useSortableTable;
