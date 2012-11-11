
/*
 * GET home page.
 */

exports.index = function(req, res) {
  error_msg = req.session.error;
  req.session.error = '';
  res.render('index', { title: 'Poll App!', error: error_msg });
};