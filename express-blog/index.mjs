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
  res.render("blogs.ejs", { blogPosts });
});

// renders an individual blog post when clicking on the title 
app.get("/post/:id", (req, res) => {
  const postId = req.params.id;

  if (blogPosts[postId]) {
    res.render("post.ejs", {blogPost: blogPosts[postId]});
  } else {
    res.status(404).send("Post not found");
  }
});

//submits the blog from form and adds it to the blogPosts array
app.post("/submit", (req, res) => {
  console.log("Entering /submit route");
  
  const blogTitle = req.body["title"];
  const blogContent = req.body["content"];
  const currentDate = new Date();
  const formattedDate = `Posted on ${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()} ${currentDate.getHours()}:${currentDate.getMinutes()}`;

  const newPost = {
    title: blogTitle,
    content: blogContent,
    createdOn: formattedDate,
  };

  blogPosts.push(newPost);

  console.log("Form submitted. Redirecting to /blogs");
  res.redirect("/blogs");

  console.log("Exiting /submit route");
});

// delete the post 
app.post("/delete/:id", (req, res) => {
  const postId = req.params.id;

  if (blogPosts[postId]) {
    blogPosts.splice(postId, 1); // Remove the post from the array
  }

  res.redirect("/blogs"); // Redirect to the blogs page after deletion
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });