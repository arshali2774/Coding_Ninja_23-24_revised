import React from 'react';
import Image from './Image';

export default class ImageList extends React.Component {
  // Create Lifecycle method to prevent re render of the list if some spaces are present.
  // Use the shouldComponentUpdate lifecycle method here
  shouldComponentUpdate(nextProps) {
    // Prevent re-render if there are no changes in the images array
    return nextProps.images !== this.props.images;
  }
  render() {
    return (
      <div className='image-list'>
        {this.props.images.map((image, index) => {
          return <Image key={index} image={image} />;
        })}
      </div>
    );
  }
}
