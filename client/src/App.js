import React, {Component} from 'react'
import ApolloClient from 'apollo-boost'
import {ApolloProvider} from 'react-apollo'
import {BrowserRouter as Router, Route} from 'react-router-dom'

// components
import Home from './components/Home'
import CarList from './components/CarList'

// apollo client setup
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})

class App extends Component {
  render () {
    return (
      <Router>
          <ApolloProvider client={client}>
            <div className='app'>
              <Route exact path='/' component={Home} />
              <Route path='/cars' component={CarList} />
            </div>
          </ApolloProvider>
      </Router>
    )
  }
}

export default App
