import Db from '../db';

export const dropboxtoken = async (parent, args, user) => {
    const token = args.token;
    const usid = {id: user.id};
    try {
        Db.models.user.update({ dropbox: token }, { where: usid})
        
    } catch (error) {
        throw new Error(error);
    }
    
    let objMsg = {msg: "Dropbox Sucesfully Linked"};
    return objMsg;
}


export default dropboxtoken;
