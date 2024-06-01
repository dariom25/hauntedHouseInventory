const Item = require("../models/items");
const Place = require("../models/places");
const Finder = require("../models/finder");
const Category = require("../models/category");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

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
    title: "Inventarise Item",
    finders: allFinders,
    places: allPlaces,
    categories: allCategories,
  });
});

exports.item_create_post = [
  body("name", "Name must not be empty.").trim().isLength({ min: 1 }).escape(),
  body("summary", "Summary must not be empty.").trim().escape(),
  body("place", "Place must not be empty.").trim().escape(),
  body("finder", "Finder must not be empty.").trim().escape(),
  body("category", "Category must not be empty.").trim().escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const item = new Item({
      name: req.body.name,
      summary: req.body.summary,
      place: req.body.place,
      finder: req.body.finder,
      category: req.body.category,
    });

    if (!errors.isEmpty()) {
      const [allFinders, allPlaces, allCategories] = await Promise.all([
        Finder.find().sort({ last_name: 1 }).exec(),
        Place.find().sort({ name: 1 }).exec(),
        Category.find().sort({ name: 1 }).exec(),
      ]);

      res.render("item_form", {
        title: "Inventarise Item",
        finders: allFinders,
        places: allPlaces,
        categories: allCategories,
        errors: errors.array(),
      });
    } else {
      await item.save();
      res.redirect(item.url);
    }
  }),
];

exports.item_delete_get = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id).exec()

  if (item===null) {
    res.redirect("/inventory/items")
  }

  res.render("item_delete", {
    title: "Delete Item",
    item: item
  })
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
