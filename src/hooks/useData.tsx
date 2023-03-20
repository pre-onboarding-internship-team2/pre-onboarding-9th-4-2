import React from 'react';
import { useQuery } from 'react-query';
import orderApi from 'api';
import { OrderDataResponse } from 'types/order.types';

export default function useData() {
  const { data, isLoading, isError } = useQuery<OrderDataResponse[], Error>('orderData', orderApi);
  return { data, isLoading, isError };
}
