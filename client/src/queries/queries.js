import {gql} from 'apollo-boost'

const getAuthorsQuery = gql`
    {
        authors {
            name
            id
        }
    }
`

const getBooksQuery = gql`
    {
        books {
            title
            id
        }
    }
`

const getCarsQuery = gql`
    {
        cars {
            id
            make
            model
            year
        }
    }
`

export const CARS_QUERY = gql`
    {
        cars {
            id
            make
            model
            year
        }
    }
`

export const ADD_CAR_MUTATION = gql`
  mutation addCar($make: String!, $model: String!, $year: Int!) {
    addCar(make: $make, model: $model, year: $year) {
      id
      make
      model
      year
    }
  }
`

const addBookMutation = gql`
    mutation AddBook($title: String!, $genre: String!, $authorId: ID!){
        addBook(title: $title, genre: $genre, authorId: $authorId){
            title
            id
        }
    }
`

const getBookQuery = gql`
    query GetBook($id: ID){
        book(id: $id) {
            id
            title
            genre
            author {
                id
                name
                age
                books {
                    title
                    id
                }
            }
        }
    }
`

export {getAuthorsQuery, getBooksQuery, getCarsQuery, addBookMutation, getBookQuery}
