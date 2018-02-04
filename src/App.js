import React from 'react'
import * as BooksAPI from './BooksAPI'

import './App.css'
import {BrowserRouter} from 'react-router-dom'
import {Route} from 'react-router-dom';

import SearchBooks from './SearchBooks';
import ListBooks from './ListBooks';


class BooksApp extends React.Component {
  state = {
      books : []
  }

 componentDidMount() {
   this.getBooks();
  } // end of componentDidMount

   getBooks = () =>{
        BooksAPI.getAll().then((books) => this.setState({books}));
   }

  updateShelf = (book,shelf) =>{
   var objIndex = this.state.books.findIndex((obj => obj.id == book.id));
    
    if(objIndex == -1){
        var joined = this.state.books.concat(book);
        this.setState({ books: joined }); 
    }

    BooksAPI.update(book,shelf).then((res) => {
         console.log("objIndex in updateShelf ==> "+objIndex)
        // if object already exist update the shelf value, else add new book to my books
         objIndex = this.state.books.findIndex((obj => obj.id == book.id));
        if(objIndex != -1){
            let booksCopy = JSON.parse(JSON.stringify(this.state.books))
            booksCopy[objIndex].shelf = shelf;
            this.setState({books : booksCopy});
        }else{
          console.log("cannot find the book");
        }
    });
  }




  render() {
    return (
      <BrowserRouter>
          <div className="app">
              <Route exact path='/search'  render={()=>(
                  <SearchBooks updateShelf={this.updateShelf} myBooks={this.state.books}/>
              )}/>
              <Route exact path='/' render={()=>(
                  <ListBooks books={this.state.books} updateShelf={this.updateShelf}/>
              )}/>
          </div>
      </BrowserRouter>

    )
  }
}

export default BooksApp
