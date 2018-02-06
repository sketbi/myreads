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
    this.setState({ 
      query: query},()=>{
      this.search();
    });
  };

  updateShowingBooks = (result) =>{
    this.setState({
      showingBooks : result
    });
  }
  updateShelf = (book,shelf)=>{
    this.props.updateShelf(book,shelf);
    // check if the book exist in state.books, if yes just update the shelf, if no add it to the state.
   var objIndex = this.state.showingBooks.findIndex((obj => obj.id === book.id));
   let showingBooksCopy = JSON.parse(JSON.stringify(this.state.showingBooks));
   showingBooksCopy[objIndex]["shelf"] = shelf;
   this.updateShowingBooks(showingBooksCopy);

  };


  search = () => {
    if(this.state.query !== ''){
      const booksLength = this.props.books ? this.props.books.length : 0;
        
      BooksAPI.search(this.state.query).then((searchResult) => {
          let resultFound = searchResult && searchResult.length > 0;
          let updateAllBooks = booksLength === 0;
          if (resultFound) {
            var bookCounter = 0;
            this.props.books.forEach(function (book){
              bookCounter++;
                var objIndex = searchResult.findIndex((obj => obj.id === book.id));
                if (objIndex !== -1) { 
                  searchResult[objIndex].shelf = book.shelf;
                }
                if(bookCounter === booksLength){
                  updateAllBooks = true;
                } //book.shelf; 
            });// end of forEach
            if(updateAllBooks){
              this.setState({showingBooks:searchResult});
            }
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
          {resultFound && (<BooksGrid books={showingBooks} updateShelf={this.updateShelf} />)}
        </div>
      </div>
    )
  }

}

export default SearchBooks;