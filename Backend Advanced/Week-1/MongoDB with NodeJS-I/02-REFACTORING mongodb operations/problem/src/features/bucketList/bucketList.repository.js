// Please don't change the pre-written code
// Import the necessary modules here

import { getDB } from '../../config/mongodb.js';

class BucketListRepository {
  constructor() {
    this.collection = 'bucketListItems';
  }
  async addBucketListItem(bucketListItem) {
    // Write your code here
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      await collection.insertOne(bucketListItem);
      return bucketListItem;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async findOneBucketListItem(title) {
    // Write your code here
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      const result = await collection.findOne({ title });
      return result;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
}

export default BucketListRepository;
