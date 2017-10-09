import Db from './db';
const FormData = require('form-data');
const mime = require('mime');
const fs = require('fs');
const axios = require('axios');
const bcrypt = require('bcrypt');


exports.upload = async (req, res) =>{
  //console.log(req);
  let file_url =  req.files[0].path;  
  if(req.body.linkid){
    const link = await Db.models.link.findOne({ where: { id: req.body.linkid} });   

    if(link){
      let linkCheckPassed = true;
      const user = await Db.models.user.findOne({ where: { id: link.userId} });   

      if(link.isProtected){
        if(!req.body.password){
          fs.unlinkSync("./"+ file_url);    
          linkCheckPassed= false;          
          return res.json({
            msg: 'Link is protected with password'
          });
        }
        const valid = await bcrypt.compare(req.body.password, link.password);  
        if(!valid) {
          linkCheckPassed = false;
          fs.unlinkSync("./"+ file_url);              
          return res.json({
            msg: 'Password is wrong'
          });
        }      
      }

      if(link.deadline){
        var todayDates = Math.floor(new Date().getTime());
        if(todayDates > Date.parse(link.deadline)) {
          console.log("TODAY " + todayDates)
          console.log("DEADLINE " + Date.parse(link.deadline))
          
          linkCheckPassed = false;
          fs.unlinkSync("./"+ file_url);              
          return res.json({
            msg: 'Upload sudah melewati deadline'
          });
        } 
      }

      if(user.dropbox && linkCheckPassed === true){
        //console.log(req.files[0].path);
        let data = fs.createReadStream(__dirname + "/"+ file_url);
      
        //Clean tmp file when user exit app while uploading
        req.on('close', function (err){
          fs.unlinkSync("./"+ file_url);    
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
          fs.unlinkSync("./" + file_url);
          sendOk();
      
        })
        .catch(function (err) {
          res.sendStatus(404);    
          //console.log(err)
        });
      
        const sendOk = () => {
          return res.json({
            msg: 'File is sucessfuly uploaded'
          });
        }
      } else {
        fs.unlinkSync("./" + file_url);        
        return res.json({
          msg: 'user dropbox is not connected'
        });

      }
      
    } else {
      fs.unlinkSync("./" + file_url);      
      return res.json({
        msg: 'link not found'
      });
    }
    
  } else {
    fs.unlinkSync("./" + file_url);    
    res.sendStatus(400);        
  }
}
