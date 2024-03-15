const express = require("express");
const cors = require("cors");
require("dotenv").config();

const {
  authenticate,
  createUser,
  getUserInfo,
  getfavoritesByuserId,
  insertUserFavorites,
  deleteUserFavorites 
} = require("./main.js");

const cookieParser = require("cookie-parser");

const USERID_KEY = "id";
const COOKIE_VALIDITY_DURATION = 10 * 60 * 1000; // 10 mins expressed in ms

const app = express();
app.use(express.static("public"));
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.post("/api/users", async (req, res) => {
  const { username, password } = req.body;
  if (username === null || password === null) {
    res.status(400).end();
    return;
  }
  await createUser(username, password);
  res.status(200).end();
});

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
  console.log("cookies70:", res.cookie);
  return res.json({...authenticated,username});
});

app.get("/api/favorites", async (req, res) => {
  const userId = 1;
  const userFavorites = await getfavoritesByuserId(userId);
  console.log('app.get("/api/favorites")', userFavorites);

  // res.status(200).send(userFavorites);
  return res.json(userFavorites).end();
});

app.post("/api/favorites", async (req, res) => {
  const { recipe_id, user_id } = req.body;
  if (user_id === null || user_id === undefined) {
    res.status(401).end();
    return;
  }
  await insertUserFavorites(user_id, recipe_id);
  return res.json({ ...req.body });
});

app.delete("/api/favorites/:userId/:recipeUrl", async (req, res) => {
  const userId = parseInt(req.params.userId);
  const recipeId = decodeURIComponent(req.params.recipeUrl);
  try {
    await deleteUserFavorites(userId, recipeId);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting favorite:", error);
    res.status(500).json({ error: "Failed to delete favorite" });
  }
});

const { SERVER_PORT } = process.env;
app.listen(SERVER_PORT, () => console.info(`app running on ${SERVER_PORT}`));
