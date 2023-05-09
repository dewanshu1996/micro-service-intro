const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());

app.use(express.json());

const posts = {};

app.get("/posts", (req, res) => {
  return res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;
  eventHelperFun(type, data);
  return res.send({ status: "ok" });
});

const eventHelperFun = (type, data) => {
  if (type === "postCreated") {
    posts[data.id] = {
      id: data.id,
      title: data.title,
      comments: [],
    };
  }

  if (type === "commentCreated") {
    let post = posts[data.postId];
    if (post === undefined) return;

    post.comments.push({
      id: data.id,
      content: data.content,
      status: data.status,
    });
  }

  if (type === "commentUpdated") {
    const { id, postId, status, content } = data;

    const post = posts[postId];
    const comments = post.comments;
    const comment = comments.find((comment) => {
      return comment.id === id;
    });
    comment.status = status;
  }
};

app.listen(4002, async () => {
  try {
    const res = await axios.get("http://event-bus-srv:4005/events");
    res.data.map(({ type, data }) => {
      eventHelperFun(type, data);
    });
  } catch (error) {
    // console.log(error);
  }
  console.log("listening on port 4002");
});
