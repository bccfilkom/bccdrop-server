import Db from '../db';
const request = require('request-promise');


export const getSingleUser = async (userID) => {
  let user = await Db.models.user.findOne({
    where: {
      id: userID,
    },
  });
  
  const options = {
    url: 'https://api.dropboxapi.com/2/users/get_current_account',
    headers: {
      'Authorization': `Bearer ${user.dropbox}`,
    }
  };
  
  try {
    let response = await request.post(options);
    const resjson = JSON.parse(response);
    if(resjson.email){
      user.dropboxauth = true;
      user.dropboxemail = resjson.email;
      user.dropboxavatar = resjson.profile_photo_url;
      return user;
      
    } else {
      user.dropboxauth = false;
      return user;
      
    }
  }
  catch (error) {
    user.dropboxauth = false;    
    return user;
  }  

  
};

export default getSingleUser;
