import mongoose from 'mongoose';
import { bookSchema } from './book.schema.js';
import { ObjectId } from 'mongodb';

const BookModel = mongoose.model('books', bookSchema);

export default class BookRepository {
  // -----Change code in below functions only-----

  //book creation
  async createBook(bookData) {
    try {
      const book = BookModel(bookData);
      const savedBook = await book.save();

      return savedBook;
    } catch (error) {
      console.log(error);
    }
  }

  //filtering the book by id
  async getOne(id) {
    try {
      const bookById = await BookModel.findById(id);
      return bookById;
    } catch (error) {
      console.log(error);
    }
  }
}
