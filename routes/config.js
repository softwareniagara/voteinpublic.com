var fs = require('fs')
  , extend = require('xtend');

exports.kml = function(req, res) {

  files = exports.getKmlProjects()
  
  res.status = '200';
  res.setHeader('Content-Type', 'application/json');
  res.send(files);
}

exports.get = function(req, res) {
	
  switch (req.param.id) {
    case "kml":
	  config = { kml: exports.getKmlProjects() };
	  break;
    
    case "config":
      config = { main: exports.getConfig()};

    
    default:
	  config = { kml: exports.getKmlProjects(), main: exports.getConfig()};
	  
  }
  
/*  fs.readFile('', function (err, data) {
  	if (err) throw err;
  	console.log(data);
  });
  */
  
  var Proj4js = require("proj4js"),

	  //Proj4js.defs["SR-ORG:6864"] = "+proj=merc +lon_0=0 +k=1 +x_0=0 +y_0=0 +a=6378137 +b=6378137 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs";
  proj = new Proj4js.Proj("EPSG:900913");
  
		  
  coord = Proj4js.transform(Proj4js.WGS84, proj, new Proj4js.Point([config.main.map.center.lat, config.main.map.center.lon]));

  config.main.map.center.lat = coord.x;
  config.main.map.center.lon = coord.y;

  
  
  res.status = '200';
  res.setHeader('Content-Type', 'application/json');
  res.send(config);
	  
	
	
}

exports.getConfig = function(file) {

  if (file == null) file = "main";
  
  return JSON.parse(fs.readFileSync('config/'+file+".json", "utf8"));

}


exports.getKmlProjects = function() {

  var projects = fs.readdirSync('./public/kml/')
    , files = null
    , buffer = {};
  
  projects = projects.filter(function(f) {
    if (f.indexOf('.') != 0) {
      return f;
    }
  });
  
  
  projects = projects.filter(function(m) {
    files = fs.readdirSync('./public/kml/'+m);
    
    files.filter(function(k) {
      if (k.indexOf('.kml') != 0) {
        return k; 
      }    
    });
	
	var t = {};
	t[m] = files;
    buffer =  extend(buffer, t);
	  
  })

  return buffer;  	
}