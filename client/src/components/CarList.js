import React, {Component} from 'react'
// import {graphql} from 'react-apollo'
import { Query, Mutation } from 'react-apollo'
// import {getCarsQuery} from '../queries/queries'

import { CARS_QUERY } from '../queries/queries'
import { ADD_CAR_MUTATION } from '../queries/queries';

// class CarList extends Component {
//   // constructor (props) {
//   //   super(props)
//   //   this.state = {
//   //     selected: null
//   //   }
//   // }
//   displayCars () {
//     var data = this.props.data
//     if (data.loading) {
//       return (<div>Loading cars...</div>)
//     } else {
//       return data.cars.map(car => {
//         return (
//           <li key={ car.id } >
//             <h2>Make: { car.make }</h2>
//             <h4>Model: { car.model }</h4>
//             <h4>Year: { car.year }</h4>
//           </li>
//         )
//       })
//     }
//   }
//   render () {
//     return (
//       <div>
//         <ul id="book-list">
//           { this.displayCars() }
//         </ul>
//       </div>
//     )
//   }
// }

// export default graphql(getCarsQuery)(CarList)

class CarList extends Component {

  state = {
    make: '',
    model: '',
    year: 0
  }
  
  onSubmit = (event, mutation) => {
    event.preventDefault();

    mutation({
      variables: {
        ...this.state,
      },
      refetchQueries: [
        { query: CARS_QUERY },
      ]
    })

    this.setState({
      make: '',
      model: '',
      year: 0
    })

  }

  // deleteBook = (book, mutation) => {
  //   mutation({
  //     variables: {
  //       id: book._id,
  //     },
  //     refetchQueries: [
  //       { query: CARS_QUERY },
  //     ]
  //   })
  // }

  render() {
    return (
      <div>
        <h2>
          Car list working
        </h2>
        <Query
          query={CARS_QUERY}
        >
        {
          ({loading, data, error}) => {
            console.log(data)
            if (!loading) {
              return (
                <ul>
                  {data.cars.map(car => (
                    <li>
                      <strong>Make: {car.make}</strong><br />
                      Model: {car.model}<br />
                      Year: {car.year}<br />
                      {/* <Mutation
                        mutation={DELETE_BOOK_MUTATION}
                      >
                      {
                        (deleteBook) => {
                          return (
                            <button
                              onClick={() => this.deleteBook(book, deleteBook)}
                            >
                              X
                            </button>
                          )
                        }
                      }
                      </Mutation> */}
                    </li>
                  ))}
                </ul>
              )
            }

            return (<div>Loading</div>)
          }
        }
        </Query>
        <Mutation
          mutation={ADD_CAR_MUTATION}
        >
        {
          (addCar, { data }) => {
            return (
              <div>
                Add a car
                <form
                  onSubmit={(event) => { this.onSubmit(event, addCar) }}
                  style={{ display: 'flex', flexDirection: 'column', maxWidth: 300 }}>
                  <input
                    placeholder='make'
                    onChange={({ target }) => { this.setState({ make: target.value })}}
                    type='text'
                    value={this.state.make}
                  />
                  <input
                    placeholder='model'
                    onChange={({ target }) => { this.setState({ model: target.value })}}
                    type='text'
                    value={this.state.model}
                  />
                  <input
                    placeholder='year'
                    onChange={({ target }) => { this.setState({ year: Number(target.value) })}}
                    type='text'
                    value={this.state.year}
                  />
                  <input type='submit' value='Submit' />
                </form>
              </div>
            )
          }
        }
        </Mutation>
      </div>
    )
  }
}

export default CarList
