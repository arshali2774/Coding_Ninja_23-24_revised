// Please don't change the pre-written code
// Import the necessary modules here

export default class ArtPiece {
  constructor(id, title, artist, year, imageUrl) {
    this.id = id;
    this.title = title;
    this.artist = artist;
    this.year = year;
    this.imageUrl = imageUrl;
  }

  static db = [];

  static create({ title, artist, year, imageUrl }) {
    const artPiece = new ArtPiece(
      ArtPiece.db.length + 1,
      title,
      artist,
      year,
      imageUrl
    );
    ArtPiece.db.push(artPiece);
    return artPiece;
  }

  static findAll(query) {
    // Write your code here to retrieve all art pieces
    const artPieces = ArtPiece.db.filter(
      (artPiece) =>
        (!query.title || query.title === artPiece.title) &&
        (!query.artist || query.artist === artPiece.artist) &&
        (!query.year || query.year === artPiece.year)
    );
    if (!artPieces) {
      throw new Error('No art piece found');
    }
    return artPieces;
  }

  static findOne(id) {
    // Write your code here to retrieve a specific art piece by its id
    const artPiece = ArtPiece.db.find((ap) => ap.id === Number(id));
    return artPiece;
  }

  static update(id, data) {
    // Write your code here to update the details of a specific art piece
    const artPiece = ArtPiece.db.find((ap) => ap.id === Number(id));
    Object.assign(artPiece, data);
    return artPiece;
  }

  static delete(id) {
    // Write your code here to delete a specific art piece
    const deletedArtPiece = ArtPiece.db.find((ap) => ap.id === Number(id));
    ArtPiece.db = ArtPiece.db.filter((ap) => ap.id !== Number(id));

    // Return the deleted art piece (optional)
    return deletedArtPiece;
  }
}
