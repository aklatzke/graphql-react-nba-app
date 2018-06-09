import express from 'express';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
import router from './routes';
import graphqlHTTP from 'express-graphql';
import rootSchema from './schemas/players';
import db from './db';

db;

const app = express();
app.disable('x-powered-by');

// View engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

app.use("/graphql", graphqlHTTP({
  schema: rootSchema,
  graphiql: true
}))

app.use(logger('dev', {
  skip: () => app.get('env') === 'test'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
 
app.use(router);
app.use(express.static(path.join(__dirname, '../public')));

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// Error handler
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  res
    .status(err.status || 500)
    .render('error', {
      message: err.message
    });
});

export default app;
