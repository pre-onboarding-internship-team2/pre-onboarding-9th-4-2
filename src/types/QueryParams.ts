import { OrderData } from "./OrderData";

export type OrderDataKey = keyof OrderData;
export type SortOrder = "desc" | "asc";

export interface SortParams {
  sortBy: OrderDataKey;
  sortOrder: SortOrder;
}

export interface FilterParams {
  date: string;
  customerName: string;
  orderStatus: "true" | "false";
}

export interface PaginationParams {
  page: number;
  itemAmountPerPage: number;
}

export interface OrderListQueryParams
  extends Partial<SortParams>,
    Partial<FilterParams>,
    Partial<PaginationParams> {}
