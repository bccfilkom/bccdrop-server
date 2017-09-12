import Db from '../db';
const bcrypt = require('bcrypt');


export const dropboxunlink = async (parent, args, userID) => {
    const user = await Db.models.user.findOne({ where: {id: userID} });
    if (!user) {
      throw new Error('There is no user with that email / username');
    }

    try {
        Db.models.user.update( {dropbox: null}, { where: {id: userID}})
    } catch (error) {
        throw new Error(error);
    }

    let objMsg = {msg: "Dropbox Sucesfully Unlinked"};
    return objMsg;


}


export default dropboxunlink;