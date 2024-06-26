const Category = require("../models/category");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

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
  res.render("category_form", { title: "Create Category" });
});

exports.category_create_post = [
  body("name", "Name must not be empty").trim().escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const category = new Category({
      name: req.body.name,
    });

    if (!errors.isEmpty()) {
      res.render("category_form", { title: "Create Category", errors: errors });
    } else {
      await category.save();
      res.redirect(category.url);
    }
  }),
];

exports.category_delete_get = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id).exec();

  if (category === null) {
    res.redirect("/inventory/categories");
  }

  res.render("category_delete", {
    title: "Delete Category",
    category: category,
  });
});

exports.category_delete_post = [
  body("password", "Password must not be empty.").trim().escape(),
  body("password").equals("secret").withMessage("Enter the correct password"),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const category = await Category.findById(req.params.id).exec();

    if (!errors.isEmpty()) {
      res.render("category_delete", {
        title: "Delete Category",
        category: category,
        errors: errors.array(),
      });
      return;
    } else {
      await Category.findByIdAndDelete(req.body.categoryid);
      res.redirect("/inventory/categories");
    }
  }),
];

exports.category_update_get = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id).exec();

  if (category === null) {
    res.redirect("/inventory/categories");
  }

  res.render("category_update", {
    title: "Update Category",
    category: category,
  });
});

exports.category_update_post = [
  body("password", "Password must not be empty.").trim().escape(),
  body("password").equals("secret").withMessage("Enter the correct password"),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const category = new Category({
      name: req.body.name,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      const category = await Category.findById(req.params.id).exec();

      res.render("category_update", {
        title: "Update Category",
        category: category,
      });
    } else {
      const updatedCategory = await Category.findByIdAndUpdate(
        req.params.id,
        category,
        {}
      );
      res.redirect(updatedCategory.url);
    }
  }),
];
