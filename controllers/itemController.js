const Item = require("../models/item")
const asyncHandler = require("express-async-handler")

exports.index = asyncHandler(async (req, res, next) => {
    //sende data for homepage
})

exports.item_list = asyncHandler(async (req, res, next) => {
    //send item list
})

exports.item_detail = asyncHandler(async (req, res, next) => {
    //send item details
})

exports.item_create_get = asyncHandler(async (req, res, next) => {
    //send create form
})

exports.item_create_post = asyncHandler(async (req, res, next) => {
    //send data from form
})

exports.item_delete_get = asyncHandler(async (req, res, next) => {
    //send delete form
})

exports.item_delete_post = asyncHandler(async (req, res, next) => {
    //delete data
})

exports.item_update_get = asyncHandler(async (req, res, next) => {
    //send update form
})

exports.item_update_post = asyncHandler(async (req, res, next) => {
    //send data from form and update entry
})