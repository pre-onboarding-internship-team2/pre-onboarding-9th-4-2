import React from 'react';
import * as S from '../styles/Pagination.styles';
import { GrFormPrevious, GrFormNext } from 'react-icons/gr';

export default function Pagination() {
  return (
    <S.PaginationContainer>
      <S.Button className="icon">
        <GrFormPrevious />
      </S.Button>
      <S.Button>1</S.Button>
      <S.Button>2</S.Button>
      <S.Button>3</S.Button>
      <S.Button className="icon">
        <GrFormNext />
      </S.Button>
    </S.PaginationContainer>
  );
}
