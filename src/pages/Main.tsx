import React from 'react';
import * as S from '../styles/Main.styles';
import Table from 'components/Table';

export default function Main() {
  return (
    <>
      <S.MainTitleContainer>
        <h2>오늘의 거래건 (2023-03-08)</h2>
        <S.FilterWrap>
          <span>주문처리상태</span>
          <S.Select>
            <option value="1">all</option>
            <option value="1">true</option>
            <option value="2">false</option>
          </S.Select>
          <S.SearchForm action="" method="get">
            <label>고객명 검색</label>
            <S.SearchInput type="text"></S.SearchInput>
            <S.SearchButton type="submit">검색</S.SearchButton>
          </S.SearchForm>
        </S.FilterWrap>
      </S.MainTitleContainer>
      <Table />
    </>
  );
}
