import Db from '../db';
import getSingleUser from '../logic/get_single_user';
import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
let bcrypt = require('bcrypt');



export const resolvers = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10); // ast value is always in string format
      }
      return null;
    },
  }),
  Query: {
    links: () => Db.models.links.findAll(),
    user: (_, { userID }) => getSingleUser(userID),
  },
  User: {
    links(user) {
      return Db.models.link.findAll({
        where: {
          userId: user.id,
        },
      });
    },
  },

  Mutation: {
    register: async (parent, args) => {
      const user = args;
      user.password = await bcrypt.hash(user.password, 12);
      return Db.models.user.create(user);
    },
  }
};

export default resolvers;
