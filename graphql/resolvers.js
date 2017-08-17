import Db from '../db';
import getSingleUser from '../logic/get_single_user';

export const resolvers = {
  Query: {
    posts: () => Db.models.post.findAll(),
    user: (_, { userID }) => getSingleUser(userID),
  },
  User: {
    posts(user) {
      return Db.models.post.findAll({
        where: {
          userId: user.id,
        },
      });
    },
  },
};

export default resolvers;
