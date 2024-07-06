import mediaJSON from "./list/list_of_films.js";
import express from "express";
import {
  logErrors,
  clientErrorHandler,
} from "./error_handling/error_hendler.js";

const port = process.env.PORT ? process.env.PORT : 3000;

const app = express();

app.use(express.json());

app.get("/film", (req, res) => {
  try {
    if (req.query.id <= 0 || req.query.id > 13) {
      res.send({
        error: "Enter valid id!",
      });
    }
    const film = mediaJSON[req.query.id - 1];
    res.send(film);
  } catch (err) {
    next(err);
  }
});

app.get("*", (req, res) => {
  res.send({
    error: "No page found",
  });
});

app.use(logErrors);
app.use(clientErrorHandler);
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
