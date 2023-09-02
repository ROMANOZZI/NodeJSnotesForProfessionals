const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const port = process.env.PORT || 8080;
app.get("/", (req, res) => {
  const info = {
    name: "romanozzi",
    Age: 23,
  };
  res.json(info);
});
app.listen(port, () => {
  console.log(` server is listening on port ${port}`);
});
