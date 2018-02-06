import React from 'react'
import * as BooksAPI from './BooksAPI'

import './App.css'
import {BrowserRouter} from 'react-router-dom'
import {Switch,Route} from 'react-router-dom';

import SearchBooks from './SearchBooks';
import ListBooks from './ListBooks';
import NoMatch from './NoMatch';


class BooksApp extends React.Component {
  state = {
      books : []
  }

  updateBooks = (books) =>{
      this.setState({books});
  }

 componentDidMount() {
    BooksAPI.getAll().then((books) => this.setState({books}));

  } // end of componentDidMount

   getBooks = () =>{
        BooksAPI.getAll().then((books) => this.updateBooks(books));
   }

  updateShelf = (book,shelf) =>{
   // check if the book exist in state.books, if yes just update the shelf, if no add it to the state.
   var objIndex = this.state.books.findIndex((obj => obj.id === book.id));
   let booksCopy = JSON.parse(JSON.stringify(this.state.books));
   BooksAPI.update(book,shelf).then((res) => {
        // if book does not exist, add it to booksCopy
        if(objIndex === -1){
            book["shelf"] = shelf;
            booksCopy.push(book);
            this.updateBooks(booksCopy);
        }else{
            booksCopy[objIndex]["shelf"] = shelf;
            this.updateBooks(booksCopy);
        }    
    });
  }
  render() {
    return (
      <BrowserRouter>
          <div className="app">
            <Switch>
                <Route exact path='/search'  render={()=>(
                    <SearchBooks  books={this.state.books} updateShelf={this.updateShelf}/>
                )}/>
                <Route exact path='/' render={()=>(
                    <ListBooks books={this.state.books} updateShelf={this.updateShelf}/>
                )}/>
                <Route component={NoMatch}/>
            </Switch>
          </div>
      </BrowserRouter>

    )
  }
}

export default BooksApp
