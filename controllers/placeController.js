const Place = require("../models/place")
const asyncHandler = require("express-async-handler")

exports.place_list = asyncHandler(async (req, res, next) => {
    //send place list
})

exports.place_detail = asyncHandler(async (req, res, next) => {
    //send place details
})

exports.place_create_get = asyncHandler(async (req, res, next) => {
    //send create form
})

exports.place_create_post = asyncHandler(async (req, res, next) => {
    //send data from form
})

exports.place_delete_get = asyncHandler(async (req, res, next) => {
    //send delete form
})

exports.place_delete_post = asyncHandler(async (req, res, next) => {
    //delete data
})

exports.place_update_get = asyncHandler(async (req, res, next) => {
    //send update form
})

exports.place_update_post = asyncHandler(async (req, res, next) => {
    //send data from form and update entry
})