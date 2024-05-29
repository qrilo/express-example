const express = require("express");
const routes = require("./routes/index");
const errorMiddleware = require("./middlewares/error-middleware");
const loggerMiddleware = require("./middlewares/logger-middleware");
const logger = require("./utils/logger");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(loggerMiddleware);

app.use(express.json());

app.use("/api", routes);

app.use(errorMiddleware);

app.listen(PORT, () => {
  logger.info(`App listening at http://localhost:${PORT}`);
});
