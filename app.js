import express from "express";
import dotenv from "dotenv";
import * as utils from "./utils/utils.js";
import nodemailer from "nodemailer";
dotenv.config();
import * as db from './utils/database.js';

let projects = [];


const app = express();
const port = 3000;
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static('public'));

app.get('/', async (req, res,next) => {
  await db
    .connect()
    .then(async() => {
      //query the database for project records
      projects = await db.getAllProjects();
      console.log(projects);
      let featuredRand = Math.floor(Math.random() * projects.length);
      res.render("index.ejs", { featuredProject: projects[featuredRand] });
    })
    .catch(next);
});

app.get("/projects", (req, res) => {
  res.render("projects.ejs", {projectArray: projects});
});

app.get("/project/:id", (req, res) => {
  let id = req.params.id;
  if (id > data.length) {
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

// Create email transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    service: 'gmail', // You can change this to your preferred email service
    auth: {
      user: process.env.EMAIL_USER, // Your email
      pass: process.env.EMAIL_PASS  // Your email password or app password
    }
  });
};

app.post("/mail", async (req, res) => {
  try {
    const { subject, text, from, to } = req.body;
    
    // Validate required fields
    if (!subject || !text || !from) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields"
      });
    }

    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_USER, // Your email address
      to: process.env.EMAIL_USER, // Your email address (where you want to receive emails)
      replyTo: from, // Customer's email for easy reply
      subject: subject,
      text: text,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>From:</strong> ${from}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <div style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #007bff; margin: 15px 0;">
          <strong>Message:</strong><br>
          ${text.replace(/\n/g, '<br>')}
        </div>
        <p><em>This message was sent from your NFT website contact form.</em></p>
      `
    };

    await transporter.sendMail(mailOptions);
    
    res.json({
      success: true,
      message: "Email sent successfully"
    });
    
  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({
      success: false,
      message: "Failed to send email. Please try again later."
    });
  }
});

app.use((error, req, res, next) => {
  console.error(error);
  res.render("error.ejs");
  
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
