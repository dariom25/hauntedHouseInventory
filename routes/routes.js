const express = require("express");
const router = express.Router();

const category_controller = require("../controllers/categoryController");
const finder_controller = require("../controllers/finderController");
const item_controller = require("../controllers/itemController");
const place_controller = require("../controllers/placeController");

//Homepage route
router.get("/", item_controller.index);

//GET create item
router.get("/item/create", item_controller.item_create_get);

//POST create item
router.post("/item/create", item_controller.item_create_post);

//GET delete item
router.get("/item/:id/delete", item_controller.item_delete_get);

//POST delete item
router.post("/item/:id/delete", item_controller.item_delete_post);

//GET update item
router.get("/item/:id/update", item_controller.item_update_get);

//POST update item
router.post("/item/:id/update", item_controller.item_update_post);

//GET item details
router.get("/item/:id", item_controller.item_detail);

//GET list all items
router.get("/items", item_controller.item_list);

//GET create place
router.get("/place/create", place_controller.place_create_get);

//POST create place
router.post("/place/create", place_controller.place_create_post);

//GET delete place
router.get("/place/:id/delete", place_controller.place_delete_get);

//POST delete place
router.post("/place/:id/delete", place_controller.place_delete_post);

//GET update place
router.get("/place/:id/update", place_controller.place_update_get);

//POST update place
router.post("/place/:id/update", place_controller.place_update_post);

//GET place details
router.get("/place/:id", place_controller.place_detail);

//GET list all places
router.get("/places", place_controller.place_list);

//GET create finder
router.get("/finder/create", finder_controller.finder_create_get);

//POST create finder
router.post("/finder/create", finder_controller.finder_create_post);

//GET delete finder
router.get("/finder/:id/delete", finder_controller.finder_delete_get);

//POST delete finder
router.post("/finder/:id/delete", finder_controller.finder_delete_post);

//GET update finder
router.get("/finder/:id/update", finder_controller.finder_update_get);

//POST update finder
router.post("/finder/:id/update", finder_controller.finder_update_post);

//GET finder details
router.get("/finder/:id", finder_controller.finder_detail);

//GET list all finders
router.get("/finders", finder_controller.finder_list);

//GET create category
router.get("/category/create", category_controller.category_create_get);

//POST create category
router.post("/category/create", category_controller.category_create_post);

//GET delete category
router.get("/category/:id/delete", category_controller.category_delete_get);

//POST delete category
router.post("/category/:id/delete", category_controller.category_delete_post);

//GET update category
router.get("/category/:id/update", category_controller.category_update_get);

//POST update category
router.post("/category/:id/update", category_controller.category_update_post);

//GET finder category
router.get("/category/:id", category_controller.category_detail);

//GET list all categories
router.get("/categories", category_controller.category_list);

module.exports = router;
