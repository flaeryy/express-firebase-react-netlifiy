const express = require("express");
const router = express.Router();
const serverless = require("serverless-http");
const basicFetchRouter = require("./routes/basicFetch").default;
const searchFetchRouter = require("./routes/searchFetch").default;

const app = express();

const PORT = process.env.PORT || 5000;

app.use("/basicFetch", basicFetchRouter);
app.use("/search", searchFetchRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on portt ${PORT}`);
});

module.exports.handler = serverless(app);
