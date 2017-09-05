import Db from '../db';
import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';

import { requiresAuth } from '../service/auth';


//logic import
import getSingleUser from '../logic/get_single_user';
import register from '../logic/register';
import login from '../logic/login';
import dropboxtoken from '../logic/dropboxtoken';





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
    links: () => Db.models.link.findAll(),
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
    register: (parent, args, { SECRET }) => register(parent,args,SECRET),
    login: async (parent, { username, password }, { SECRET }) => login(parent,username,password,SECRET),
    dropboxtoken: requiresAuth.createResolver((parent, args, {user}) => dropboxtoken(parent,args,user.id)),
    //dropboxtoken: (parent, args, {user}) => dropboxtoken(parent,args,user),
  }
};

export default resolvers;
