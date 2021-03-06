import Db from '../db';
const bcrypt = require('bcrypt');
const _ = require('lodash');
const slugify = require('slugify')
const request = require('request-promise');


export const createlink = async (parent, args, user) => {
    let link = args;
    link.slug = await slugify(link.slug);
    //console.log(user);
    //check if user loged in and authorized
    if(!user) {
        throw new Error('Not Authorized to make link');
        //auto
    } else {
        link.userId = user.id;           
    }

    let userFromDb = await Db.models.user.findOne({
        where: {
          id: user.id,
        },
    });

    if(!userFromDb) {
        throw new Error('User not found');
        //auto
    } else {
        const options = {
            url: 'https://api.dropboxapi.com/2/users/get_current_account',
            headers: {
              'Authorization': `Bearer ${userFromDb.dropbox}`,
            }
        };
          
        try {
            let response = await request.post(options);
            const resjson = JSON.parse(response);
            if(!resjson.email){
                throw new Error('Dropbox token is broken or not yet linked');                
            }
        }

        catch (error) {
            console.log(error)
            throw new Error('Dropbox auth api is broken or not yet linked');                
        }          
    }

    let count = await Db.models.link.count({ where: {'slug': link.slug} });

    if(count > 0){
        throw new Error('Link already been used');        
    }
    if(link.password){
        link.isProtected = true;
        link.password = await bcrypt.hash(link.password, 12);       
        
    } else {
        link.isProtected = false;
    }
    //console.log(link);
    const linkFinal = await Db.models.link.create(link);
    linkFinal.msg = {msg: "Create link sucessfull"}
    return linkFinal;

}


export default createlink;
