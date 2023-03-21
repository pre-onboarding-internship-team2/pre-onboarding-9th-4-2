import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { OrderDataResponse } from 'types/order.types';

type SortingProps = {
  sort: string | null;
  orderList: OrderDataResponse[];
  timeFilter: string;
  handleIdSorting: () => void;
  handleTimeSorting: () => void;
};

export default function useSorting(todayData: OrderDataResponse[]): SortingProps {
  const [timeFilter, setTimeFilter] = useState('DEFAULT');
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  let orderList = todayData ? todayData : [];

  const handleIdSorting = () => {
    if (!sort || sort.includes('TIME')) {
      searchParams.set('sort', 'ID_ASC');
      setTimeFilter('DEFAULT');
    } else if (sort === 'ID_ASC') {
      searchParams.delete('sort');
      setTimeFilter('DEFAULT');
    }
    setSearchParams(searchParams);
  };

  const handleTimeSorting = () => {
    if (!sort || sort.includes('ID')) {
      searchParams.set('sort', 'TIME_DESC');
      setTimeFilter('TIME_DESC');
    } else if (sort === 'TIME_DESC') {
      searchParams.set('sort', 'TIME_ASC');
      setTimeFilter('TIME_ASC');
    } else if (sort === 'TIME_ASC') {
      searchParams.delete('sort');
      setTimeFilter('DEFAULT');
    }
    setSearchParams(searchParams);
  };

  if (sort === 'ID_ASC') {
    orderList = todayData.sort((a: OrderDataResponse, b: OrderDataResponse) => b.id - a.id);
  } else if (sort === 'TIME_DESC') {
    orderList = todayData.sort(
      (a: OrderDataResponse, b: OrderDataResponse) =>
        new Date(a.transaction_time).getTime() - new Date(b.transaction_time).getTime()
    );
  } else if (sort === 'TIME_ASC') {
    orderList = todayData.sort(
      (a: OrderDataResponse, b: OrderDataResponse) =>
        new Date(b.transaction_time).getTime() - new Date(a.transaction_time).getTime()
    );
  }

  return { sort, orderList, timeFilter, handleIdSorting, handleTimeSorting };
}
