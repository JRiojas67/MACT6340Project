import express from "express";
import dotenv from "dotenv";
import * as utils from "./utils/utils.js";
dotenv.config();

const app = express();
const port = 3000;
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.post("/mail", async (req, res) => {
  await utils
  .sendMessage(req.body.subject, req.body.text)
  .then(() => {
      res.send({ result: "success"});
    }) 
    .catch((error) => {
      res.send({ result: "failure"});
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
