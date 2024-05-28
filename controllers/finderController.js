const Finder = require("../models/finder")
const asyncHandler = require("express-async-handler")

exports.finder_list = asyncHandler(async (req, res, next) => {
    //send finder list
})

exports.finder_detail = asyncHandler(async (req, res, next) => {
    //send finder details
})

exports.finder_create_get = asyncHandler(async (req, res, next) => {
    //send create form
})

exports.finder_create_post = asyncHandler(async (req, res, next) => {
    //send data from form
})

exports.finder_delete_get = asyncHandler(async (req, res, next) => {
    //send delete form
})

exports.finder_delete_post = asyncHandler(async (req, res, next) => {
    //delete data
})

exports.finder_update_get = asyncHandler(async (req, res, next) => {
    //send update form
})

exports.finder_update_post = asyncHandler(async (req, res, next) => {
    //send data from form and update entry
})