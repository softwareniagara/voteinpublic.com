
/*
 * GET 404.
 */
exports.get404 = function(req, res){
  res.status(404).render('./../views/shared/messages', { 
  	title: '404 Page Not Found',
  	message: 'The page your trying to access does not exist'
  });
};

/*
 * GET 500
 */
exports.get500 = function(req, res){
  res.status(500).render('./../views/shared/messages', { 
  	title: '500 Application Error',
  	message: 'An error has occurred that cannot be recovered.'
  });
};

/*
 * GET no_location
 */
exports.no_location = function(req, res){
  res.render('./../views/shared/messages', { 
  	title: 'Error getting Location', 
  	message: 'You must supply your location in order to vote' 
  });
};

/*
 * GET failed_location
 */
exports.failed_location = function(req, res){
  res.render('./../views/shared/messages', { 
  	title: 'Error getting Location', 
  	message: 'Unable to find your location.' 
  });
};

/*
 * GET already_voted
 */
exports.already_voted = function(req, res){
  res.render('./../views/shared/messages', { 
  	title: 'You already voted on this question', 
  	message: 'You are unable to vote on the same question more than once.' 
  });
};