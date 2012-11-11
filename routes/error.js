
/*
 * GET 404.
 */

exports.get404 = function(req, res){
  res.status(404).render('./../views/errors/404', { title: '404 Page Not Found' });
};

/*
 * GET 500
 */

exports.get500 = function(req, res){
  res.status(500).render('./../views/errors/404', { title: '500 Application Error' });
};