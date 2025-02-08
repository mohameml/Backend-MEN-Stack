const mongoose = require('mongoose')
const slugify = require("slugify")
const validator = require('validator')

const tourSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'A tour must have a name'],
            unique: true,
            trim: true,
            maxlength: [40, 'A tour name must have less or equal then 40 charcters'],
            minlength: [10, 'A tour name must have more or equal then 10 charcters'],
        },
        slug: {
            type: String,
            trim: true
        },
        duration: {
            type: Number,
            required: [true, 'A tour must have a duration '],
        },
        maxGroupSize: {
            type: Number,
            required: [true, 'A tour must have a goup size'],
        },
        difficulty: {
            type: String,
            required: [true, 'A tour must have a difficulty'],
            enum: {
                values: ["easy", "medium", "difficult"],
                message: 'A diificulty must be in ["easy", "medium", "difficult"]'

            }
        },
        ratingsAverage: {
            type: Number,
            default: 4.5,
            min: [1, 'Rating must be >= 1.0'],
            max: [5, 'Rating must be <= 5.0']
        },
        ratingsQuantity: {
            type: Number,
            default: 0,
        },
        price: {
            type: Number,
            required: [true, 'A tour must have a price'],
        },
        priceDiscount: {
            type: Number,
            validate: {
                validator: function (val) {
                    // this only pointe to current doc on NEW document creation
                    return this.price > val;
                },
                message: 'priceDiscount ({VALUE}) must be less the price'
            }
        },
        summary: {
            type: String,
            trim: true,
            required: [true, 'A tour must have a description '],
        },
        description: {
            type: String,
            trim: true,
        },
        imageCover: {
            type: String,
            required: [true, 'A tour must have a imageCover'],
        },
        images: [String],
        createdAt: {
            type: Date,
            default: Date.now(),
            select: false
        },
        startDates: [Date],
        secretTour: {
            type: Boolean,
            default: false
        }
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }

);


tourSchema.virtual('durationWeeks').get(function () {
    return this.duration / 7;
});

// Document Middleware : runs before .save() and .create()
// 'save' : Hook save 
tourSchema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true })
    // console.log(this); // this : the current document process
    next()
})


tourSchema.pre('save', function (next) {
    console.log("Just befor saving the doc in DB ...");
    next();
})



tourSchema.post('save', function (doc, next) {
    console.log(doc);
    next();
})


// Query Middelware : runs befor .find() but no for .findById

// tourSchema.pre('find', function (next) {
tourSchema.pre(/^find/, function (next) {


    // this : current query 
    this.find({ secretTour: { $ne: true } })
    this.start = Date.now();
    // console.log(this.getFilter())
    next();
})


tourSchema.post(/^find/, function (docs, next) {
    // console.log(docs);
    console.log(`Query take ${Date.now() - this.start} milliseconds !`);
    next();
})


// Aggregation Middelware : runs before .aggregate([])
tourSchema.pre('aggregate', function (next) {
    this.pipeline().unshift({
        $match: { secretTour: { $ne: true } }
    })
    console.log(this.pipeline());
    next();
})

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
