const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());

app.get("/", (req, res) => {
  res.send("this is home page");
});

app.listen(port, () => {
  console.log(`server is running port ${port}`);
});
