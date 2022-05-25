const passport = require('passport');

module.exports.auth = (req, res, next) => {
     passport.authenticate("jwt", { session: false }, (err, user) => {
        if (!user || err) {
            return res.status(401).json({
                code: 401,
                message: "Unauthorized",
            });
        }
        
        req.user = user;
        next();
    })(req, res, next);
};