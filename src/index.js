const express = require("express");
const app = express();
const { userRouter } = require("./router/user.router");
const { httpConstant, routeConstant } = require("./constant");
require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });

app.use(express.json());

app.use(routeConstant.BASE_ROUTE, userRouter);

app.use(routeConstant.ROUTE_NOT_EXIST, (req, res) => {
  return res.status(httpConstant.NOT_FOUND).json({
    statusCode: httpConstant.NOT_FOUND,
    message: `${req?.originalUrl} Route Not Found`,
  });
});

app.listen(process.env.PORT, () => {
  console.log(`server live at ${process.env.PORT}`);
});

module.exports = app;
