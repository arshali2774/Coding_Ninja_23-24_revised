import './styles.css';
import React from 'react';
import Image from './components/Image';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      photos: [],
      loading: true,
    };
  }

  // Use the required lifecycle methods here
  componentDidMount() {
    // Fetch images from the API
    fetch('https://jsonplaceholder.typicode.com/albums/1/photos')
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          photos: data,
          loading: false, // Set loading to false once images are fetched
        });
      })
      .catch((error) => {
        console.error('Error fetching images:', error);
        this.setState({
          loading: false, // Set loading to false in case of error
        });
      });
  }
  render() {
    // Display loading status here
    return (
      <div className='App'>
        {this.state.loading ? (
          <p>Loading...</p>
        ) : (
          this.state.photos.map((photo) => (
            <Image key={photo.id} photo={photo} />
          ))
        )}
      </div>
    );
  }
}
