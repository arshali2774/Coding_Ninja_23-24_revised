// Create component here to display the Basic information such as
// Name: Email: Phone: Address:

import { Component } from 'react';

// Make sure to include these in your code with semicolon
class Hero extends Component {
  render() {
    return (
      <div id='hero'>
        <p>
          <strong>Name: Pranav Sharad Yeole</strong>
        </p>
        <p>Email: pranav@google.com</p>
        <p>Phone: 8546465544</p>
        <p>Address: ABC, xyz street.</p>
      </div>
    );
  }
}

export default Hero;
