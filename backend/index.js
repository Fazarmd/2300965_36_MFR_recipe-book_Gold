const express = require("express");
const app = express();
const cors = require("cors");

const morgan = require("morgan");
const bodyParser = require("body-parser");

const PORT = 7000;

const allowedOrigins = "*";
app.use(cors({ origin: allowedOrigins }));
app.use(morgan("dev"));
app.use(bodyParser.json());

const cookBookViews = require("./src/views/cookbook.views");
app.use(cookBookViews);
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
