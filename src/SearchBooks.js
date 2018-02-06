import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI'

import { Link } from 'react-router-dom';
import BooksGrid from './BooksGrid';

class SearchBooks extends Component {

  state = {
    query: '',
    showingBooks: []
  }

  updateQuery = (query) => {
    this.setState({ query: query},()=>{
      this.search();
    });
  };

  search = () => {
    if(this.state.query !== ""){
        BooksAPI.search(this.state.query).then((searchResult) => {
          let resultFound = searchResult && searchResult.length > 0;
          if (resultFound) {
            this.props.books.forEach(function (book){ 
                var objIndex = searchResult.findIndex((obj => obj.id === book.id));
                if (objIndex !== -1) { 
                  searchResult[objIndex]["shelf"] = book.shelf;
                } //book.shelf; 
            }); // end of forEach
            this.setState({ showingBooks: searchResult });
          }else{
            this.setState({showingBooks:[]});
          }// end of if resultFound 
        }); // end of BooksAPI.search
    }else{
      this.setState({showingBooks:[]});
    }
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
              type='text'
              placeholder='Search by Title or Author'
              value={query}
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