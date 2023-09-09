const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
require("dotenv").config();

app.use(express.json());

let refreshTokens = [];
let users = [
  {
    name: "Romanozzi",
    password: "123",
  },
  {
    name: "gamer1s",
    password: "1226",
  },
];

app.post("/signUP", async (req, res) => {
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
app.delete("/deleteToken", (req, res) => {
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  res.sendStatus(204);
});
app.post("/refresh", (req, res) => {
  const token = req.body.token;
  if (!token) return res.status(403).send();
  if (!refreshTokens.includes(token)) return res.status(403).send();
  JWT.verify(token, process.env.SECRET_KEY_REFRESH, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    const token = JWT.sign({ name: user.name }, process.env.SECRET_KEY, {
      expiresIn: "1m",
    });
    res.json({ accessToken: token });
  });
});
app.listen(4000, () => {
  console.log("Iam listening on port 4000 Sir");
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
        process.env.SECRET_KEY,
        {
          expiresIn: "1m",
        }
      );
      const refreshToken = JWT.sign(
        { name: req.body.name },

        process.env.SECRET_KEY_REFRESH
      );
      refreshTokens.push(refreshToken);
      res.send({ accessToken: accessToken, refreshToken: refreshToken });
    } else {
      res.send("wrong password");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});
