export const typeDefs = `
  scalar Date

  type User {
    id: Int!
    username: String
    email: String
    pasword: String
    dropbox: String
    email: String # the list of Posts by this author
    links: [Link]
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
  
  # the schema allows the following query:
  type Query {
    links: [Link]
    user(userID: Int!): User
  }

  type Mutation {
    # Register new user
    register(username: String!, email: String!, password: String!): User
    login(username: String!, password: String!): Token
  }
`;

//createLink(title: String!, deskripsi: String, deadline: Date!, password: String)


export default typeDefs;
