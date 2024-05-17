import React from 'react';
import ImageList from './components/ImageList';
import './styles.css';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      images: [],
      imageUrl: '',
    };
  }
  componentDidMount() {
    const imagesFromLS = this.getImagesFromLS();
    this.setState({ images: imagesFromLS });
  }

  setImageUrl = (e) => {
    //event handler to set the url of the image
    this.setState({ imageUrl: e.target.value });
  };
  // Function to add image to local storage
  addImageToLS = () => {
    localStorage.setItem(
      'images',
      JSON.stringify([...this.state.images, this.state.imageUrl])
    );
  };

  // Function to get images from the local storage
  getImagesFromLS = () => {
    const images = localStorage.getItem('images');
    if (!images) {
      localStorage.setItem('images', []);
      return [];
    }
    return JSON.parse(images);
  };

  onAddImage = (e) => {
    //function to add a new image
    e.preventDefault();
    this.addImageToLS();
    this.setState((prevState) => {
      return {
        images: [...prevState.images, this.state.imageUrl],
        imageUrl: '',
      };
    });
  };

  // Use appropriate lifecycle method to get images at the time of mounting

  render() {
    return (
      <>
        <form onSubmit={this.onAddImage}>
          <input
            type='text'
            placeholder='Image URL'
            value={this.state.imageUrl}
            onChange={this.setImageUrl}
          />
          <button>Add Image</button>
        </form>
        <ImageList images={this.state.images} />
      </>
    );
  }
}
