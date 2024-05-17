// Make necessary imports here.
// Don't change the pre-written code.

import mongoose from 'mongoose';
import { bookSchema } from './book.schema.js';
import { reviewSchema } from './review.schema.js';
import { authorSchema } from './author.schema.js';

// creating model from schema.
const booksModel = mongoose.model('Book', bookSchema);

// creating model for review.
const reviewModel = mongoose.model('Review', reviewSchema);

const authorModel = mongoose.model('Author', authorSchema);
export default class BookRepository {
  async createBook(bookData) {
    const book = new booksModel(bookData);
    const savedBook = await book.save();
    return savedBook;
  }

  async addReviewToBook(bookId, text, rating) {
    const reviewData = {
      text,
      rating,
      book: new mongoose.Types.ObjectId(bookId),
    };
    const review = new reviewModel(reviewData);
    const savedReview = await review.save();

    const book = await booksModel.findById(bookId);

    book.reviews.push(savedReview._id);

    await book.save();

    return savedReview;
  }

  async getOne(id) {
    const book = await booksModel.findById(id);
    return book;
  }

  async listBooksByGenre(genre) {
    const books = await booksModel.find({ genre });
    return books;
  }

  async updateBookAvailability(bookId, quantity) {
    console.log(bookId);
    const book = await booksModel.findById(bookId);

    // Calculate the new availableCopies value
    const newAvailableCopies = book.availableCopies + quantity;

    // Update the availableCopies field and save the book
    book.availableCopies = newAvailableCopies;

    await book.save();
    return book;
  }

  async deleteBookById(bookId) {
    const deletedBook = await booksModel.findByIdAndRemove(bookId);
    return deletedBook;
  }

  // Complete the following four funtions.
  async createAuthor(authorData) {
    const newAuthor = new authorModel(authorData);
    const savedAuthor = await newAuthor.save();
    return savedAuthor;
  }

  async addAuthorToBook(bookId, authorId) {
    const book = await booksModel.findById(bookId);

    // Find the author by their ID
    const author = await authorModel.findById(authorId);

    // Update the book's authors array to include the authorId
    book.authors.push(authorId);
    // Update the author's books array to include the bookId
    author.books.push(bookId);
    // Save both the updated book and author documents
    await Promise.all([book.save(), author.save()]);

    // Return the updated book details along with the associated author details
    return {
      book,
      author,
    };
  }

  async listAuthorsByBook(bookId) {
    const book = await booksModel.findById(bookId);
    const authorsID = book.authors;
    const authors = await authorModel.find({ _id: { $in: authorsID } });

    return authors;
  }

  async listBooksByAuthor(authorId) {
    const author = await authorModel.findById(authorId);
    const booksId = author.books;
    const books = await booksModel.find({ _id: { $in: booksId } });

    return books;
  }
}
