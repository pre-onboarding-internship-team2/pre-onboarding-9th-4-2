import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { PaginationType } from 'types/pagination.type';

// total : 전체 데이터 수
// listNum: 한 페이지 당 보여질 데이터 개수
// pageNum: 한 블럭 당 페이지 수

export default function usePagination(total: number, listNum: number, pageNum: number): PaginationType {
  const [searchParams, setSearchParams] = useSearchParams();

  // 현재 페이지
  const currentPage = searchParams.get('page') ? Number(searchParams.get('page')) : 1;
  // 전체 페이지 수 (마지막 페이지 번호)
  const lastPage = Math.ceil(total / listNum);
  // 현재 블럭 번호
  const nowBlock = Math.ceil((currentPage as number) / pageNum);
  // 블럭당 시작 페이지 번호
  let startPageNum = (nowBlock - 1) * pageNum + 1;
  // 블럭당 마지막 페이지 번호
  let endPageNum = nowBlock * pageNum;
  if (endPageNum > lastPage) endPageNum = lastPage;
  //해당 페이지의 글 시작 번호
  const startIdx = (currentPage - 1) * listNum;
  // 현재 페이지의 게시물 마지막 인덱스
  const lastIdx = startIdx + listNum - 1;

  const pages = [...Array(endPageNum - startPageNum + 1).keys()].map(
    (value) => (value += startPageNum)
  );

  const goPrev = () => {
    setSearchParams({ page: (currentPage - 1).toString() });
  };

  const goNext = () => {
    setSearchParams({ page: (currentPage + 1).toString() });
  };

  const goPageNum = (value: number) => {
    setSearchParams({ page: value.toString() });
  };

  return {
    goPrev,
    goNext,
    goPageNum,
    lastPage,
    currentPage,
    startIdx,
    lastIdx,
    pages,
  };
}
