const mongoose = require("mongoose");

const Schema = mongoose.Schema;

FinderSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  last_name: { type: String, required: true, minLength: 1, maxLength: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
  no_of_found_items: { type: Number },
  cause_of_death: { type: String },
});

FinderSchema.virtual("url").get(function () {
  return `/inventory/finder/${this._id}`;
});

FinderSchema.virtual("date_of_birth_formatted").get(function () {
  return this.date_of_birth
    ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.Date_MED)
    : "";
});

FinderSchema.virtual("date_of_death_formatted").get(function () {
  return this.date_of_death
    ? DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.Date_MED)
    : "";
});

FinderSchema.virtual("name").get(function () {
  let fullname = "";
  if (this.first_name && this.last_name) {
    fullname = `${this.last_name}, ${this.first_name}`;
  }

  return fullname;
});

FinderSchema.virtual("age").get(function () {
  return this.date_of_birth
    ? new Date().getFullYear() - date_of_birth.getFullYear()
    : ""; //maybe here is an error with the instanciation of Date
});

module.exports = mongoose.model("Finder", FinderSchema);
