var fs = require('fs');

exports.getKMLFiles = function(req, res) {
  var dir = '/kml';
  var files = fs.readdirSync('./public'+dir);
  
  files = files.filter(function(f) {
    if (f.indexOf('.') != 0) {
      return f;
    }
  }).map(function(f) {
    return dir + '/' + f;
  });
  
  res.status = '200';
  res.setHeader('Content-Type', 'application/json');
  res.send(files);
}
