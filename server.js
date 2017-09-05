import Express from 'express';
import GraphHTTP from 'express-graphql';
import Schema from './graphql_connector';
import jwt from 'jsonwebtoken';
const cors = require('cors');

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

// App Listen
app.listen(APP_PORT, () => {
  console.log(`App listening on port ${APP_PORT}`);
});
