import { rest } from "msw";
import {
  orderApiQueryKey,
  orderApiUrls,
  PAGINATION_PER_PAGE,
  SortType,
  StatusType,
} from "../services/order";
import mockdata from "./mock_data.json";

export const handlers = [
  rest.get(orderApiUrls.ORDER, (req, res, ctx) => {
    const pageQueryString = req.url.searchParams.get(orderApiQueryKey.PAGE);
    const dateQueryString = req.url.searchParams.get(orderApiQueryKey.DATE);

    const page = pageQueryString ? Number(pageQueryString) : null;
    const date = dateQueryString ? new Date(dateQueryString) : null;
    const sort = req.url.searchParams.get(orderApiQueryKey.SORT) as SortType;
    const status = req.url.searchParams.get(
      orderApiQueryKey.STATUS
    ) as StatusType;

    const filterByDate = (origin: typeof mockdata) =>
      date === null
        ? origin
        : origin.filter(({ transaction_time }) => {
            const curDate = new Date(transaction_time);

            return (
              curDate.getFullYear() === date.getFullYear() &&
              curDate.getMonth() === date.getMonth() &&
              curDate.getDate() === date.getDate()
            );
          });

    const paginatedData = (orgin: typeof mockdata) =>
      page === null
        ? orgin
        : orgin.slice(
            PAGINATION_PER_PAGE * (page - 1),
            PAGINATION_PER_PAGE * page
          );

    const sortData = (origin: typeof mockdata) =>
      sort === "ID_DES"
        ? origin.sort((a, b) => b.id - a.id)
        : sort === "ID_ASC"
        ? origin.sort((a, b) => a.id - b.id)
        : sort === "TIME_DES"
        ? origin.sort(
            (a, b) =>
              new Date(b.transaction_time).getTime() -
              new Date(a.transaction_time).getTime()
          )
        : sort === "TIME_ASC"
        ? origin.sort(
            (a, b) =>
              new Date(a.transaction_time).getTime() -
              new Date(b.transaction_time).getTime()
          )
        : origin;

    const filterByStatus = (origin: typeof mockdata) =>
      status === "TRUE"
        ? origin.filter(({ status }) => status)
        : status === "FALSE"
        ? origin.filter(({ status }) => !status)
        : origin;

    const convertedData = sortData(filterByStatus(filterByDate(mockdata)));

    if (convertedData.length <= 0) return res(ctx.status(404));

    return res(
      ctx.status(200),
      ctx.json(paginatedData(convertedData)),
      ctx.set("x-total-count", convertedData.length.toString())
    );
  }),
];
