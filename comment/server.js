const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const axios = require("axios");

const app = express();

app.use(express.json());
app.use(cors());

const commentsByPost = {};

app.post("/post/:id/comment", async (req, res) => {
  const { content } = req.body;
  const id = uuidv4();

  const comments = commentsByPost[req.params.id] || [];
  comments.push({
    id,
    content,
    status: "pending",
  });

  await axios.post("http://event-bus-srv:4005/events", {
    type: "commentCreated",
    data: {
      id: id,
      postId: req.params.id,
      content: content,
      status: "pending",
    },
  });

  commentsByPost[req.params.id] = comments;
  return res.status(201).send(comments);
});

app.get("/post/:id/comments", (req, res) => {
  const comments = commentsByPost[req.params.id];
  return res.status(200).send(comments);
});

app.post("/events", async (req, res) => {
  console.log("event recieved");

  const { type, data } = req.body;

  if (type === "commentModerated") {
    const { id, postId, status, content } = data;
    const comments = commentsByPost[postId] || [];

    const comment = comments.find((comment) => {
      return comment.id === id;
    });

    comment.status = status;

    try {
      await axios.post("http://event-bus-srv:4005/events", {
        type: "commentUpdated",
        data: {
          id,
          postId,
          content,
          status,
        },
      });
    } catch (error) {}
  }

  return res.send({});
});

app.listen(4001, () => {
  console.log("server is up and running");
});
