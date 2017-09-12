import Db from '../db';
const bcrypt = require('bcrypt');
var slugify = require('slugify');

export const editlink = async (parent, args, userID) => {
    let linkUpdate = args;
    linkUpdate.slug = await slugify(linkUpdate.slug);

    const linkId = args.linkId;
    delete linkUpdate.linkId;

    const link = await Db.models.link.findOne({where: {id: linkId}});

    if(!link){
        throw new Error('Link not found');
    }
    
    //check if the usere have permission to edit the link 
    if(link.userId !== userID){
        throw new Error("You have no permission to update the link");
    }

    if(link.slug !== linkUpdate.slug){
        const count = await Db.models.link.count({ where: {'slug': linkUpdate.slug} });

        if(count > 0){
            throw new Error('Link already been used');        
        }
    }
   

    if(linkUpdate.password){
        linkUpdate.isProtected = true;
        linkUpdate.password = await bcrypt.hash(linkUpdate.password, 12);       
    } else {
        linkUpdate.isProtected = false;
    }

    console.log(linkUpdate)
    //update the link
    try {
        Db.models.link.update( linkUpdate, { where: {id: linkId}})
    } catch (error) {
        throw new Error(error);
    }

    const returnMsg = {msg: "Link edited successfully"}
    return returnMsg;


}


export default editlink;