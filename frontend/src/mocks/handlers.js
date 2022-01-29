import { rest } from "msw";

const handlers = [
  rest.get("*/short-urls", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        results: [
          {
            _id: 1,
            fullUrl: "http://www.yahoo.com",
            shortUrl: "xdsjds",
            createdAt: "2021-03-20",
            updatedAt: "2021-03-20",
          },
        ],
      })
    );
  }),
  rest.get("*/xdsjds", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        _id: 1,
        fullUrl: "http://www.yahoo.com",
        shortUrl: "xdsjds",
        createdAt: "2021-03-20",
        updatedAt: "2021-03-20",
      })
    );
  }),
  rest.post("*/short-urls", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        _id: 1,
        fullUrl: "http://www.yahoo.com",
        shortUrl: "xdsjds",
        createdAt: "2021-03-20",
        updatedAt: "2021-03-20",
      })
    );
  }),
];

export default handlers;
