/**
 * APIFeatures : 
 */
class APIFeatures {

    constructor(query, queryReq) {
        this.query = query;
        this.queryReq = queryReq;
    }

    filter() {
        const queryObj = { ...this.queryReq };
        const excludeFields = ['page', 'sort', 'limit', 'fields'];
        excludeFields.forEach(ele => delete queryObj[ele])

        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);

        this.query = this.query.find(JSON.parse(queryStr));

        return this;
    }

    sort() {

        if (this.queryReq.sort) {
            const sortBy = this.queryReq.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort('-createdAt')
        }

        return this;

    }

    select() {

        if (this.queryReq.fields) {
            const projection = this.queryReq.fields.split(',').join(' ');
            this.query = this.query.select(projection);
        } else {
            this.query = this.query.select('-__v');
        }

        return this;
    }

    page() {

        const page = this.queryReq.page * 1 || 1;
        const limit = this.queryReq.limit * 1 || 100;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);

        return this;

    }


}

module.exports = APIFeatures; 