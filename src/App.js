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
    BooksAPI.getAll().then((books) => this.setState({books}));

  } // end of componentDidMount

  updateShelf = (book,shelf) => {
    
    
  }


  render() {
    return (
      <BrowserRouter>
          <div className="app">
              <Route exact path='/search'  render={()=>(
                  <SearchBooks books={this.state.books}/>
              )}/>
              <Route exact path='/' render={()=>(
                  <ListBooks books={this.state.books}/>
              )}/>
          </div>
      </BrowserRouter>

    )
  }
}

export default BooksApp
