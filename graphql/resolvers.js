import Db from '../db';
import getSingleUser from '../logic/get_single_user';
import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import jwt from 'jsonwebtoken';

const _ = require('lodash');
const bcrypt = require('bcrypt');



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
    login: async (parent, { username, password }, { SECRET }) => {
      console.log("WAAW")
      const user = await Db.models.user.findOne({ where: { username } });
      if (!user) {
        throw new Error('Not user with that email');
      }

      console.log(user);
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        throw new Error('Incorrect password');
      }

      // token = '12083098123414aslkjdasldf.asdhfaskjdh12982u793.asdlfjlaskdj10283491'
      // verify: needs secret | use me for authentication
      // decode: no secret | use me on the client side
      const token = jwt.sign(
        {
          user: _.pick(user, ['id', 'username']),
        },
        SECRET,
        {
          expiresIn: '1y',
        },
      );

      console.log(token);
      let objToken = {logintoken: token}
      return objToken;
    },
  }
};

export default resolvers;
