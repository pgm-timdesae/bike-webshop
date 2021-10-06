import morganMiddleware from './morgan.middleware';
import auth from './passport.middleware';
import swaggerSpec from './swagger.middleware';

// export { jwtStrategy, morganMiddleware, swaggerSpec };
export { auth, morganMiddleware, swaggerSpec };