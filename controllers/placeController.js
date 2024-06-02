const Place = require("../models/places");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.place_list = asyncHandler(async (req, res, next) => {
  const allplaces = await Place.find().exec();

  res.render("place_list", {
    title: "place List",
    place_list: allplaces,
  });
});

exports.place_detail = asyncHandler(async (req, res, next) => {
  const place = await Place.findById(req.params.id).exec();

  if (place === null) {
    const err = new Error("place not found");
    err.status = 404;
    return next(err);
  }

  res.render("place_detail", { title: place.name, place: place });
});

exports.place_create_get = asyncHandler(async (req, res, next) => {
  res.render("place_form", { title: "Create place" });
});

exports.place_create_post = [
  body("name", "Name must not be empty").trim().escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const place = new Place({
      name: req.body.name,
    });

    if (!errors.isEmpty()) {
      res.render("place_form", { title: "Create place", errors: errors });
    } else {
      await place.save();
      res.redirect(place.url);
    }
  }),
];

exports.place_delete_get = asyncHandler(async (req, res, next) => {
  const place = await Place.findById(req.params.id).exec();

  if (place === null) {
    res.redirect("/inventory/places");
  }

  res.render("place_delete", {
    title: "Delete Place",
    place: place,
  });
});

exports.place_delete_post = [
  body("password", "Password must not be empty.").trim().escape(),
  body("password").equals("secret").withMessage("Enter the correct password"),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const place = await Place.findById(req.params.id).exec();

    if (!errors.isEmpty()) {
      res.render("place_delete", {
        title: "Delete Place",
        place: place,
        errors: errors.array(),
      });
      return;
    } else {
      await Place.findByIdAndDelete(req.body.placeid);
      res.redirect("/inventory/places");
    }
  }),
];

exports.place_update_get = asyncHandler(async (req, res, next) => {
  const place = await Place.findById(req.params.id).exec();

  if (place === null) {
    res.redirect("/inventory/places");
  }

  res.render("place_update", {
    title: "Update Place",
    place: place,
  });
});

exports.place_update_post = [
  body("password", "Password must not be empty.").trim().escape(),
  body("password").equals("secret").withMessage("Enter the correct password"),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const place = new Place({
      name: req.body.name,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      const place = await Place.findById(req.params.id).exec();

      res.render("place_update", {
        title: "Update Place",
        place: place,
      });
    } else {
      const updatedplace = await Place.findByIdAndUpdate(
        req.params.id,
        place,
        {}
      );
      res.redirect(updatedplace.url);
    }
  }),
];
