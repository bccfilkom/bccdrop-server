export const typeDefs = `
  scalar Date

  type User {
    id: Int!
    username: String
    email: String
    pasword: String
    dropbox: String
    links: [Link]
  }

  type UserProtected {
    id: Int!
    username: String!
    email: String!
    dropboxauth: Boolean
    dropboxemail: String
    dropboxavatar: String
  }

  type Token {
    logintoken: String!
  }

  type Link {
    id: Int!
    title: String
    url: String
    description: String
    isProtected: Boolean!    
    deadline: Date
    password: String
  }

  type LinkProtected {
    id: Int!
    title: String!
    isProtected: Boolean!
    slug: String
    description: String
    deadline: Date
  }

  type Msg {
    msg: String!
  }

  
  # the schema allows the following query:
  type Query {
    links: [LinkProtected]
    me: UserProtected
    link(slug: String!): LinkProtected 
  }

  type Mutation {
    # Register new user
    register(username: String!, email: String!, password: String!): Token
    login(username: String!, password: String!): Token
    updatePassword(oldPassword: String!, newPassword: String!): Msg
    updateprofile(newemail: String!): Msg
    dropboxtoken(token: String!): Msg
    createlink(title:  String!,slug: String!, description: String, deadline: Date, password: String): LinkProtected
    updatelink(linkId: Int!, title:  String!, slug: String!, description: String, deadline: Date, password: String): Msg
    deletelink(linkId: Int!): Msg
    checklinkpassword(linkId: Int!, password: String!): Msg
    dropboxunlink: Msg

  }
`;

//createLink(title: String!, deskripsi: String, deadline: Date!, password: String)


export default typeDefs;
