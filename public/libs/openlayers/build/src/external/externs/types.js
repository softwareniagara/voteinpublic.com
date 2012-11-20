/**
 * @externs
 */


/**
 * @type {Object}
 */
var olx;


/**
 * @type {Object}
 */
olx.control = {};


/**
 * @type {Object}
 */
olx.layer = {};


/**
 * @type {Object}
 */
olx.overlay = {};


/**
 * @type {Object}
 */
olx.source = {};



/**
 * @interface
 */
olx.MapOptionsExtern = function() {};


/**
 * @type {ol.Coordinate|undefined}
 */
olx.MapOptionsExtern.prototype.center;


/**
 * @type {ol.Collection|undefined}
 */
olx.MapOptionsExtern.prototype.controls;


/**
 * @type {boolean|undefined}
 */
olx.MapOptionsExtern.prototype.doubleClickZoom;


/**
 * @type {boolean|undefined}
 */
olx.MapOptionsExtern.prototype.dragPan;


/**
 * @type {ol.Collection|undefined}
 */
olx.MapOptionsExtern.prototype.interactions;


/**
 * @type {boolean|undefined}
 */
olx.MapOptionsExtern.prototype.keyboard;


/**
 * @type {number|undefined}
 */
olx.MapOptionsExtern.prototype.keyboardPanOffset;


/**
 * @type {ol.Collection|undefined}
 */
olx.MapOptionsExtern.prototype.layers;


/**
 * @type {number|undefined}
 */
olx.MapOptionsExtern.prototype.maxResolution;


/**
 * @type {boolean|undefined}
 */
olx.MapOptionsExtern.prototype.mouseWheelZoom;


/**
 * @type {number|undefined}
 */
olx.MapOptionsExtern.prototype.mouseWheelZoomDelta;


/**
 * @type {number|undefined}
 */
olx.MapOptionsExtern.prototype.numZoomLevels;


/**
 * @type {ol.Projection|string|undefined}
 */
olx.MapOptionsExtern.prototype.projection;


/**
 * @type {ol.RendererHint|undefined}
 */
olx.MapOptionsExtern.prototype.renderer;


/**
 * @type {Array.<ol.RendererHint>|undefined}
 */
olx.MapOptionsExtern.prototype.renderers;


/**
 * @type {number|undefined}
 */
olx.MapOptionsExtern.prototype.resolution;


/**
 * @type {Array.<number>|undefined}
 */
olx.MapOptionsExtern.prototype.resolutions;


/**
 * @type {boolean|undefined}
 */
olx.MapOptionsExtern.prototype.rotate;


/**
 * @type {boolean|undefined}
 */
olx.MapOptionsExtern.prototype.shiftDragZoom;


/**
 * @type {Element|string}
 */
olx.MapOptionsExtern.prototype.target;


/**
 * @type {ol.Projection|string|undefined}
 */
olx.MapOptionsExtern.prototype.userProjection;


/**
 * @type {number|undefined}
 */
olx.MapOptionsExtern.prototype.zoom;


/**
 * @type {number|undefined}
 */
olx.MapOptionsExtern.prototype.zoomDelta;


/**
 * @type {number|undefined}
 */
olx.MapOptionsExtern.prototype.zoomFactor;



/**
 * @interface
 */
olx.control.AttributionOptionsExtern = function() {};


/**
 * @type {ol.Map|undefined}
 */
olx.control.AttributionOptionsExtern.prototype.map;


/**
 * @type {Element|undefined}
 */
olx.control.AttributionOptionsExtern.prototype.target;



/**
 * @interface
 */
olx.control.MousePositionOptionsExtern = function() {};


/**
 * @type {ol.CoordinateFormatType|undefined}
 */
olx.control.MousePositionOptionsExtern.prototype.coordinateFormat;


/**
 * @type {ol.Map|undefined}
 */
olx.control.MousePositionOptionsExtern.prototype.map;


/**
 * @type {ol.Projection|undefined}
 */
