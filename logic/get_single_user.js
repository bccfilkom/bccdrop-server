import Db from '../db';

export const getSingleUser = (userID) => {
  if (userID === 1) {
    throw new Error('Akses Denied');
  } else {
    return Db.models.user.findOne({
      where: {
        id: userID,
      },
    });
  }
};

export default getSingleUser;
