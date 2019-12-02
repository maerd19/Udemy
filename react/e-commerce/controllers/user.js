const User = require('../models/user');

// This methos will look for the userID in the route parameter and anytime there is an userID in the road
// the method will run automatically and make the user available in the request object
exports.userById = (req, res, next, id) => {
    // The id will be comming from the route parameter
    User.findById(id).exec((err, user) => {
        if(err || !user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }
        // If user is found info will be added to request object with the name of profile 
        req.profile = user;
        // We use next because this is a middleware and execution needs this to flow
        next();
    })
}