const Category = require("../models/category")
const asyncHandler = require("express-async-handler")

exports.category_list = asyncHandler(async (req, res, next) => {
    //send category list
})

exports.category_detail = asyncHandler(async (req, res, next) => {
    //send category details
})

exports.category_create_get = asyncHandler(async (req, res, next) => {
    //send create form
})

exports.category_create_post = asyncHandler(async (req, res, next) => {
    //send data from form
})

exports.category_delete_get = asyncHandler(async (req, res, next) => {
    //send delete form
})

exports.category_delete_post = asyncHandler(async (req, res, next) => {
    //delete data
})

exports.category_update_get = asyncHandler(async (req, res, next) => {
    //send update form
})

exports.category_update_post = asyncHandler(async (req, res, next) => {
    //send data from form and update entry
})