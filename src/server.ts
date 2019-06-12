const { ApolloServer, gql } = require('apollo-server');

const books = [
    {
      title: 'Harry Potter and the Chamber of Secrets',
      author: 'J.K. Rowling',
    },
    {
      title: 'Jurassic Park',
      author: 'Michael Crichton',
    },
];

const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.
  type Book {
    title: String
    author: String
  }
  type Query {
    books: [Book]
  }
`;

const resolvers = {
    Query: {
      books: () => books,
    },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }: any) => {
    console.log(`The server is now running at: ${url}`);
});
