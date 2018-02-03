import React, { Component } from 'react';
import Proptypes from 'prop-types';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by'
import * as BooksAPI from './BooksAPI'

import { Link } from 'react-router-dom';
import BooksGrid from './BooksGrid';

class SearchBooks extends Component {

   static Proptypes ={
     books: Proptypes.array.isRequired
   }

  state = {
    query: '',
    showingBooks : []
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() });
    this.search(this.state.query);
  };

  search = (query) => {
    BooksAPI.search(query).then((showingBooks) => this.setState({showingBooks}));
  };


  clearQueury = () => {
    this.setState({ query: '',showingBooks : [] });
  };

  render() {

    const {books} = this.props;
    const {query,showingBooks} = this.state;
    return (
      <div className="search-books">
        
        <div className="search-books-bar">
          <Link
            to='/'
            className='close-search'>
            Close Search</Link>
          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input 
              type="text" 
              placeholder="Search by title or author" 
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />

          </div>
        </div>
        <div className="search-books-results">
          {showingBooks.length  && <BooksGrid books={showingBooks}/>}
        </div>
      </div>

    )
  }

}

export default SearchBooks;