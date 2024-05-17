// -------------pre-written code starts---------------
import mongoose from 'mongoose';
import { bookSchema } from './book.schema.js';

// creating model from schema.
const booksModel = mongoose.model('Book', bookSchema);

export default class BookRepository {
  //book creation
  async createBook(bookData) {
    const book = new booksModel(bookData);
    const savedBook = await book.save();
    return savedBook;
  }

  // filtering of book by id
  async getOne(id) {
    const book = await booksModel.findById(id);
    return book;
  }

  // ------------prewritten code ends----------------

  // Complete the following functions:

  //filtering the books based on genre
  async listBooksByGenre(genre) {
    try {
      const books = await booksModel.find({ genre });
      return books;
    } catch (error) {
      console.log('Some error with model');
    }
  }

  //increasing the count of available books
  async updateBookAvailability(bookId, quantity) {
    try {
      const book = await booksModel.findById(bookId);
      if (!book) {
        throw new Error('Book not found');
      }

      // Update the availableCopies field
      book.availableCopies += quantity;

      // Save the updated book
      await book.save();

      // Return the updated book
      return book;
    } catch (error) {
      console.log('Some error with model');
    }
  }

  //deletion of book
  async deleteBookById(bookId) {
    console.log(bookId);
    try {
      const book = await booksModel.findByIdAndDelete(bookId);
      console.log(book);
      return book;
    } catch (error) {
      console.log('Some error with model');
    }
  }
}
