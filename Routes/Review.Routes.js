const express = require('express');
const router = express.Router();
const BookReviewCreated = new (require('../Controllers/Review.Controller'))();

router.route('/books-create').post(BookReviewCreated.bookCreate);

module.exports = router;
