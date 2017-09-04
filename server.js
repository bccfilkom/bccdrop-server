import Express from 'express';
import GraphHTTP from 'express-graphql';
import Schema from './graphql_connector';

// Config
const APP_PORT = 3000;

// Start
const app = Express();

const SECRET = 'aslkdjlkaj10830912039jlkoaiuwerasdjflkasd';


// GraphQL
app.use('/graphql', GraphHTTP({
  schema: Schema,
  pretty: true,
  graphiql: true,
  context: {
    SECRET,    
  },
}));

//App Listen
app.listen(APP_PORT, ()=> {
  console.log(`App listening on port ${APP_PORT}`);
});