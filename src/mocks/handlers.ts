import { rest } from "msw";
import {
  orderApiQueryKey,
  orderApiUrls,
  PAGINATION_PER_PAGE,
} from "../services/order";
import mockdata from "./mock_data.json";

export const handlers = [
  rest.get(orderApiUrls.ORDER, (req, res, ctx) => {
    const pageQueryString = req.url.searchParams.get(orderApiQueryKey.PAGE);
    const dateQueryString = req.url.searchParams.get(orderApiQueryKey.DATE);
    const page = pageQueryString ? Number(pageQueryString) : null;
    const date = dateQueryString ? new Date(dateQueryString) : null;

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

    const filteredData = filterByDate(mockdata);

    if (filteredData.length <= 0) return res(ctx.status(404));

    return res(
      ctx.status(200),
      ctx.json(paginatedData(filteredData)),
      ctx.set("x-total-count", filteredData.length.toString())
    );
  }),
];
