import React from 'react';
import * as S from '../styles/Table.styles';
import { OrderDataResponse } from 'types/order.types';
import useData from 'hooks/useData';
import usePagination from 'hooks/usePagination';
import useSorting from 'hooks/useSorting';
import Pagination from 'components/Pagination';
import { TiArrowUnsorted, TiArrowSortedUp, TiArrowSortedDown } from 'react-icons/ti';

export default function Table() {
  let { todayData, isLoading, isError } = useData();
  const { pages, goPrev, goNext, goPageNum, lastPage, currentPage, startIdx, lastIdx } = usePagination(todayData.length, 50, 5);
  const { sort, orderList, timeFilter, handleIdSorting, handleTimeSorting } = useSorting(todayData);

  if (isError) return <h3>ERROR!</h3>;
  if (isLoading) return <h3>Loading...</h3>;
  return (
    <>
      <S.TableContainer>
        <S.Thead>
          <tr>
            <th onClick={handleIdSorting}>
              <span>주문번호</span>
              {sort === 'ID_ASC' ? (
                <TiArrowSortedDown className="icon" />
              ) : (
                <TiArrowSortedUp className="icon" />
              )}
            </th>
            <th onClick={handleTimeSorting}>
              <span>거래시간</span>
              {
                {
                  TIME_DESC: <TiArrowSortedUp className="icon" />,
                  TIME_ASC: <TiArrowSortedDown className="icon" />,
                  DEFAULT: <TiArrowUnsorted className="icon" />,
                }[timeFilter]
              }
            </th>
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
