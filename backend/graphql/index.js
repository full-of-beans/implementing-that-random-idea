import fs from "fs";
import path from "path";
import { ApolloServer, gql } from "apollo-server-express";

import resolvers from "./resolvers";

const schemaDir = __dirname + "/schema/";
const schema = fs
  .readdirSync(schemaDir)
  .filter(fn => fn.endsWith(".gql"))
  .map(fn => fs.readFileSync(path.join(schemaDir, fn)).toString())
  .join("\n");

const typeDefs = gql(schema);

const attachGraphQL = (app, buildContext) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: args =>
      args.req
        ? buildContext(args)
        : args.connection
        ? args.connection.context
        : null,
    introspection: true,
    playground: {
      settings: {
        "request.credentials": "include"
      }
    },
    tracing: true
  });
  server.applyMiddleware({ app });
  return server;
};

export default attachGraphQL;
