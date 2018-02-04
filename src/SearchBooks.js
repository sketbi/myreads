import React, { Component } from 'react';
import Proptypes from 'prop-types';
import * as BooksAPI from './BooksAPI'

import { Link } from 'react-router-dom';
import BooksGrid from './BooksGrid';

class SearchBooks extends Component {

  state = {
    query: '',
    showingBooks: []
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() });
    this.search();
  };

  search = () => {
    let searchResult = [];
    BooksAPI.search(this.state.query).then((searchResult) => {
      let resultFound = searchResult && searchResult.length > 0;
      if (resultFound) {
        this.props.myBooks.map((book) => {
          var objIndex = searchResult.findIndex((obj => obj.id == book.id));
          if (objIndex != -1) { searchResult[objIndex]["shelf"] = book.shelf; }
        });// end of myBooks.map
        this.setState({ showingBooks: searchResult })
      }// end of if resultFound 
    }); // end of BooksAPI.search
  }// end of search

  render() {
    const {query, showingBooks} = this.state;
    let resultFound = showingBooks && showingBooks.length > 0;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            to='/'
            className='close-search'>
            Close Search</Link>
          <div className="search-books-input-wrapper">
            <input
              className='search-contacts'
              type='text'
              placeholder='Search by Title or Author'
              value={this.state.query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          {resultFound && (<BooksGrid books={showingBooks} updateShelf={this.props.updateShelf} />)}
        </div>
      </div>
    )
  }

}

export default SearchBooks;