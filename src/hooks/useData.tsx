import React from 'react';
import orderApi from 'api';
import { useQuery } from 'react-query';
import { OrderDataResponse } from 'types/order.types';

export default function useData() {
  const { data, isLoading, isFetching, isError, error } = useQuery<OrderDataResponse[], Error>('orderData', orderApi);
  return { data, isLoading, isFetching, isError, error };
}
