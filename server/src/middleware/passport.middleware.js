/**
 * Authentication middleware
 */
 import passport from 'passport';
 import passportJWT from 'passport-jwt';
 import dotenv from 'dotenv';
 
 // init dotenv library
 dotenv.config();
 
 // settings
 const JwtStrategy = passportJWT.Strategy;
 const ExtractJwt = passportJWT.ExtractJwt;
 
 // setting the jwt options
 const jwtOptions = {
	 jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	 secretOrKey: process.env.JWT_SECRET_KEY,
 };
 
 // configuring passport jwt
 passport.use(new JwtStrategy(jwtOptions, (jwtData, done) => {
	 try {
		 console.log(`${jwtData.username} is doing a JWT request!`);
		 return done(null, jwtData.username);
	 } catch (error) {
		 return done(null, error);
	 }
 }));
 
 export default (req, res, next) => {
	// don't require authentication when using GET
	if (req.method === 'GET') {
    next();
    return false;
  } else {
	// authenticate the user
	passport.authenticate('jwt', { session: false }, (error, user, info) => {
		if (error || !user) {
			res.status(401).json(info);
		} else {
			next();
		}
		 })(req, res, next);
	};
}
 