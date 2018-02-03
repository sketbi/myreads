import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BooksGrid from './BooksGrid';

class ListBooks extends Component {
  state = {
    shelfs: [
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
      },
      {
        "shelf": "none",
        "displayName": "None"
      }
    ]
  }

  render() {
    return (
      <div className="list-books">
        {this.state.shelfs.filter(x => x.shelf != 'none').map((object, i) =>
          <div key={i} className="bookshelf">
            <h2 className="bookshelf-title">{object.displayName}</h2>
            <div className="bookshelf-books">
              <BooksGrid books={this.props.books.filter((x) => x.shelf == object.shelf)} />
            </div>
          </div>
        )}
        <div className="open-search">
          <Link to='/search'>Add Book</Link>
        </div>
      </div>

    )
  }

}

export default ListBooks;
