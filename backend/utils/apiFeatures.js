class APIfeature {
    constructor(query, querystring) {
      this.query = query;
      this.querystring = querystring;
    }
  
    search() {
      if (this.querystring.keyword) {
        const keyword = {
          name: {
            $regex: this.querystring.keyword,
            $options: "i",
          },
        };
        this.query = this.query.find(keyword);
      }
      return this;
    }
  
    filter() {
      const queryStrCopy = { ...this.querystring };
      const removeFields = ['keyword', 'limit', 'page'];
      removeFields.forEach(field => delete queryStrCopy[field]);
  
      let queryStr = JSON.stringify(queryStrCopy);
      queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);
  
      this.query = this.query.find(JSON.parse(queryStr));
      return this;
    }
    paginate(resPerPage ) { // Default to 10 if not provided
        const currentPage = Number(this.querystring.page) || 1;
        const skip = resPerPage * (currentPage - 1);
        this.query = this.query.limit(resPerPage).skip(skip);
        return this;
    }
  }
  
  module.exports = APIfeature;
   