const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
require("dotenv").config();

app.use(express.json());
posts = [
  {
    username: "ROMANOZZI",
    post: "web",
  },
  {
    username: "Capo",
    post: "Agriculture",
  },
  {
    username: "gamer11s",
    post: "asdasf",
  },
];
users = [
  {
    name: "Romanozzi",
    password: "123",
  },
  {
    name: "gamer1s",
    password: "1226",
  },
];
app.get("/posts", authMid, (req, res) => {
  res.json(posts.filter((post) => post.username == req.body.name));
});
app.get("/users", (req, res) => {
  res.json(users);
});

app.listen(3000, () => {
  console.log("Iam listening on port 3000 Sir");
});

function authMid(req, res, next) {
  const header = req.headers["authorization"];
  const token = header.split(" ")[1];
  console.log(token);
  if (!token) res.status(401).send();
  JWT.verify(token, process.env.SECRET_KEY, (err, user) => {
    console.log(user);
    if (err) res.status(403).send();
    if (user) {
      req.body.name = user.name;
    } else {
      res.status(501).send();
    }

    next();
  });
}
