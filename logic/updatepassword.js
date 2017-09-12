import Db from '../db';
const bcrypt = require('bcrypt');


export const updatepassword = async (parent, args, userID) => {
    const oldPassword = args.oldPassword;
    let newPassword = args.newPassword;
    const user = await Db.models.user.findOne({ where: { id: userID } });
    if (!user) {
      throw new Error('There is no user with that id');
    }

    const valid = await bcrypt.compare(oldPassword, user.password);
    if (!valid) {
      throw new Error('Incorrect old password');
    }

    newPassword = await bcrypt.hash(newPassword, 12);

    try {
        Db.models.user.update({ password: newPassword }, { where: {id: userID} })
        
    } catch (error) {
        throw new Error(error);
    }

    const returnMsg = {msg: "Password updated successfully"}
    return returnMsg;

}


export default updatepassword;