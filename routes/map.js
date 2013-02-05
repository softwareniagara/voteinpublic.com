
/*
 * GET home page.
 */

exports.show = function(req, res){
  res.render('map/show', { title: 'Poll App!', nav: 'home' });
};
