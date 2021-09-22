const AppError = require('../util/appError')
const catchAsync = require('../util/catchAsync')
const { responseOk } = require('../util/responseOk')
const APIFeatures = require('../util/ApiFeatures')

module.exports.findAll = ({ Model, name }) =>
   catchAsync(async (req, res, next) => {
      const features = new APIFeatures(Model.find(), req.query)
         .filter()
         .sort()
         .limitFields()
         .paginate()

      const data = await features.query
      return res.json(responseOk(data, name))
   })

module.exports.findAllWithPopulate = ({ Model, name, populate }) =>
   catchAsync(async (req, res, next) => {
      const features = new APIFeatures(
         Model.find().populate(populate),
         req.query
      )
         .filter()
         .sort()
         .limitFields()
         .paginate()

      const data = await features.query
      return res.json(responseOk(data, name))
   })

module.exports.findOne = ({ Model, name, findOneOptions }) =>
   catchAsync(async (req, res, next) => {
      const data = await Model.findOne(findOneOptions)
      return res.json(responseOk(data, name))
   })

module.exports.findOneById = ({ Model, name }) =>
   catchAsync(async (req, res, next) => {
      const data = await Model.findById(req.params.id)
      if (!data)
         next(
            new AppError(
               `No ${name} found with this id = ${req.params.id}`,
               404
            )
         )
      return res.json(responseOk(data, name))
   })

exports.createOne = ({ Model, name }) =>
   catchAsync(async (req, res, next) => {
      const data = await Model.create(req.body)
      res.status(201).json(responseOk(data, name))
   })

exports.updateOne = ({ Model, name }) =>
   catchAsync(async (req, res, next) => {
      const data = await Model.findByIdAndUpdate(
         req.params.id,
         req.body,
         {
            new: true,
            runValidators: true,
         }
      )

      if (!data) {
         return next(new AppError(`No ${name} found with that ID`, 404))
      }

      res.status(200).json(responseOk(data, name))
   })

exports.deleteOne = (Model) =>
   catchAsync(async (req, res, next) => {
      const doc = await Model.findByIdAndDelete(req.params.id)

      if (!doc) {
         return next(new AppError('No document found with that ID', 404))
      }

      res.status(204).json({
         status: 'success',
         data: null,
      })
   })
