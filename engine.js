const FormData = require('form-data');
const mime = require('mime');
const fs = require('fs');
const axios = require('axios');
import Db from './db';



exports.upload = async (req, res) =>{
  console.log(req);
  if(req.body.linkid){
    const link = await Db.models.link.findOne({ where: { id: req.body.linkid} });   

    if(link){
      const user = await Db.models.user.findOne({ where: { id: link.userId} });   

      if(user.dropbox){
        console.log(req.files[0].path);
        let file_url =  req.files[0].path;
        let data = fs.createReadStream(__dirname + "/"+ file_url);
      
        //Clean tmp file when user exit app while uploading
        req.on('close', function (err){
          fs.unlinkSync(__dirname + "/"+ file_url);    
        });
      
        let config = {
            headers: {
              'Authorization': `Bearer ${user.dropbox}`,
              'Dropbox-API-Arg': `{"path": "/bccdrop/${link.slug}/${req.files[0].originalname}","mode": "add","autorename": true,"mute": false}`,
              'Content-Type': 'application/octet-stream'
            }
        }
      
        axios.post('https://content.dropboxapi.com/2/files/upload', data, config)
        .then(function (res) {
          fs.unlinkSync(__dirname + "/"+ file_url);
          sendOk();
      
        })
        .catch(function (err) {
          res.sendStatus(404);    
          console.log(err)
        });
      
        const sendOk = () => {
          return res.json({
            msg: 'File berhasil di upload'
          });
        }
      } else {


      }
      
    } else {

    }
    
  } else {
    res.sendStatus(400);        
  }
}
