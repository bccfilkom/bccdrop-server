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

  type Link {
    id: Int!
    title: String
    url: String
    deskripsi: User
    deadline: Date
    protected: Boolean
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
   
    
  }
`;

export default typeDefs;
