import Express from 'express';
import GraphHTTP from 'express-graphql';
import Schema from './graphql_connector';

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
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
  });
  //Index Placeholder
  app.get('/', function (req, res) {
  res.send('Hello World!, This is a backend for IF16 Voting APP');
  });

// GraphQL
app.use('/graphql', GraphHTTP({
  schema: Schema,
  pretty: true,
  graphiql: true,
  context: {
    SECRET,
  },
}));

// App Listen
app.listen(APP_PORT, () => {
  console.log(`App listening on port ${APP_PORT}`);
});
