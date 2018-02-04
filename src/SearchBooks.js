import React, { Component } from 'react';
import Proptypes from 'prop-types';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by'
import * as BooksAPI from './BooksAPI'

import { Link } from 'react-router-dom';
import BooksGrid from './BooksGrid';

class SearchBooks extends Component {

  state = {
    query: '',
    showingBooks : []
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() });
    this.search();
  };

  search = () => {
      let searchResult = [];
      let resultFound ;
      BooksAPI.search(this.state.query).then((searchResult) => {
              console.log("searchResult ==> "+JSON.stringify(searchResult));
              resultFound = searchResult && searchResult.length > 0;
                    console.log("resultFound ==> "+resultFound);
                        if(resultFound){
        this.props.myBooks.map((book) =>{
          console.log("book id==> "+book.id)
           var objIndex = searchResult.findIndex((obj => obj.id == book.id));
           console.log("objIndex => "+objIndex)
           if(objIndex != -1 ){
            searchResult[objIndex]["shelf"] = book.shelf;
           }
        }
        
        );
        
        this.setState({showingBooks:searchResult})
      }

 
      });
  

  }

  render() {
    const {query,showingBooks} = this.state;
    let resultFound = showingBooks && showingBooks.length > 0;
     console.log(showingBooks);
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
          {
            resultFound && (<BooksGrid books={showingBooks}  updateShelf={this.props.updateShelf}/>)
          }
            
        </div>
      </div>

    )
  }

}

export default SearchBooks;