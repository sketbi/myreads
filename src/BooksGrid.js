import React, { Component } from 'react';
class BooksGrid extends Component {
  render() {
    return (
      <ol className="books-grid">        
        {this.props.books.map((book, i) =>
          <li key={i}>
            <div className="book">
              <div className="book-top">
                <div className="book-cover" 
                style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail}` }}
                ></div>
                <div className="book-shelf-changer">
                  <select value={book.shelf}>
                    <option value="none" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{book.title}</div>
              <div className="book-authors">{book.author}</div>
            </div>
          </li>
        )}
      </ol>
    )
  }

}

export default BooksGrid;