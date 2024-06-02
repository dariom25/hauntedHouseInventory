const Category = require("../models/category");
const asyncHandler = require("express-async-handler");

exports.category_list = asyncHandler(async (req, res, next) => {
  const allCategories = await Category.find().exec();

  res.render("category_list", {
    title: "Category List",
    category_list: allCategories,
  });
});

exports.category_detail = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id).exec();

  if (category === null) {
    const err = new Error("Category not found");
    err.status = 404;
    return next(err);
  }

  res.render("category_detail", { title: category.name, category: category });
});

exports.category_create_get = asyncHandler(async (req, res, next) => {
  //send create form
});

exports.category_create_post = asyncHandler(async (req, res, next) => {
  //send data from form
});

exports.category_delete_get = asyncHandler(async (req, res, next) => {
  //send delete form
});

exports.category_delete_post = asyncHandler(async (req, res, next) => {
  //delete data
});

exports.category_update_get = asyncHandler(async (req, res, next) => {
  //send update form
});

exports.category_update_post = asyncHandler(async (req, res, next) => {
  //send data from form and update entry
});
