import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

let blogPosts = [];

// renders home page
app.get("/", (req, res) => {
    res.render("index.ejs");
  });

//renders about page 
app.get("/about", (req, res) => {
  res.render("about.ejs");
});

// renders the blogs from the blogPosts array
app.get("/blogs", (req, res) => {
  res.render("blogs.ejs", {blogPosts});
});

//submits the blog from form and adds it to the blogPosts array
app.post("/submit", (req, res) => {
  const blogTitle = req.body["title"];
  const blogContent = req.body["content"];

  const newPost = {
    title: blogTitle,
    content: blogContent,
  };

  blogPosts.push(newPost);

  res.render("post.ejs", newPost);
  console.log(newPost);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });