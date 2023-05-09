const express = require("express");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");
const app = express();
const axios = require("axios");

app.use(express.json());
app.use(cors());

const posts = {};

app.post("/post/create", async (req, res) => {
  const { title } = req.body;
  const id = uuidv4();

  posts[id] = {
    id,
    title,
  };

  try {
    const response = await axios.post("http://event-bus-srv:4005/events", {
      type: "postCreated",
      data: {
        id,
        title,
      },
    });
  } catch (error) {}

  res.status(201).send(posts[id]);
});

// app.get("/posts", (req, res) => {
//   console.log(posts);
//   return res.status(200).send(posts);
// });

app.post("/events", (req, res) => {
  console.log("event recieved");

  return res.send({});
});

app.listen(4000, () => {
  console.log("server is up and running");
});
