import React, { Component } from 'react';
import Book from './Book'
class BooksGrid extends Component {
     
  render() {
    return (
      <ol className="books-grid">        
        {this.props.books.map((myBook, i) =>
          <li key={i}>
               <Book book={myBook} shelf={myBook.shelf ? myBook.shelf : 'none'} updateShelf={this.props.updateShelf}/>
          </li>
        )}
      </ol>
    )
  }

}

export default BooksGrid;