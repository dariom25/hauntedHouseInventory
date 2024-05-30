const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PlaceSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
});

PlaceSchema.virtual("url").get(function () {
  return `/inventory/place/${this._id}`;
});

module.exports = mongoose.model("Place", PlaceSchema);
