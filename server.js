import Express from 'express';
import GraphHTTP from 'express-graphql';
import Schema from './graphql_connector';

// Config
const APP_PORT = 3000;

// Start
const app = Express();

// GraphQL
app.use('/graphql', GraphHTTP({
  schema: Schema,
  pretty: true,
  graphiql: true,
}));

//App Listen
app.listen(APP_PORT, ()=> {
  console.log(`App listening on port ${APP_PORT}`);
});