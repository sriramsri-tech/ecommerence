class ApiFeatures {
  constructor(query, querystr) {
    (this.query = query), (this.querystr = querystr);
  }
  search() {
    let keyword = this.querystr.keyword
      ? {
          name: {
            $regex: this.querystr.keyword,
            $options: "i",
          },
        }
      : {};
    this.query.find({ ...keyword });
    return this;
  }

  filter() {
    // Make a copy of the query string
    const queryStrCopy = { ...this.querystr };

    // Removing query fields
    const removeField = ["keyword", "limit", "page"];
    removeField.forEach((field) => delete queryStrCopy[field]);

    // Apply category filter if present
    if (queryStrCopy.category) {
      this.query.find({ category: queryStrCopy.category });
    }

    // Replace the query string parameter correctly
    let queryStr = JSON.stringify(queryStrCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

    // Parse the modified query string to get the price filter
    const { price } = JSON.parse(queryStr);

    // Build the filter based on the price filter
    const filter = {};
    if (price) {
      if (price.$gte)
        filter.price = { ...filter.price, $gte: parseFloat(price.$gte) };
      if (price.$lte)
        filter.price = { ...filter.price, $lte: parseFloat(price.$lte) };
    }

    // Execute the query with the filter
    this.query.find(filter);

    return this;
  }

  paginate(resPerPage) {
    const currentPage = Number(this.querystr.page) || 1;
    const skip = resPerPage * (currentPage - 1);
    this.query = this.query.limit(resPerPage).skip(skip); // Update query with limit and skip
    return this; // Return the updated ApiFeatures instance for method chaining
  }
}

module.exports = ApiFeatures