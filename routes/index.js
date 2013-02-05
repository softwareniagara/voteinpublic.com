
/*
 * GET home page.
 */

exports.index = function(req, res) {
  error_msg = req.session.error;
  req.session.error = '';
  res.render('index', { title: 'Ask a Question | Vote in Public', nav: 'home', error: error_msg });
};