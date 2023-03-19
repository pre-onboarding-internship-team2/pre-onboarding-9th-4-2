import { rest } from "msw";
import {
  orderApiQueryKey,
  orderApiUrls,
  PAGINATION_PER_PAGE,
} from "../services/order";
import mockdata from "./mock_data.json";

export const handlers = [
  rest.get(orderApiUrls.ORDER, (req, res, ctx) => {
    const page = Number(req.url.searchParams.get(orderApiQueryKey.PAGE));
    return res(
      ctx.status(200),
      ctx.json(
        mockdata.slice(
          PAGINATION_PER_PAGE * (page - 1),
          PAGINATION_PER_PAGE * page
        )
      ),
      ctx.set("x-total-count", mockdata.length.toString())
    );
  }),
];
