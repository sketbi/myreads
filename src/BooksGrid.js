import React, { Component } from 'react';
import Book from './Book'
class BooksGrid extends Component {
     
  render() {
    return (
      <ol className="books-grid">        
        {this.props.books.map((myBook,index) =>
          <li key={'myBook' + index}>
               <Book book={myBook} shelf={myBook.shelf ? myBook.shelf : 'none'} updateShelf={this.props.updateShelf}/>
          </li>
        )}
      </ol>
    )
  }

}

export default BooksGrid;