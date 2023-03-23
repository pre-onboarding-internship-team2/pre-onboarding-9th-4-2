import React from 'react';
import * as S from '../styles/Main.styles';
import useData from 'hooks/useData';
import useSorting from 'hooks/useSorting';

import Filter from 'components/Filter';
import Table from 'components/Table';

export default function Main() {
  let { todayData, isLoading, isError } = useData();
  const { sort, orderList, timeFilter, handleIdSorting, handleTimeSorting } = useSorting(todayData);
  
  if (isError) return <h3>ERROR!</h3>;
  if (isLoading) return <h3>Loading...</h3>;
  return (
    <>
      <S.MainTitleContainer>
        <h2>오늘의 거래건 (2023-03-08)</h2>
        <Filter />
      </S.MainTitleContainer>
      <Table
        sort={sort}
        orderList={orderList}
        timeFilter={timeFilter}
        handleIdSorting={handleIdSorting}
        handleTimeSorting={handleTimeSorting}
      />
    </>
  );
}
