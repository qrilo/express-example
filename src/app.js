const express = require("express");
const routes = require("./routes/index");
const errorMiddleware = require("./middlewares/error-middleware");
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());

app.use(cookieParser());

app.use(express.json());

app.use("/api", routes);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
