/**
 * Main app
 */
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import http from 'http';
import swaggerUi from 'swagger-ui-express';

import { EnvironmentVariables } from './config';
import { morganMiddleware, swaggerSpec } from './middleware';
import authMiddleware from './middleware/passport.middleware';
import apiRoutes from './api/routes';
import auth from './auth';

/*
Database
*/
import database from './database';

database.connect();

/*
Create Express app
*/
const app = express();

/*
bodyParser
*/
app.use(
	bodyParser.urlencoded({
		extended: true,
	}),
);
app.use(bodyParser.json());

/*
Morgan
*/
if (EnvironmentVariables.NODE_ENV === 'development') {
	app.use(morganMiddleware);
}

/*
API Routes
*/
// Use the API routes WITHOUT authentication middleware (JWT strategy)
// app.use('/api', cors(), apiRoutes);
// Use the API routes WITH authentication middleware (JWT strategy)
app.use('/api', authMiddleware, cors(), apiRoutes);

/*
Auth endpoints
*/
app.use('/auth', auth);

/*
Swagger
*/
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/*
Not Found routes
*/
app.get('*', (req, res, next) => {
	const err = new Error(`${req.ip} tried to access ${req.originalUrl}`);
	err.statusCode = 301;
	next(err);
});

/*
Error Handling
*/
app.use((err, req, res, next) => {
  const error = err;
  error.statusCode = error.statusCode || 500;
  res.status(error.statusCode);

  const body = {
    url: req.url,
    error: {
      message: error.message,
      statusCode: error.statusCode,
    },
  };

  if (req.accepts('json')) {
    res.json(body);
  } else if (req.accepts('html')) {
    res.render('error', body);
  } else {
    res.send('You have to accept application/json or text/html!');
  }
  next();
});

/*
Create the server
*/
const server = http.createServer(app);

/*
Server
Listen to incoming requests
*/
if (EnvironmentVariables.NODE_ENV !== 'test') {
	server.listen(EnvironmentVariables.PORT, EnvironmentVariables.HOSTNAME, (err) => {
		if (err) throw err;
		if (EnvironmentVariables.NODE_ENV === 'development') {
			console.log(`Server is listening at http://${EnvironmentVariables.HOSTNAME}:${EnvironmentVariables.PORT}!`);
		}
	});
}
