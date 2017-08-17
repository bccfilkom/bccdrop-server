export const typeDefs = `
  type User {
    id: Int!
    firstName: String
    lastName: String
    email: String
    avatar: String
    posts: [Post] # the list of Posts by this author
  }
  type Post {
    id: Int!
    title: String
    content: String
    user: User
  }
  
  # the schema allows the following query:
  type Query {
    posts: [Post]
    user(userID: Int!): User
  }
`;

export default typeDefs;
