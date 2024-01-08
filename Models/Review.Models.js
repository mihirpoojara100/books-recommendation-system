const BooksSchema = require('../Database/Schemas').books;
const GenreSchema = require('../Database/Schemas').genres;
const BookGenreSchema = require('../Database/Schemas').book_genres;

class ReviewModel {
    async getBook(payload) {
        return BooksSchema.findOne({
            where: { ...payload, deletedAt: null },
        });
    }
    async getGenre(payload) {
        return GenreSchema.findOne({
            where: { ...payload, deletedAt: null },
        });
    }
    async createBook(payload) {
        return BooksSchema.create(payload, {
            include: {
                model: BookGenreSchema,
            },
        });
    }
}

module.exports = ReviewModel;
