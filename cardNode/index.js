const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

app.use(express.json());

const port = 8000;

let DB=[{ id: 1, text: "AAA", color: "Green" },
  { id: 2, text: "BBB", color: "Lightblue" },
  { id: 3, text: "CCC", color: "Orange" },
  { id: 4, text: "DDD", color: "Pink" },]

module.exports = DB;

app.get("/getAll", (req, res) => {
  res.send(DB);
});

app.get("/getById/:id", (req, res) => {
  let Id = req.params.id;
  let user = DB.find((i) => i.id == Id);

  res.send(user);
});

app.patch("/update/:id", (req, res) => {
  let Id = req.params.id;

  DB = DB.map((i) => {
    if (i.id == Id) 
        return { ...i, ...req.body };
    return i;
  });

  res.send(DB.find(i => i.id == Id));
});

app.delete("/delete/:id", (req, res) => {
    let Id = req.params.id;
    let index=DB.find((i) => i.id == Id);

    if(index!=-1){
        DB.splice(index, 1);
        res.status(204).send();
    }
    else{
        res.status(404).send({ error: 'User not found' });
    }
})

app.post("/add",(req,res)=>{

    let card={
        id:generateUniqueID(),
        text:req.body.text,
        color:req.body.color,
    }

    DB.push(card);
    res.send(DB);
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

function generateUniqueID() {
  return (
    Math.random().toString(36).substring(2) +
    new Date().getTime().toString(36)
  );
}
