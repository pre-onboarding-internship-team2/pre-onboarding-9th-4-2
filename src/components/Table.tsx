import React from 'react';
import * as S from '../styles/Table.styles';
import { OrderDataResponse } from 'types/order.types';
import useData from 'hooks/useData';

export default function Table() {
    const { data, isLoading, isFetching, isError, error } = useData();

  return (
    <S.TableContainer>
      <S.Thead>
        <tr>
          <th>주문번호</th>
          <th>거래시간</th>
          <th>주문처리상태</th>
          <th>고객번호</th>
          <th>고객이름</th>
          <th>가격</th>
        </tr>
      </S.Thead>
      <S.Tbody>
        {data &&
          data.map((data: OrderDataResponse) => {
            console.log(data);
            return (
              <tr key={data.id}>
                <td>{data.id}</td>
                <td>{data.transaction_time}</td>
                <td>
                  {data.status ? (
                    <S.Status color="GREEN_100" bgColor="GREEN">
                      true
                    </S.Status>
                  ) : (
                    <S.Status color="RED_100" bgColor="RED">
                      false
                    </S.Status>
                  )}
                </td>
                <td>{data.customer_id}</td>
                <td>{data.customer_name}</td>
                <td>{data.currency}</td>
              </tr>
            );
          })}
      </S.Tbody>
    </S.TableContainer>
  );
}
