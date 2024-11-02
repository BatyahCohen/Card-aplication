const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

app.use(express.json());

const port = 8000;

let DB = [
  { id: "1", text: "AAA", color: "Green" },
  { id: "2", text: "BBB", color: "Lightblue" },
  { id: "3", text: "CCC", color: "Orange" },
  { id: "4", text: "DDD", color: "Pink" },
];

let pinned = [];

module.exports = DB;

app.get("/getAll", (req, res) => {
  res.send(DB);
});

app.get("/getAllPinned", (req, res) => {
  res.send(pinned);
});

app.get("/getById/:id", (req, res) => {
  let Id = req.params.id;
  let user = DB.find((i) => i.id == Id);

  res.send(user);
});

app.patch("/update/:id", (req, res) => {
  let Id = req.params.id;

  DB = DB.map((i) => {
    if (i.id == Id) return { ...i, ...req.body };
    return i;
  });

  res.send(DB.find((i) => i.id == Id));
});

app.delete("/delete/:id", (req, res) => {
  let Id = req.params.id;
  let index = DB.find((i) => i.id == Id);

  if (index != -1) {
    DB.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send({ error: "Card not found" });
  }
});

app.delete("/deletePinned/:id", (req, res) => {
  let Id = req.params.id;
  let index = pinned.find((i) => i.id == Id);

  if (index != -1) {
    pinned.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send({ error: "pinned card not found" });
  }
});

app.post("/add", (req, res) => {
  let card = {
    id: req.body.id,
    text: req.body.text,
    color: req.body.color,
  };

  DB.push(card);
  res.send(DB);
});

app.post("/addPinned/:id", (req, res) => {
  let Id = req.params.id;
  pinned.unshift(Id);
  res.send(pinned);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


