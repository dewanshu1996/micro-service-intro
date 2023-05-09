const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.json());

const events = [];

app.post("/events", async (req, res) => {
  console.log("event bus called");
  const event = req.body;
  events.push(event);

  try {
    await axios.post("http://post-srv:4000/events", event);
  } catch (error) {}

  try {
    await axios.post("http://comment-srv:4001/events", event);
  } catch (error) {}

  try {
    await axios.post("http://query-srv:4002/events", event);
  } catch (error) {}

  try {
    await axios.post("http://moderate-srv:4003/events", event);
  } catch (error) {}

  return res.send({ status: "ok" });
});

app.get("/events", (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log("listening on port 4005");
});
