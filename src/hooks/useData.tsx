import React from 'react';
import { useQuery } from 'react-query';
import orderApi from 'api';
import { OrderDataResponse } from 'types/order.types';

const TODAY = '2023-03-08';

export default function useData() {
  const { data, isLoading, isError } = useQuery<OrderDataResponse[], Error>('orderData', orderApi, {
    refetchInterval: 5000,
  });

  let todayData = data
    ?.filter((data) => data.transaction_time.includes(TODAY))
    .sort((a: OrderDataResponse, b: OrderDataResponse) => a.id - b.id);

  todayData = todayData == undefined ? [] : todayData;

  return { todayData, isLoading, isError };
}
