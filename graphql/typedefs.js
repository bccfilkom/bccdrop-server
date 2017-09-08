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
    username: String
    email: String
    dropboxauth: Boolean
  }

  type Token {
    logintoken: String!
  }

  type Link {
    id: Int!
    title: String
    url: String
    deskripsi: User
    isProtected: Boolean!    
    deadline: Date
    password: String
  }

  type LinkProtected {
    id: Int!
    title: String!
    isProtected: Boolean!
    slug: String
    deskripsi: User
    deadline: Date
  }

  type Msg {
    msg: String!
  }

  
  # the schema allows the following query:
  type Query {
    links: [Link]
    me: UserProtected
    link(slug: String!): LinkProtected 
  }

  type Mutation {
    # Register new user
    register(username: String!, email: String!, password: String!): Token
    login(username: String!, password: String!): Token
    dropboxtoken(token: String!): Msg
    createlink(title:  String!, deskripsi: String, deadline: Date!, password: String): LinkProtected
  }
`;

//createLink(title: String!, deskripsi: String, deadline: Date!, password: String)


export default typeDefs;
