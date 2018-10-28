const graphql = require('graphql')
// const { ApolloServer, gql } = require('apollo-server')
const Book = require('../models/book')
const Author = require('../models/author')
const Car = require('../models/car')
const _ = require('lodash')

// const ObjectId = mongoose.Types.ObjectId;

// // Convert ObjectID to string
// ObjectId.prototype.valueOf = function () {
// 	return this.toString();
// };

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: {type: GraphQLID},
    title: {type: GraphQLString},
    genre: {type: GraphQLString},
    author: {
      type: AuthorType,
      resolve (parent, args) {
        return Author.findById(parent.authorId)
      }
    }
  })
})

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    age: {type: GraphQLInt},
    books: {
      type: new GraphQLList(BookType),
      resolve (parent, args) {
        return Book.find({authorId: parent.id})
      }
    }
  })
})

const CarType = new GraphQLObjectType({
  name: 'Car',
  fields: () => ({
    id: {type: GraphQLID},
    make: {type: GraphQLString},
    model: {type: GraphQLString},
    year: {type: GraphQLInt}
    // driver: {
    //   type: DriverType,
    //   resolve (parent, args) {
    //     return Driver.findById(parent.driverId)
    //   }
    // }
  })
})


const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: {id: {type: GraphQLID}},
      resolve (parent, args) {
        return Book.findById(args.id)
      }
    },
    author: {
      type: AuthorType,
      args: {id: {type: GraphQLID}},
      resolve (parent, args) {
        return Author.findById(args.id)
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve (parent, args) {
        return Book.find({})
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve (parent, args) {
        return Author.find({})
      }
    },
    cars: {
      type: new GraphQLList(CarType),
      resolve (parent, args) {
        return Car.find({})
      }
    }
  }
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: {type: GraphQLString},
        age: {type: GraphQLInt}
      },
      resolve (parent, args) {
        let author = new Author({
          name: args.name,
          age: args.age
        })
        return author.save()
      }
    },
    addBook: {
      type: BookType,
      args: {
        title: {type: new GraphQLNonNull(GraphQLString)},
        genre: {type: new GraphQLNonNull(GraphQLString)},
        authorId: {type: new GraphQLNonNull(GraphQLID)}
      },
      resolve (parent, args) {
        let book = new Book({
          title: args.title,
          genre: args.genre,
          authorId: args.authorId
        })
        return book.save()
      }
    },
    addCar: {
      type: CarType,
      args: {
        make: {type: GraphQLString},
        model: {type: GraphQLString},
        year: {type: GraphQLInt}
      },
      resolve (parent, args) {
        let car = new Car({
          make: args.make,
          model: args.model,
          year: args.year
        })
        return car.save()
      }
    }
  }
})

// const typeDefs = gql`
//   type Book {
//     _id: String,
//     title: String
//     author: Author
//   }
//   type Author {
//     _id: String
//     name: String
//     books: [Book]
//   }
  
//   type Mutation {
//     addBook(title: String!, genre: String!, author: String!): Book
//   }
//   type Query {
//     books: [Book]
//     authors: [Author]
//   }
// `;

// const resolvers = {
//   Author: {
//     books: async (obj) => Book.find({ author: obj._id }),
//   },
//   Book: {
//     author: async (obj) => Author.findById(obj.author)
//   },
//   Query: {
//     authors: async () =>  Author.find({}),
//     books: async () =>  Book.find({}),
//   },
//   Mutation: {
//     addBook: async (obj, arg) => {
//       let author = await Author.findOne({ name: arg.author })
      
//       if (!author) {
//         author = await Author.create({ name: arg.author })
//       }

//       const book = await Book.create({
//         title: arg.title,
//         author: author._id,
//       })

//       author.books.push(book);
//       return author.save();
//     }
//   }
// };

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})

// // In the most basic sense, the ApolloServer can be started
// // by passing type definitions (typeDefs) and the resolvers
// // responsible for fetching the data for those types.
// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
// });

// // This `listen` method launches a web-server.  Existing apps
// // can utilize middleware options, which we'll discuss later.
// server.listen().then(({ url }) => {
//   console.log(`🚀  Server ready at ${url}`);
// });