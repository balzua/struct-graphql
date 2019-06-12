"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var _a = require('apollo-server'), ApolloServer = _a.ApolloServer, gql = _a.gql;
var books = [
    {
        title: 'Harry Potter and the Chamber of Secrets',
        author: 'J.K. Rowling',
    },
    {
        title: 'Jurassic Park',
        author: 'Michael Crichton',
    },
];
var typeDefs = gql(__makeTemplateObject(["\n  # Comments in GraphQL are defined with the hash (#) symbol.\n\n  # This \"Book\" type can be used in other type declarations.\n  type Book {\n    title: String\n    author: String\n  }\n\n  # The \"Query\" type is the root of all GraphQL queries.\n  # (A \"Mutation\" type will be covered later on.)\n  type Query {\n    books: [Book]\n  }\n"], ["\n  # Comments in GraphQL are defined with the hash (#) symbol.\n\n  # This \"Book\" type can be used in other type declarations.\n  type Book {\n    title: String\n    author: String\n  }\n\n  # The \"Query\" type is the root of all GraphQL queries.\n  # (A \"Mutation\" type will be covered later on.)\n  type Query {\n    books: [Book]\n  }\n"]));
var resolvers = {
    Query: {
        books: function () { return books; },
    },
};
var server = new ApolloServer({ typeDefs: typeDefs, resolvers: resolvers });
// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(function (_a) {
    var url = _a.url;
    console.log("The server is now running at: " + url);
});
