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
    dropbox: String
  }

  type Token {
    logintoken: String!
  }

  type Link {
    id: Int!
    title: String
    url: String
    deskripsi: User
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
    msg: Msg
  }

  type Msg {
    msg: String!
  }

  
  # the schema allows the following query:
  type Query {
    links: [Link]
    user(userID: Int!): UserProtected
  }

  type Mutation {
    # Register new user
    register(username: String!, email: String!, password: String!): Token
    login(username: String!, password: String!): Token
    dropboxtoken(token: String!): Msg
    createlink(title:  String!, isProtected: Boolean!, deskripsi: String, deadline: Date!, password: String): LinkProtected
  }
`;

//createLink(title: String!, deskripsi: String, deadline: Date!, password: String)


export default typeDefs;
