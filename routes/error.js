
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
  	title: 'You have opted not to share your location', 
  	message: 'As a result your vote will not be counted. If you want your vote to count please go back and allow sharing of your location.' 
  });
};

/*
 * GET failed_location
 */
exports.failed_location = function(req, res){
  res.render('./../views/shared/messages', { 
  	title: 'Error getting your location', 
  	message: 'Unable to find your location. Your vote will not be continued unless your location can be determined.'
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

/*
 * GET vote_failed
 */
exports.vote_failed = function(req, res){
  res.render('./../views/shared/messages', { 
  	title: 'Vote failed to be cast', 
  	message: 'An unknown error has occured that prevented your vote from being cast. Please try again and ensure that your location is being shared.' 
  });
};