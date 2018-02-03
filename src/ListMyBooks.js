import React,{Component} from 'react';
import ListBooks from './ListBooks';

class ListMyBooks extends Component{
  state = {
    myBooks: []
  } 
  render(){
      return(
            <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
			<div className="list-books-content">
			 <ListBooks books={this.props.books}/>
			</div>
			</div>
      )
  }

}

export default ListMyBooks ;


