import Db from '../db';
const bcrypt = require('bcrypt');
const _ = require('lodash');
var slugify = require('slugify')


export const createlink = async (parent, args, user) => {
    const link = args;
    link.slug = await slugify(link.title);
    //console.log(user);
    //check if user loged in and authorized
    if(!user) {
        throw new Error('Not Authorized to make link');
        //auto
    } else {
        link.userId = user.id;           
    }

    let count = await Db.models.link.count({ where: {'slug': link.slug} });

    if(count > 0){
        throw new Error('Link already been used');        
    }
    if(link.password){
        link.isProtected == true;
        link.password = await bcrypt.hash(link.password, 12);       
        
    } else {
        link.isProtected == false;
    }
    console.log(link);
    const linkFinal = await Db.models.link.create(link);
    linkFinal.msg = {msg: "Create link sucessfull"}
    return linkFinal;

}


export default createlink;
