import Db from '../db';
const axios = require('axios');


export const getSingleUser = (userID) => {
  let user = Db.models.user.findOne({
    where: {
      id: userID,
    },
  });

  if(user.dropbox){
    let config = {
      headers: {
        'Authorization': `Bearer ${user.dropbox}`,
      }
    }
    axios.post('https://api.dropboxapi.com/2/users/get_current_account',config)
    .then(function (res) {
      user.dropboxauth = true;
    })
    .catch(function (err) {
      res.sendStatus(404);    
      console.log(err)
    });
  } else {
    user.dropboxauth = false;
  }

  return user;
};

export default getSingleUser;
