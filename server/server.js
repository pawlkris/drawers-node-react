let express = require("express");
let bodyParser = require("body-parser");
const _ = require("lodash");

let { ObjectID } = require("mongodb");
let { mongoose } = require("./db/mongoose");
let { Drawer } = require("./models/drawer");

let app = express();

app.use(bodyParser.json());

app.post("/drawers", (req, res) => {
  let drawer = new Drawer({
    order: req.body.order,
    row: req.body.row,
    column: req.body.column,
    contents: req.body.contents
  });
  drawer.save().then(
    doc => {
      res.send(doc);
    },
    e => {
      res.status(400).send(e);
    }
  );
});

app.get("/drawers", (req, res) => {
  Drawer.find().then(
    drawers => res.send({ drawers }),
    e => res.status(400).send(e)
  );
});

app.get("/drawers/:order", (req, res) => {
  let order = req.params.order;
  Drawer.find({ order: order }).then(
    drawer => res.send({ drawer }),
    e => res.status(400).send("Drawer does not exist")
  );
});

app.patch("/drawers/:order", (req, res) => {
  let order = req.params.order;
  let body = _.pick(req.body, ["contents"]);
  Drawer.findOneAndUpdate({ order: order }, { $set: body }, { new: true }).then(
    drawer => {
      if (!drawer) {
        return res.status(404).send();
      }

      res.send({ drawer }).catch(e => res.status(400).send());
    }
  );
});

app.listen(3001, () => {
  console.log("Started on port 3001");
});
