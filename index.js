// deps
const { ApolloServer, gql } = require('apollo-server');

// fake dataset

const books = [
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: {name:'J.K. Rowling'},
  },
  {
    title: 'Jurassic Park',
    author: {name: 'Micahel'}
  },
];

const authors = [
	{
		name: "Michael Crichton"
	},
	{
		name: "Author Person"
	}
];
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.

const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Author {
    name: String!
    books: [Book!]!	  
  }
  
  type Book {
    title: String!
    author: Author!
    pages: Int!
    bestSeller: Boolean!
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
    authors: [Author]
  } 
`;

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.

const resolvers = {
  Query: {
    books: () => books,
    authors: () => authors
  },
};



const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
