import { Dispatch, SetStateAction } from 'react';

export interface IData {
  id: number; // 주문번호
  transaction_time: string; // 거래시간
  status: boolean; // 주문처리상태
  customer_id: number; // 고객번호
  customer_name: string; // 고객이름
  currency: string; // 가격
}

export interface PaginationProps {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

export interface IColumns {
  header: string;
  accessor: string;
  sortable: boolean;
}

export interface TableHeadProps {
  columns: IColumns[];
}
