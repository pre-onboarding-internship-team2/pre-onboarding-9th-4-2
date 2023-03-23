import React from 'react';
import * as S from '../styles/Pagination.styles';
import { GrFormPrevious, GrFormNext } from 'react-icons/gr';
import { PaginationProps } from 'types/pagination.type';

export default function Pagination({
  pages,
  goPrev,
  goNext,
  goPageNum,
  lastPage,
  currentPage,
}: PaginationProps) {

  return (
    <S.PaginationContainer>
      <S.Button disabled={currentPage === 1} className="arrowBtn" onClick={goPrev}>
        <GrFormPrevious className="icon" />
      </S.Button>
      {pages.map((pageNum) => (
        <S.Button
          key={pageNum}
          aria-current={pageNum === currentPage ? 'page' : undefined}
          onClick={() => goPageNum(pageNum)}
        >
          {pageNum}
        </S.Button>
      ))}

      <S.Button disabled={currentPage === lastPage} className="arrowBtn" onClick={goNext}>
        <GrFormNext className="icon" />
      </S.Button>
    </S.PaginationContainer>
  );
}
