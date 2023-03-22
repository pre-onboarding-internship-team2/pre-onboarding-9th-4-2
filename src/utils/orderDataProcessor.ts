import { OrderData } from "../types/OrderData";
import {
  FilterParams,
  PaginationParams,
  SortParams,
} from "../types/QueryParams";
import { formatDate } from "./formatDate";

export class OrderDataProcessor {
  #orderData;
  #maxPage: number | undefined;

  constructor(orderData: OrderData[]) {
    this.#orderData = orderData;
  }

  applyFilter({ date, customerName, orderStatus }: Partial<FilterParams>) {
    if (date) this.#orderData = this.filterByDate(date);
    if (customerName) this.#orderData = this.filterByCustomerName(customerName);
    if (orderStatus) {
      this.#orderData = this.filterByOrderStatus(
        orderStatus === "true" ? true : false
      );
    }
    return this;
  }

  applySort({ sortBy, sortOrder }: Partial<SortParams>) {
    if (!sortBy || !sortOrder) return this;
    this.#orderData = this.sortByFieldAndOrder({ sortBy, sortOrder });
    return this;
  }

  applyPagination({ page, itemAmountPerPage }: PaginationParams) {
    this.#maxPage = this.calculateMaxPage({
      dataLength: this.#orderData.length,
      itemAmountPerPage,
    });
    this.#orderData = this.cutDataForCertainPage({ page, itemAmountPerPage });
    return this;
  }

  getProcessedResult() {
    return {
      data: this.#orderData,
      maxPage: this.#maxPage,
    };
  }

  private calculateMaxPage({
    dataLength,
    itemAmountPerPage,
  }: {
    itemAmountPerPage: number;
    dataLength: number;
  }) {
    return Math.ceil(dataLength / itemAmountPerPage) || 1;
  }

  private filterByDate(date: FilterParams["date"]) {
    return this.#orderData.filter(
      (item) => formatDate(item.transaction_time) === date
    );
  }

  private filterByCustomerName(customerName: FilterParams["customerName"]) {
    return this.#orderData.filter((item) =>
      item.customer_name.toLocaleLowerCase().includes(customerName)
    );
  }

  private filterByOrderStatus(orderStatus: OrderData["status"]) {
    return this.#orderData.filter((item) => item.status === orderStatus);
  }

  private sortByFieldAndOrder({ sortBy, sortOrder }: SortParams) {
    const copy = [...this.#orderData];

    copy.sort((first, second) => {
      const [a, b] = sortOrder === "asc" ? [first, second] : [second, first];

      const a_first_then_b = 1;
      const b_first_then_a = -1;
      const keep_origin_order = 0;

      return a[sortBy] === b[sortBy]
        ? keep_origin_order
        : a[sortBy] > b[sortBy]
        ? a_first_then_b
        : b_first_then_a;
    });

    return copy;
  }

  private cutDataForCertainPage({ page, itemAmountPerPage }: PaginationParams) {
    return this.#orderData.slice(
      (page - 1) * itemAmountPerPage,
      page * itemAmountPerPage
    );
  }
}
