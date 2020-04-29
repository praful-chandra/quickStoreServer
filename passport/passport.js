const passport  = require('passport');
const OAuth = require("passport-google-oauth20").Strategy;

passport.use(new OAuth({
    clientID : process.env.GClientID,
    clientSecret: process.env.GClientSecret,
    callbackURL:"/api/auth/user/googleOAuthCallback",
    proxy:true
},
(accessToken,refreshToken,profile,done)=>{

    return done(null,profile);
}
    ));


    // Used to stuff a piece of information into a cookie
passport.serializeUser((user, done) => {
    done(null, user);
});

// Used to decode the received cookie and persist session
passport.deserializeUser((user, done) => {
    done(null, user);
});
module.exports = passport;



