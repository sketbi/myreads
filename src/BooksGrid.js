import React, { Component } from 'react';
import Book from './Book'
class BooksGrid extends Component {
     
  render() {
    return (
      <ol className="books-grid">        
        {this.props.books.map((book, i) =>
          <li key={i}>
               <Book book={book} updateShelf={this.props.updateShelf}/>
          </li>
        )}
      </ol>
    )
  }

}

export default BooksGrid;