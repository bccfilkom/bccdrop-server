import Db from '../db';


export const dropboxtoken = async (parent, args, user) => {
    const token = args.dropboxtoken;
    console.log(user)
    const usid = user.id;
    console.log(token);
    try {
        Db.models.user.update({ dropbox: token }, { where: { id: usid }})
        
    } catch (error) {
        throw new Error(error);
        
    }
    let objMsg = {msg: "Dropbox Sucesfully Linked"};
    return objMsg;
}


export default dropboxtoken;
