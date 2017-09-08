import Express from 'express';
import GraphHTTP from 'express-graphql';
import Schema from './graphql_connector';
import jwt from 'jsonwebtoken';


const multer  = require('multer')
const FormData = require('form-data');
const mime = require('mime');
const fs = require('fs');
const upload = multer({ storage: storage })
const cors = require('cors');
const axios = require('axios')


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'tmp/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})


// Config
const APP_PORT = 6321;

// Start
const app = Express();

const SECRET = 'aslkdjlkaj10830912039jlkoaiuwerasdjflkasd';

const verifyuser = async (req) => {
  const token = req.headers.authorization;
  if(token){
    console.log(token);
    try {
      const { user } = await jwt.verify(token, SECRET);
      req.user = user;
    } catch (err) {
      console.log(err);
    }
    console.log(req.user);
    
    req.next();
  } else {
    req.next();    
  }
  
};

app.use(verifyuser);


//Index Placeholder
app.get('/', function (req, res) {
res.send('Hello World!, This is a backend for  BCC Drop');
});

/*
app.use('/graphql',cors(), GraphHTTP({
  schema: Schema,
  pretty: true,
  graphiql: true,
  context: {
    SECRET,
    user: req.user,    
  },
}));
*/


// GraphQL
app.use('/graphql',cors(), GraphHTTP(req => ({
    schema: Schema,
    pretty: true,
    graphiql: true,
    context: {
      SECRET,
      user: req.user,
    },
  })),
);

//File Upload
app.post('/uploadfile', upload.any(), function(req, res, next) {
  console.log(req.body, 'Body');
  console.log(req.files, 'files');
  
  let file_url =  req.files[0].path;
  var data = fs.createReadStream(__dirname + "/"+ file_url);

  //Clean tmp file when user exit app while uploading
  req.on('close', function (err){
    fs.unlinkSync(__dirname + "/"+ file_url);    
  });

  var config = {
      headers: {
        'Authorization': 'Bearer _6nPyBosMEYAAAAAAAAP_shKs91GXTBzUyvldWcU7V7t6W85xeXJeSAi3-kzo78a',
        'Dropbox-API-Arg': `{"path": "/bccdrop/${req.files[0].originalname}","mode": "add","autorename": true,"mute": false}`,
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
    
    
});

// App Listenls
app.listen(APP_PORT, () => {
  console.log(`App listening on port ${APP_PORT}`);
});
