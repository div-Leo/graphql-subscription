const { ApolloServer, PubSub } = require("apollo-server");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    pubsub
  }
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
