import React from 'react';
import * as S from '../styles/Table.styles';
import { OrderDataResponse } from 'types/order.types';
import useData from 'hooks/useData';
import usePagination from 'hooks/usePagination';
import Pagination from 'components/Pagination';

export default function Table() {
  const { data, isLoading, isError } = useData();
  const orderList = data ? data : [];
  const {
    pages,
    goPrev,
    goNext,
    goPageNum,
    lastPage,
    currentPage,
    startIdx,
    lastIdx,
  } = usePagination(orderList.length, 50, 5);

  if (isError) return <h3>ERROR!</h3>;
  if (isLoading) return <h3>Loading...</h3>;
  return (
    <>
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
          {orderList.slice(startIdx, lastIdx + 1).map((data: OrderDataResponse) => {
            return (
              <tr key={data.id}>
                <td>{data.id}</td>
                <td>{data.transaction_time}</td>
                <td>
                  <S.Status state={data.status}>{data.status ? 'true' : 'false'}</S.Status>
                </td>
                <td>{data.customer_id}</td>
                <td>{data.customer_name}</td>
                <td>{data.currency}</td>
              </tr>
            );
          })}
        </S.Tbody>
      </S.TableContainer>
      <Pagination
        pages={pages}
        goPrev={goPrev}
        goNext={goNext}
        goPageNum={goPageNum}
        lastPage={lastPage}
        currentPage={currentPage}
      />
    </>
  );
}
