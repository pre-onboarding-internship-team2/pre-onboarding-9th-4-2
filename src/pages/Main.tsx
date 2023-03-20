import React from 'react';

import * as S from '../styles/Main.styles';
import Table from 'components/Table';
import Pagination from 'components/Pagination';

export default function Main() {
  return (
    <>
      <S.MainTitleContainer>
        <h2>2023-03-08 오늘의 거래건</h2>
        <S.FilterWrap>
          <span>주문처리상태</span>
          <S.Select>
            <option value="1">all</option>
            <option value="1">true</option>
            <option value="2">false</option>
          </S.Select>
          <S.SearchForm action="" method="get">
            <span>고객명 검색</span>
            <S.SearchInput type="text"></S.SearchInput>
            <S.SearchButton type="submit">검색</S.SearchButton>
          </S.SearchForm>
        </S.FilterWrap>
      </S.MainTitleContainer>
      <Table />
      <Pagination />
    </>
  );
}
