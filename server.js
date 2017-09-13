import Express from 'express';
import GraphHTTP from 'express-graphql';
import Schema from './graphql_connector';
import jwt from 'jsonwebtoken';

const path = require('path');
const multer  = require('multer');
const cors = require('cors');
const engine = require('./engine');
var upload = multer({ dest: 'tmp/' })

// Config
const APP_PORT = 6321;

// Start
const app = Express();

const SECRET = 'aslkdjlkaj10830912039jlkoaiuwerasdjflkasd';

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'authorization,content-type');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
  });

  
app.use(Express.static('public'))
  
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
app.post('/uploadfile',cors(), upload.any(), engine.upload);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});
// App Listenls
app.listen(APP_PORT, () => {
  console.log(`App listening on port ${APP_PORT}`);
});
