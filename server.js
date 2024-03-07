const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { authenticate, createUser, getUserInfo } = require("./main.js");
const cookieParser = require("cookie-parser");

const USERID_KEY = "id";
const COOKIE_VALIDITY_DURATION = 10 * 60 * 1000; // 10 mins expressed in ms

const app = express();
app.use(express.static("public"));
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// create a new user with a username and password
app.post("/api/users", async (req, res) => {
  const { username, password } = req.body;
  if (username === null || password === null) {
    res.status(400).end();
    return;
  }

  await createUser(username, password);

  res.status(200).end();
});

// get user information by id (which comes from the cookie set when you logged in)
// NOTE: this is not secure because the client could modify the cookie, but for
//  the purpose of this example, it is sufficient
app.get("/api/users/:id", async (req, res) => {
  const id = req.cookies[USERID_KEY];
  if (id === null || id === undefined) {
    res.status(401).end();
    return;
  }

  const currentUser = await getUserInfo(Number.parseInt(id));
  if (currentUser === null) {
    res.status(404).end();
    return;
  }

  res.status(200).send(currentUser);
});

// sign-in to the app
// - on SUCCESS sets a cookie with the current signed-in user's id
// - if username or password are incorrect, returns 400 BAD REQUEST
app.post("/api/signin", async (req, res) => {
  const { username, password } = req.body;

  const authenticated = await authenticate(username, password);
  if (authenticated === null) {
    res.status(400).end();
    errorMessage.textContent = "Invalid username or password.";
    return;
  }

  res.cookie(USERID_KEY, authenticated.id, {
    maxAge: COOKIE_VALIDITY_DURATION,
  });
  res.status(200).end();
});

const { PORT } = process.env;
app.listen(PORT, () => console.info(`app running on ${PORT}`));
