import React, {Component} from 'react'

// components
import BookList from './BookList'
import AddBook from './AddBook'

class Home extends Component {
  constuctor() {
    this.routeChange = this.routeChange.bind(this);
  }
  routeChange () {
  this.props.history.push('cars');
  }

  render () {
    return (
      <div id="main">
        <h1>Ninja's Reading List</h1>
        <BookList />
        <a href="/cars">See cars</a>
        <AddBook />
      </div>
    )
  }
}

export default Home