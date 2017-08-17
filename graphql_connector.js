import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './graphql/resolvers';
import typeDefs from './graphql/typedefs';

export const Schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default Schema;
