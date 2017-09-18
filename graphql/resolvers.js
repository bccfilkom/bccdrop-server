import Db from '../db';
import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import { requiresAuth } from '../service/auth';


//logic import
import getSingleUser from '../logic/get_single_user';
import register from '../logic/register';
import login from '../logic/login';
import updatepassword from '../logic/updatepassword';
//import me from '../logic/me';
import dropboxtoken from '../logic/dropboxtoken';
import createlink from '../logic/createlink';
import deletelink from '../logic/deletelink';
import updatelink from '../logic/updatelink';
import checklinkpassword from '../logic/checklinkpassword';
import dropboxunlink from '../logic/dropboxunlink';
import updateprofile from '../logic/updateprofile';



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
    links: requiresAuth.createResolver((parent, args, {user}) => Db.models.link.findAll({where: {userId: user.id}})),
    //user: (_, { userID }) => getSingleUser(userID),
    link: (_, {slug}) => Db.models.link.findOne({where: {slug: slug}}),
    me: requiresAuth.createResolver((parent, args, {user}) => getSingleUser(user.id)),
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
    updatePassword:requiresAuth.createResolver((parent, args, {user}) => updatepassword(parent,args,user.id)),
    dropboxtoken: requiresAuth.createResolver((parent, args, {user}) => dropboxtoken(parent,args,user)),
    createlink: (parent, args, {user}) => createlink(parent,args,user),
    deletelink: requiresAuth.createResolver((parent, args, {user}) => deletelink(parent,args,user.id)),
    updatelink: requiresAuth.createResolver((parent, args, {user}) => updatelink(parent,args,user.id)),
    dropboxunlink: requiresAuth.createResolver((parent, args, {user}) => dropboxunlink(parent,args,user.id)),
    updateprofile: requiresAuth.createResolver((parent, args, {user}) => updateprofile(parent,args,user.id)),
    checklinkpassword: (parent, args) => checklinkpassword(parent,args),
    
    //dropboxtoken: (parent, args, {user}) => dropboxtoken(parent,args,user),
  }
};

export default resolvers;
