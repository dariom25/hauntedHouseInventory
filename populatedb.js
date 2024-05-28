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
  await createItems();
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

async function createItems() {
  await Promise.all([
    itemCreate(
      0,
      "Cursed Locket",
      "A locket that whispers eerie secrets at midnight.",
      "Winchester Mystery House",
      "Jonathan Crane",
      "Jewelry"
    ),
    itemCreate(
      1,
      "Haunted Doll",
      "A doll that moves on its own and causes nightmares.",
      "Amityville House",
      "Emily Rose",
      "Toys"
    ),
    itemCreate(
      2,
      "Phantom Mirror",
      "A mirror that reflects ghostly figures not present in the room.",
      "Borley Rectory",
      "Alice Thompson",
      "Furniture"
    ),
    itemCreate(
      3,
      "Spectral Lantern",
      "An old lantern that glows with a ghostly light, even without fuel.",
      "Tower of London",
      "Henry Mason",
      "Lighting"
    ),
    itemCreate(
      4,
      "Witch's Broom",
      "A broom that is said to fly on its own.",
      "Salem Witch House",
      "Martha Blackwood",
      "Artifacts"
    ),
    itemCreate(
      5,
      "Ghostly Music Box",
      "A music box that plays haunting melodies by itself.",
      "Winchester Mystery House",
      "Jonathan Crane",
      "Toys"
    ),
    itemCreate(
      6,
      "Bewitched Necklace",
      "A necklace that tightens around the wearer's neck when spirits are near.",
      "Amityville House",
      "Emily Rose",
      "Jewelry"
    ),
    itemCreate(
      7,
      "Cursed Chair",
      "A chair that causes a cold shiver and bad luck to anyone who sits in it.",
      "Borley Rectory",
      "Alice Thompson",
      "Furniture"
    ),
    itemCreate(
      8,
      "Ethereal Candlestick",
      "A candlestick that emits a blue flame without any wax.",
      "Tower of London",
      "Henry Mason",
      "Lighting"
    ),
    itemCreate(
      9,
      "Witch's Cauldron",
      "A cauldron used by witches to brew potions, said to bubble by itself."
    ),
    itemCreate(
      10,
      "Haunted Portrait",
      "A portrait that causes eerie feelings and seems to follow you with its eyes.",
      "Winchester Mystery House",
      "Jonathan Crane",
      "Furniture"
    ),
    itemCreate(
      11,
      "Specter’s Ring",
      "A ring that is icy cold to the touch and brings visions of the past.",
      "Amityville House",
      "Emily Rose",
      "Jewelry"
    ),
    itemCreate(
      12,
      "Phantasmal Dollhouse",
      "A dollhouse where the dolls move on their own at night.",
      "Borley Rectory",
      "Alice Thompson",
      "Toys"
    ),
    itemCreate(
      13,
      "Ghostly Lantern",
      "A lantern that flickers with a greenish light, even without fuel.",
      "Tower of London",
      "Henry Mason",
      "Lighting"
    ),
    itemCreate(
      14,
      "Hexed Spellbook",
      "A spellbook with pages that turn by themselves and whispers incantations.",
      "Salem Witch House",
      "Martha Blackwood",
      "Artifacts"
    ),
  ]);
}

async function createFinders() {
  await Promise.all([
    finderCreate(
      0,
      "Jonathan",
      "Crane",
      "1832-06-15",
      "1889-11-02",
      15,
      "Mysterious Disappearance"
    ),
    finderCreate(
      1,
      "Emily",
      "Rose",
      "1975-02-14",
      "1995-08-30",
      8,
      "Exorcism Gone Wrong"
    ),
    finderCreate(
      2,
      "Alice",
      "Thompson",
      "1901-03-25",
      "1952-10-13",
      22,
      "Unknown"
    ),
    finderCreate(
      3,
      "Henry",
      "Mason",
      "1888-09-12",
      "1918-11-11",
      10,
      "Battle of WWI"
    ),
    finderCreate(
      4,
      "Martha",
      "Blackwood",
      "1670-01-10",
      "1692-07-19",
      5,
      "Witch Trial"
    ),
  ]);
}

async function createCategory() {
  await Promise.all([
    categoryCreate("Jewelry"),
    categoryCreate("Toys"),
    categoryCreate("Furniture"),
    categoryCreate("Lighting"),
    categoryCreate("Artifacts")
  ])
}

async function createPlace() {
  await Promise.all([
    placeCreate("Winchester Mystery House"),
    placeCreate("Amityville House"),
    placeCreate("Borley Rectory"),
    placeCreate("Tower of London"),
    placeCreate("Salem Witch House")
  ])
}
