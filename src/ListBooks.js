import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BooksGrid from './BooksGrid';

class ListBooks extends Component {

  getShelf = () =>{
     const shelfs = [
      {
        "shelf": "currentlyReading",
        "displayName": "Currently Reading"
      },
      {
        "shelf": "wantToRead",
        "displayName": "Want to Read"
      },
      {
        "shelf": "read",
        "displayName": "Read"
      }
    ]
    return shelfs
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div className="list-books">
            {this.getShelf().map((object, i) =>
              <div key={i} className="bookshelf">
                <h2 className="bookshelf-title">{object.displayName}</h2>
                <div className="bookshelf-books">
                  <BooksGrid
                      books={this.props.books.filter((x) => x.shelf == object.shelf)}
                      updateShelf={this.props.updateShelf}
                     />
                </div>
              </div>
            )}
            <div className="open-search">
              <Link to='/search'>Add Book</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default ListBooks;

