const express = require("express");
const path = require("path");
const db = require("./config/connection");

const { ApolloServer } = require("apollo-server-express");
const { typeDefs, resolvers } = require("./schemas");
const { authMiddleware } = require("./utils/auth");

const app = express();
const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

const startApolloServer = async () => {
  try {
    await server.start();
    server.applyMiddleware({ app });

    db.once("open", () => {
      app.listen(PORT, () => {
        console.log(`🌍 Now listening on localhost:${PORT}`);
        console.log(
          `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
        );
      });
    });
  } catch (err) {
    console.error(err);
  }
};

startApolloServer(typeDefs, resolvers);
