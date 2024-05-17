import mongoose from 'mongoose';
import BookRepository from './book.repository.js';

export default class BookController {
  constructor() {
    this.bookRepository = new BookRepository();
  }

  //------change code in below functions only--------

  // creation of book
  createBook = async (req, res) => {
    try {
      const data = req.body;
      const result = await this.bookRepository.createBook(data);
      res.status(201).send(result);
    } catch (error) {
      console.log(error);
    }
  };

  // filtering of book by id
  getOne = async (req, res) => {
    try {
      const bookId = req.params.bookId;
      const result = await this.bookRepository.getOne(bookId);
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(404).send('Book not found');
      }
    } catch (error) {
      console.log(error);
    }
  };
}
