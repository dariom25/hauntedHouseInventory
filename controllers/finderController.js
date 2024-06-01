const Finder = require("../models/finder");
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

exports.finder_create_post = asyncHandler(async (req, res, next) => {
  //send data from form
});

exports.finder_delete_get = asyncHandler(async (req, res, next) => {
  //send delete form
});

exports.finder_delete_post = asyncHandler(async (req, res, next) => {
  //delete data
});

exports.finder_update_get = asyncHandler(async (req, res, next) => {
  //send update form
});

exports.finder_update_post = asyncHandler(async (req, res, next) => {
  //send data from form and update entry
});
