var express = require("express");
const { ObjectID } = require("mongodb");
var bodyParser = require("body-parser");

var { mongoose } = require("./db/mongoose");
var { Todo } = require("./models/todo");
var { user } = require("./models/user");

var app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.post("/todos", (req, res) => {
  var todo = new Todo({
    text: req.body.text,
  });
  todo.save().then(
    (doc) => {
      res.send(doc);
    },
    (err) => {
      res.status(400).send(err);
    }
  );
});

// GET
app.get("/todos", (req, res) => {
  Todo.find().then(
    (todos) => {
      res.send({ todos });
    },
    (err) => {
      res.status(400).send(err);
    }
  );
});

app.get("/todos/:id", (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  Todo.findById(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.status(200).send({ todo });
  }),
    (e) => {
      res.status(400).send(e);
    };
});

app.listen(port, () => {
  console.log("startted on port ", port);
});

module.exports = { app };
