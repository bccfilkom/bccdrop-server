import Express from 'express';
import GraphHTTP from 'express-graphql';
import Schema from './graphql_connector';
const cors = require('cors');

// Config
const APP_PORT = 6321;

// Start
const app = Express();

const SECRET = 'aslkdjlkaj10830912039jlkoaiuwerasdjflkasd';




  //Index Placeholder
  app.get('/', function (req, res) {
  res.send('Hello World!, This is a backend for IF16 Voting APP');
  });

// GraphQL
app.use('/graphql',cors(), GraphHTTP({
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
