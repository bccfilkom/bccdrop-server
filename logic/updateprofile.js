import Db from '../db';


export const updateprofile = async (parent, args, userID) => {
    const newEmail = args.newemail;

    const user = await Db.models.user.findOne({ where: { id: userID } });
    if (!user) {
      throw new Error('There is no user with that id');
    }

    try {
        Db.models.user.update({ email: newEmail }, { where: {id: userID} })
        
    } catch (error) {
        throw new Error(error);
    }

    const returnMsg = {msg: "Profile updated successfully"}
    return returnMsg;

}


export default updateprofile;