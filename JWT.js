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
app.post("/users", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashed = await bcrypt.hash(req.body.password, 10);

    console.log(salt);
    console.log(hashed);
    const user = { name: req.body.name, password: hashed };
    users.push(user);
    res.status(201).send(users);
  } catch {
    res.status(500).send();
  }
});

app.listen(3000, () => {
  console.log("Iam listening on port 3000 Sir");
});
app.post("/login", async (req, res) => {
  const user = users.find((user) => {
    return req.body.name == user.name;
  });

  if (user == undefined) {
    res.status(401).send();
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      console.log(process.env.SECRET_KEY);
      const accessToken = JWT.sign(
        { name: req.body.name },
        process.env.SECRET_KEY
      );
      res.send({ accessToken: accessToken });
    } else {
      res.send("wrong password");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});
function authMid(req, res, next) {
  const header = req.headers["authorization"];
  const token = header.split(" ")[1];
  console.log(token);
  if (!token) res.status(401).send();
  JWT.verify(token, process.env.SECRET_KEY, (err, user) => {
    console.log(user);
    if (err) res.status(403).send();
    req.body.name = user.name;

    next();
  });
}
