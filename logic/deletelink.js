import Db from '../db';
const bcrypt = require('bcrypt');


export const deletelink = async (parent, args, userID) => {
    const linkId = args.linkId;
    const link = await Db.models.link.findOne({where: {id: linkId}});

    if(!link){
        throw new Error('Link not found');
    }
    console.log("User ID" + userID);
    console.log("Link ID" + link);
    
    //check if the usere have permission to edit the link 
    if(link.userId !== userID){
        throw new Error("You have no permission to delete the link");
    }

    try {
        Db.models.link.destroy({ where: {id: linkId} });
    } catch (error) {
        throw new Error(error);
    }

    const returnMsg = {msg: "Link deleted successfully"}
    return returnMsg;


}


export default deletelink;