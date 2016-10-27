'use strict';

module.exports = {
	ensureAuthenticated: function(req, res, next) {
	    var err;
	    if (req.isAuthenticated()) {
	        next();
	    } else {
	        err = new Error('You must be logged in.');
	        err.status = 401;
	        next(err);
	    }
	},

	ensureAdmin: function(req, res, next) {
	    var err;
	    if (req.user.type === "Admin") {
	        next();
	    } else {
	        err = new Error("Permission denied");
	        err.status = 401;
	        next(err);
	    }
	}
}