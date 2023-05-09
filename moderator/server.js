const express = require("express");
const app = express();

const axios = require("axios");

const cors = require("cors");
app.use(cors());

app.use(express.json());

app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  if (type === "commentCreated") {
    const { id, postId, content } = data;
    console.log(content);
    const status = content.includes("orange") ? "Rejected" : "Accepted";
    try {
      await axios.post("http://event-bus-srv:4005/events", {
        type: "commentModerated",
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

app.listen(4003, () => {
  console.log("listening on port 4002");
});
