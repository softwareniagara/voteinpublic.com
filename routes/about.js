

/*
 * GET home page.
 */

exports.index = function(req, res) {
  error_msg = req.session.error;
  req.session.error = '';
  res.render('about', { title: 'About | Vote in Public', nav: 'about', error: error_msg });
};