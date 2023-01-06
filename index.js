const express = require("express");
require("dotenv").config();
const cors = require("cors");
const blogRoute = require("./router/blogRoute");
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

app.use("/blog", blogRoute);

app.get("/home", (req, res) => {
  res.send("this is home page");
});

app.listen(port, () => {
  console.log(`server is running port ${port}`);
});
