const { body, validationResult } = require("express-validator");
const Finder = require("../models/finder");
const Item = require("../models/items");
const asyncHandler = require("express-async-handler");

exports.finder_list = asyncHandler(async (req, res, next) => {
  const allFinders = await Finder.find().sort({ last_name: 1 }).exec();

  res.render("finder_list", { title: "Finder List", finder_list: allFinders });
});

exports.finder_detail = asyncHandler(async (req, res, next) => {
  const finder = await Finder.findById(req.params.id).exec();

  if (finder === null) {
    const err = new Error("Finders not found");
    err.status = 404;
    return next(err);
  }

  res.render("finder_detail", { title: finder.name, finder: finder });
});

exports.finder_create_get = asyncHandler(async (req, res, next) => {
  res.render("finder_form", { title: "Create finder" });
});

exports.finder_create_post = [
  body("first_name")
    .trim()
    .escape()
    .isAlphanumeric()
    .withMessage("First name has non-alphanumeric characters."),
  body("last_name")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Last name must not be empty.")
    .isLength({ max: 100 })
    .withMessage("Last name may not be longer than 100 characters.")
    .escape(),
  body("birth", "Invalid date of birth")
    .optional({ values: false })
    .isISO8601()
    .toDate(),
  body("death", "Invalid date of death")
    .optional({ values: false })
    .isISO8601()
    .toDate(),
  body("cause_death").trim().escape(),
  body("found_items").trim().escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const finder = new Finder({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      date_of_birth: req.body.birth,
      date_of_death: req.body.death,
      no_of_found_items: req.body.found_items,
      cause_of_death: req.body.cause_death,
    });

    if (!errors.isEmpty()) {
      res.render("finder_form", {
        title: "Create finder",
        errors: errors.array(),
      });
    } else {
      await finder.save();
      res.redirect(finder.url);
    }
  }),
];

exports.finder_delete_get = asyncHandler(async (req, res, next) => {
  const [finder, allItemsByFinder] = await Promise.all([
    Finder.findById(req.params.id).exec(),
    Item.find({ finder: req.params.id }, "name summary").exec(),
  ]);

  if (finder === null) {
    res.redirect("/invetory/finders");
  }

  res.render("finder_delete", {
    title: "Delete Finder",
    finder: finder,
    finder_items: allItemsByFinder,
  });
});

exports.finder_delete_post = [
  body("password", "Password must not be empty.").trim().escape(),
  body("password").equals("secret").withMessage("Enter the correct password"),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const [finder, allItemsByFinder] = await Promise.all([
      Finder.findById(req.params.id).exec(),
      Item.find({ finder: req.params.id }, "name summary").exec(),
    ]);

    if (allItemsByFinder.length > 0) {
      res.render("finder_delete", {
        title: "Delete Finder",
        finder: finder,
        finder_items: allItemsByFinder,
      });
      return;
    } else {
      await Finder.findByIdAndDelete(req.body.finderid);
      res.redirect("/inventory/finders");
    }
  }),
];

exports.finder_update_get = asyncHandler(async (req, res, next) => {
  const finder = await Finder.findById(req.params.id);

  if (finder === null) {
    res.redirect("/invetory/finders");
  }

  res.render("finder_update", {
    title: "Update Finder",
    finder: finder,
  });
});

exports.finder_update_post = [
  body("password", "Password must not be empty.").trim().escape(),
  body("password").equals("secret").withMessage("Enter the correct password"),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const finder = new Finder({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      cause_of_death: req.body.cause_death,
      no_of_found_items: req.body.found_items,
      date_of_birth: req.body.birth,
      date_of_death: req.body.death,
      _id: req.params.id
    });

    if (!errors.isEmpty()) {
      const finder = await Finder.findById(req.params.id);
      res.render("finder_update", {
        title: "Update Finder",
        finder: finder,
      });
    } else {
      const updatedFinder = await Finder.findByIdAndUpdate(
        req.params.id,
        finder,
        {}
      );
      res.redirect(updatedFinder.url);
    }
  }),
];
