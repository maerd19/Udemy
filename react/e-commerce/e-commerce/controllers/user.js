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

// See user profile
exports.read = (req, res) => {
    // We can easily grab the user info 'cause userById runs every time there is a user as parameter in URI

    // password and salt are not ment to be sent in response
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.status(200).json(req.profile);
};

exports.update = (req, res) => {
    // We find the user by id and the info coming from the request body will be the new values
    User.findOneAndUpdate(
        { _id: req.profile._id },
        { $set: req.body },
        // When true the newly updated records will be sent to the front-end
        { new: true },
        (err, user) => {
            if (err) {
                return res.status(400).json({
                    error: "You are not authorized to perform this action"
                });
            }
            // password and salt are not ment to be sent in response
            user.hashed_password = undefined;
            user.salt = undefined;
            res.status(200).json(user);
        }
    );
};
