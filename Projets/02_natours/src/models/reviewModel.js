const mongoose = require('mongoose')
const Tour = require('./tourModel')

// ========================================== Schema =================================

const reviewSchema = new mongoose.Schema(
    {
        review: {
            type: String,
            required: [true, 'Review can not be empty!']
        },
        rating: {
            type: Number,
            min: 1,
            max: 5
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: [true, 'Review must belong to a user.']
        },
        tour: {
            type: mongoose.Schema.ObjectId,
            ref: 'Tour',
            required: [true, 'Review must belong to a tour.']
        }

    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
)

// ============================= Indexes : ==================================

// couple (tour , user) must be always unique this for : preventing duplicate reviews 
reviewSchema.index(
    {
        tour: 1,
        user: 1
    }
    ,
    {
        unique: true
    }
)


// =========================== Méthodes =================================

// this pointe to Model 
reviewSchema.statics.calcAverageRatings = async function (tourId) {

    const stats = await this.aggregate([
        {
            $match: { tour: tourId }
        },
        {
            $group: {
                _id: "$tour",
                ratingsQuantity: { $sum: 1 },
                ratingsAverage: { $avg: "$rating" }
            }
        }
    ])


    if (stats.length > 0) {

        await Tour.findByIdAndUpdate(tourId, {
            ratingsQuantity: stats[0].ratingsQuantity,
            ratingsAverage: stats[0].ratingsAverage
        })

    } else {
        await Tour.findByIdAndUpdate(tourId, {
            ratingsQuantity: 0,
            ratingsAverage: 4.5
        })
    }

}




// ================================ Middelware =============================


// =========== Document Middelware =============

reviewSchema.post('save', function (doc, next) {

    this.constructor.calcAverageRatings(this.tour);
    next();
})



// =============== Query Middelware ===============

reviewSchema.pre(/^find/, function (next) {
    this
        .populate({
            path: 'user',
            select: 'name photo'
        })
    next();
})

// findByIdAndUpdate
// findByIdAndDelete 
reviewSchema.post(/^findOneAnd/, async function (doc, next) {

    if (doc) {
        await doc.constructor.calcAverageRatings(doc.tour);
    }

    next();
})


const Review = mongoose.model('Review', reviewSchema)


module.exports = Review

