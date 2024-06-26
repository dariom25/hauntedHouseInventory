const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: { type: String, required: true, minLenght: 1},
  summary: { type: String, required: true },
  place: { type: Schema.Types.ObjectId, ref: "Place", required: true },
  finder: { type: Schema.Types.ObjectId, ref: "Finder", required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
});

ItemSchema.virtual("url").get(function () {
  return `/inventory/item/${this._id}`;
});

module.exports = mongoose.model("Item", ItemSchema);
