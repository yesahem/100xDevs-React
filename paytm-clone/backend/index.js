const express = require("express");

const app = express();

const router = require("./routes/index");
const cors = require("cors");

app.use(cors());
app.use(express.json()); //express.json() is based on bodyParser.json() this mean that we can aldo proceed without downloading the body-parser
app.use("/api/v1", router);

app.use(router);
app.listen(3000, () => {
  console.log("App listing on port 3000");
});
