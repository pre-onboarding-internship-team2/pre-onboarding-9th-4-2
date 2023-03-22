import React, { useState } from 'react';
import * as S from '../styles/Main.styles';
import { useSearchParams } from 'react-router-dom';

export default function Filter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchCustomer, setSearchCustomer] = useState('');

  const handleChangeStatus = (value: string) => {
    searchParams.delete('page');

    if (value !== 'all') {
      searchParams.set('status', value)
    } else {
      searchParams.delete('status');
    }
    setSearchParams(searchParams);
  };
  
  const handleSearch = (e: any) => {
    e.preventDefault();
    searchParams.delete('page');

    if (searchCustomer !== '') {
      searchParams.set('search', searchCustomer);
    } else {
      searchParams.delete('search');
    }
    setSearchParams(searchParams);
  };

  return (
    <S.FilterWrap>
      <span>주문처리상태</span>
      <S.Select onChange={(e) => handleChangeStatus(e.target.value)}>
        <option value="all">all</option>
        <option value="true">true</option>
        <option value="false">false</option>
      </S.Select>
      <S.SearchForm action="" method="get" onSubmit={handleSearch}>
        <label>고객명 검색</label>
        <S.SearchInput
          type="text"
          onChange={(e) => setSearchCustomer(e.target.value)}
        ></S.SearchInput>
        <S.SearchButton type="submit">검색</S.SearchButton>
      </S.SearchForm>
    </S.FilterWrap>
  );
}
