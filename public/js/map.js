var map;
var config;
var layer;
var vienna;
var popup;


var loadConfig = function () {
	
	$.ajax('/config/all', {
		success: function(data) {
			config = data;
		
			init();
		}
	});
	
}

var init = function init() {

	goog.require('goog.debug.Console');
	goog.require('goog.debug.Logger');
	goog.require('goog.debug.Logger.Level');
	goog.require('ol.Collection');
	goog.require('ol.Coordinate');
	goog.require('ol.Map');
	goog.require('ol.overlay.Overlay');
	goog.require('ol.source.MapQuestOpenAerial');
	
	
	if (goog.DEBUG) {
	  goog.debug.Console.autoInstall();
	  goog.debug.Logger.getLogger('ol').setLevel(goog.debug.Logger.Level.INFO);
	}
	
	
	layer = new ol.layer.TileLayer({
	  source: new ol.source.OpenStreetMap("OSM", {"sphericalMercator": true})
	});

	map = new ol.Map({
	  
	  center: new ol.Coordinate(config.main.map.center.lat, config.main.map.center.lon),
	  layers: new ol.Collection([layer]),
	  target: 'map',
	  zoom: 10
	});
	
	map.setProjection(new ol.Projection("EPSG:3857"));
	//alert();
	//proj = ol.Projection.transformWithCodes(new ol.Coordinate(43.059858, -79.288559), 'EPSG:4326', map.getProjection().getCode());
	//map.setCenter(new ol.Coordinate(5000, 5000));

	
	// Vienna label
	vienna = new ol.overlay.Overlay({
	  map: map,
	  coordinate: ol.Projection.transformWithCodes(
	      new ol.Coordinate(43.059858, -79.288559), 'EPSG:4326', 'EPSG:3857'),
	  element: document.getElementById('vienna')
	});
	
	// Popup showing the position the user clicked
	popup = new ol.overlay.Overlay({
	  map: map,
	  element: document.getElementById('popup')
	});
	
	
	map.addEventListener('click', function(evt) {
	  var coordinate = evt.getCoordinate();
	  
	  coord = ol.Projection.transformWithCodes(
	          coordinate, 'EPSG:3857', 'EPSG:4326');
	  
	  popup.getElement().innerHTML =
	      'Welcome to ol3. The location you clicked was<br>' + coordinate.x + ', ' +
        coordinate.y;
	  popup.setCoordinate(coordinate);
	});


}

	

$(document).ready(function() {
	loadConfig();
});
