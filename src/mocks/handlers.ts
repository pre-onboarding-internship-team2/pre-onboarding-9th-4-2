import { rest } from "msw";
import { orderApiUrls } from "../services/order";
import mockdata from "./mock_data.json";

export const handlers = [
  rest.get(orderApiUrls.ORDER, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockdata));
  }),
];
