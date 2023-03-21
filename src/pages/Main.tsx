import React from 'react';
import * as S from '../styles/Main.styles';
import Filter from 'components/Filter';
import Table from 'components/Table';

export default function Main() {
  return (
    <>
      <S.MainTitleContainer>
        <h2>오늘의 거래건 (2023-03-08)</h2>
        <Filter />
      </S.MainTitleContainer>
      <Table />
    </>
  );
}
