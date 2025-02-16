const catchAsync = require('../utils/catchAsync')
const AppError = require('../Error/AppError')
const APIFeatures = require('../utils/apiFeatures')


// Create :
const createOne = Model => catchAsync(async (req, res, next) => {

    const doc = await Model.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            doc: doc,
        },
    });
})


// Read  : 

const getOne = (Model, popOptions) => catchAsync(async (req, res, next) => {

    let query = Model.findById(req.params.id);

    if (popOptions) query = query.populate(popOptions);

    const doc = await query;

    if (!doc) {
        return next(new AppError(`No document with the id : ${req.params.id}`, 404));
    }

    res.status(200).json({
        stataus: 'success',
        data: {
            doc: doc,
        },
    });

});


const getAll = Model => catchAsync(async (req, res, next) => {

    const features = new APIFeatures(Model.find(), req.query)
        .filter()
        .sort()
        .select()
        .page();

    const docs = await features.query;

    res.status(200).json({
        status: 'success',
        results: docs.length,
        data: {
            data: docs
        },
    });

});



// update 
const updateOne = Model => catchAsync(async (req, res, next) => {

    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    if (!doc) {
        return next(new AppError(`No document with the id : ${req.params.id}`, 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            data: doc,
        },
    });

});


// Delete 
const deleteOne = Model => catchAsync(async (req, res, next) => {

    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
        return next(new AppError(`No document with the id : ${req.params.id}`, 404));
    }

    res.status(204).json({
        status: 'success',
        data: {
            doc: null
        },
    });

});




module.exports = {
    createOne,
    getOne,
    getAll,
    updateOne,
    deleteOne
}