import React, { Component } from 'react';
import coverNotAvailable from'./images/none.jpg';

class Book extends Component {
  state = {
    shelf: this.props.book.shelf ? this.props.book.shelf : 'none',
  }
  updateShelf = (shelf) =>{
    this.setState({shelf});
    this.props.updateShelf(this.props.book,shelf);
  }
  render() {
    const {book} = this.props;
    let thumbnail = this.props.book.imageLinks ? this.props.book.imageLinks.thumbnail : coverNotAvailable;
 
    if(thumbnail === ''){thumbnail = coverNotAvailable;}
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover"
            style={{ width: 128, height: 193, backgroundImage: `url(${thumbnail})` }}
          ></div>
          <div className="book-shelf-changer">
            <select value={this.state.shelf} onChange={(event) => this.updateShelf(event.target.value)}>
              <option value="" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{Array.isArray(book.authors)?book.authors.join(', '):''}</div>
      </div>
    )
  }

}

export default Book;