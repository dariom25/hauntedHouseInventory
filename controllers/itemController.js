const Item = require("../models/items");
const Place = require("../models/places");
const Finder = require("../models/finder");
const Category = require("../models/category");
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
  const [numItems, numPlaces, numFinders, numCategories] = await Promise.all([
    Item.countDocuments({}).exec(),
    Place.countDocuments({}).exec(),
    Finder.countDocuments({}).exec(),
    Category.countDocuments({}).exec(),
  ]);

  res.render("index", {
    title: "Home",
    item_count: numItems,
    place_count: numPlaces,
    finder_count: numFinders,
    category_count: numCategories,
  });
});

exports.item_list = asyncHandler(async (req, res, next) => {
  const allItems = await Item.find({}, "name finder")
    .sort({ name: 1 })
    .populate("finder")
    .exec();

  res.render("item_list", { title: "Item List", item_list: allItems });
});

exports.item_detail = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id)
    .populate("place")
    .populate("finder")
    .populate("category")
    .exec();

  if (item === null) {
    const err = new Error("Item not found");
    err.status = 404;
    return next(err);
  }

  res.render("item_detail", { title: item.name, item: item });
});

exports.item_create_get = asyncHandler(async (req, res, next) => {
  const [allFinders, allPlaces, allCategories] = await Promise.all([
    Finder.find().sort({ last_name: 1 }).exec(),
    Place.find().sort({ name: 1 }).exec(),
    Category.find().sort({ name: 1 }).exec(),
  ]);

  res.render("item_form", {
    title: "Invetarise Item",
    finders: allFinders,
    places: allPlaces,
    categories: allCategories,
  });
});

exports.item_create_post = asyncHandler(async (req, res, next) => {
  //send data from form
});

exports.item_delete_get = asyncHandler(async (req, res, next) => {
  //send delete form
});

exports.item_delete_post = asyncHandler(async (req, res, next) => {
  //delete data
});

exports.item_update_get = asyncHandler(async (req, res, next) => {
  //send update form
});

exports.item_update_post = asyncHandler(async (req, res, next) => {
  //send data from form and update entry
});