olx.control.MousePositionOptionsExtern.prototype.projection;


/**
 * @type {Element|undefined}
 */
olx.control.MousePositionOptionsExtern.prototype.target;


/**
 * @type {string|undefined}
 */
olx.control.MousePositionOptionsExtern.prototype.undefinedHtml;



/**
 * @interface
 */
olx.control.ZoomOptionsExtern = function() {};


/**
 * @type {number|undefined}
 */
olx.control.ZoomOptionsExtern.prototype.delta;


/**
 * @type {ol.Map|undefined}
 */
olx.control.ZoomOptionsExtern.prototype.map;


/**
 * @type {Element|undefined}
 */
olx.control.ZoomOptionsExtern.prototype.target;



/**
 * @interface
 */
olx.layer.LayerOptionsExtern = function() {};


/**
 * @type {number|undefined}
 */
olx.layer.LayerOptionsExtern.prototype.brightness;


/**
 * @type {number|undefined}
 */
olx.layer.LayerOptionsExtern.prototype.contrast;


/**
 * @type {number|undefined}
 */
olx.layer.LayerOptionsExtern.prototype.hue;


/**
 * @type {number|undefined}
 */
olx.layer.LayerOptionsExtern.prototype.opacity;


/**
 * @type {number|undefined}
 */
olx.layer.LayerOptionsExtern.prototype.saturation;


/**
 * @type {ol.source.Source}
 */
olx.layer.LayerOptionsExtern.prototype.source;


/**
 * @type {boolean|undefined}
 */
olx.layer.LayerOptionsExtern.prototype.visible;



/**
 * @interface
 */
olx.overlay.OverlayOptionsExtern = function() {};


/**
 * @type {ol.Coordinate|undefined}
 */
olx.overlay.OverlayOptionsExtern.prototype.coordinate;


/**
 * @type {Element|undefined}
 */
olx.overlay.OverlayOptionsExtern.prototype.element;


/**
 * @type {ol.Map|undefined}
 */
olx.overlay.OverlayOptionsExtern.prototype.map;


/**
 * @type {Array.<string>|undefined}
 */
olx.overlay.OverlayOptionsExtern.prototype.positioning;



/**
 * @interface
 */
olx.source.BingMapsOptionsExtern = function() {};


/**
 * @type {string|undefined}
 */
olx.source.BingMapsOptionsExtern.prototype.culture;


/**
 * @type {string}
 */
olx.source.BingMapsOptionsExtern.prototype.key;


/**
 * @type {ol.BingMapsStyle}
 */
olx.source.BingMapsOptionsExtern.prototype.style;



/**
 * @interface
 */
olx.source.TiledWMSOptionsExtern = function() {};


/**
 * @type {Array.<ol.Attribution>|undefined}
 */
olx.source.TiledWMSOptionsExtern.prototype.attributions;


/**
 * @type {null|string|undefined}
 */
olx.source.TiledWMSOptionsExtern.prototype.crossOrigin;


/**
 * @type {ol.Extent|undefined}
 */
olx.source.TiledWMSOptionsExtern.prototype.extent;


/**
 * @type {number|undefined}
 */
olx.source.TiledWMSOptionsExtern.prototype.maxZoom;


/**
 * @type {Object}
 */
olx.source.TiledWMSOptionsExtern.prototype.params;


/**
 * @type {ol.Projection|undefined}
 */
olx.source.TiledWMSOptionsExtern.prototype.projection;


/**
 * @type {ol.tilegrid.TileGrid|undefined}
 */
olx.source.TiledWMSOptionsExtern.prototype.tileGrid;


/**
 * @type {string|undefined}
 */
olx.source.TiledWMSOptionsExtern.prototype.url;


/**
 * @type {Array.<string>|undefined}
 */
olx.source.TiledWMSOptionsExtern.prototype.urls;


/**
 * @type {string|undefined}
 */
olx.source.TiledWMSOptionsExtern.prototype.version;
