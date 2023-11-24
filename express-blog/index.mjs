import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.render("index.ejs");
  });

app.post("/submit", (req, res) => {
  const blogTitle = req.body["title"];
  const blogContent = req.body["content"];
  console.log(blogContent, blogTitle);
  res.render("post.ejs", {
    title: blogTitle,
    content: blogContent
  })
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });