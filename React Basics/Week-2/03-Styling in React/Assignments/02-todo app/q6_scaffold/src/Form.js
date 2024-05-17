import { Component } from 'react';

export class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  handleChange = (e) => {
    this.setState({
      text: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.text.trim() !== '') {
      this.props.onAdd(this.state.text);
      this.setState({ text: '' });
    }
  };

  render() {
    return (
      <div className='form'>
        <input
          onChange={this.handleChange}
          value={this.state.text}
          placeholder='Whats on your mind?'
          required
        />
        {/* Add onclick event on the button to add the todos */}
        <button type='submit' onClick={this.handleSubmit}>
          Add
        </button>
      </div>
    );
  }
}
