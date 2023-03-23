export interface PaginationProps {
  goPrev: () => void;
  goNext: () => void;
  goPageNum: (value: number) => void;
  lastPage: number;
  currentPage: number;
  pages: number[];
}

export interface PaginationType extends PaginationProps {
  startIdx: number;
  lastIdx: number;
}
