const ReviewModel = new (require('../Models/Review.Models'))();

class ReviewController {
    async bookCreate(req, res) {
        try {
            const { name, genre } = req.body;
            const book = await ReviewModel.getBook({ name });

            if (book) return res.handler.forbidden('Book Already Exists');

            const books_genres = [];

            if (genre) {
                genre?.forEach(async (genreName) => {
                    const genreDetails = await ReviewModel.getGenre({
                        name: genreName,
                    });
                    if (genreDetails)
                        books_genres.push({
                            genreId: genreDetails.id,
                        });
                });
            }

            await ReviewModel.createBook({ name, books_genres });

            res.handler.success(book, 'Book Created Successfully');
        } catch (err) {
            res.handler.serverError(err);
        }
    }
}

module.exports = ReviewController;
