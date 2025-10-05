import express from "express";
import dotenv from "dotenv";
import * as utils from "./utils/utils.js";
dotenv.config();
import * as db from './utils/database.js';
let data = ["Project 1", "Project 2", "Project 3"];
let projects = [];

const app = express();
const port = 3000;
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static('public'));

app.get('/', async (req, res) => {
  await db
    .connect()
    .then(async() => {
      //query the database for project records
      projects = await db.getAllProjects();
      console.log(projects);
      res.render('index.ejs', { projectArray: data });
    })
    .catch(next);
});

app.get('/projects',  (req, res) => {
  res.render('projects.ejs', {data: projects});
});

app.get("/project/:id", (req, res) => {
  let projectId = req.params.id;
  if ( id > data.length) {
  throw new Error("No project with that ID");
}
  res.render("project.ejs", { projectArray: data, which: id });
  });
  
app.get('/newProject', (req, res) => {
  res.render('newProject.ejs');
});

app.get('/contact', (req, res) => {
  res.render('contact.ejs');
});

app.post("/mail", async (req, res) => {
});

app.use((error, req, res, next) => {
  console.error(error);
  res.render("error.ejs");
  
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
