import React from 'react';
import { Outlet } from 'react-router-dom';
import * as S from '../styles/Layout.styles';

export default function Layout() {
  return (
    <S.LayoutContainer>
      <h1>주문 목록</h1>
      <S.MainContainer>
        <Outlet />
      </S.MainContainer>
    </S.LayoutContainer>
  );
}
