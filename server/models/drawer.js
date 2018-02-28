let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let drawerSchema = new Schema({
  order: Number,
  row: Number,
  column: Number,
  contents: String
});

let Drawer = mongoose.model("Drawer", drawerSchema);

module.exports = {
  Drawer
};
