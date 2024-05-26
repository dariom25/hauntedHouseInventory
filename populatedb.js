#! /usr/bin/env node

//here the password is missing
console.log(
  'This script populates some test items, finders, places and iteminstances to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Item = require("./models/items");
const Finder = require("./models/finder");
const Category = require("./models/category");
const Place = require("./models/places");

const items = [];
const finders = [];
const categories = [];
const places = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

//needs to be updated
async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createPlaces();
  await createfinders();
  await createitems();
  await createitemInstances();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function placeCreate(index, name) {
  const place = new Place({ name: name });
  await place.save();
  places[index] = place;
  console.log(`Added place: ${name}`);
}

async function finderCreate(
  index,
  first_name,
  last_name,
  d_birth,
  d_death,
  no_of_found_items,
  cause_of_death
) {
  const finderdetail = { first_name: first_name, last_name: last_name };
  if (d_birth != false) finderdetail.date_of_birth = d_birth;
  if (d_death != false) finderdetail.date_of_death = d_death;
  if (no_of_found_items != false)
    finderdetail.no_of_found_items = no_of_found_items;
  if (cause_of_death != false) finderdetail.cause_of_death = cause_of_death;

  const finder = new Finder(finderdetail);

  await finder.save();
  finders[index] = finder;
  console.log(`Added finder: ${first_name} ${last_name}`);
}

async function itemCreate(index, name, place, summary, finder, category) {
  const itemdetails = {
    name: name,
    summary: summary,
    place: place,
    finder: finder,
    category: category,
  };

  const item = new Item(itemdetails);
  await item.save();
  items[index] = item;
  console.log(`Added item: ${name}`);
}

async function categoryCreate(index, name) {
  const category = new Category({ name: name });
  await category.save();
  categories[index] = category;
  console.log(`Added category: ${category}`);
}


