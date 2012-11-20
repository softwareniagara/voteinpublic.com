goog.require('ol.Attribution');
goog.require('ol.BingMapsStyle');
goog.require('ol.Collection');
goog.require('ol.Coordinate');
goog.require('ol.Extent');
goog.require('ol.Map');
goog.require('ol.MapBrowserEvent');
goog.require('ol.Object');
goog.require('ol.Projection');
goog.require('ol.ProjectionUnits');
goog.require('ol.RendererHint');
goog.require('ol.control.Attribution');
goog.require('ol.control.MousePosition');
goog.require('ol.control.Zoom');
goog.require('ol.interaction.Keyboard');
goog.require('ol.layer.TileLayer');
goog.require('ol.overlay.Overlay');
goog.require('ol.source.BingMaps');
goog.require('ol.source.MapQuestOSM');
goog.require('ol.source.MapQuestOpenAerial');
goog.require('ol.source.OpenStreetMap');
goog.require('ol.source.Stamen');
goog.require('ol.source.TileJSON');
goog.require('ol.source.TiledWMS');


goog.exportSymbol(
    'goog.require',
    goog.nullFunction);


goog.exportSymbol(
    'ol.Attribution',
    ol.Attribution);


goog.exportSymbol(
    'ol.BingMapsStyle',
    ol.BingMapsStyle);
goog.exportProperty(
    ol.BingMapsStyle,
    'AERIAL',
    ol.BingMapsStyle.AERIAL);
goog.exportProperty(
    ol.BingMapsStyle,
    'AERIAL_WITH_LABELS',
    ol.BingMapsStyle.AERIAL_WITH_LABELS);
goog.exportProperty(
    ol.BingMapsStyle,
    'COLLINS_BART',
    ol.BingMapsStyle.COLLINS_BART);
goog.exportProperty(
    ol.BingMapsStyle,
    'ORDNANCE_SURVEY',
    ol.BingMapsStyle.ORDNANCE_SURVEY);
goog.exportProperty(
    ol.BingMapsStyle,
    'ROAD',
    ol.BingMapsStyle.ROAD);


goog.exportSymbol(
    'ol.Collection',
    ol.Collection);
goog.exportProperty(
    ol.Collection.prototype,
    'clear',
    ol.Collection.prototype.clear);
goog.exportProperty(
    ol.Collection.prototype,
    'forEach',
    ol.Collection.prototype.forEach);
goog.exportProperty(
    ol.Collection.prototype,
    'getArray',
    ol.Collection.prototype.getArray);
goog.exportProperty(
    ol.Collection.prototype,
    'getAt',
    ol.Collection.prototype.getAt);
goog.exportProperty(
    ol.Collection.prototype,
    'getLength',
    ol.Collection.prototype.getLength);
goog.exportProperty(
    ol.Collection.prototype,
    'insertAt',
    ol.Collection.prototype.insertAt);
goog.exportProperty(
    ol.Collection.prototype,
    'pop',
    ol.Collection.prototype.pop);
goog.exportProperty(
    ol.Collection.prototype,
    'push',
    ol.Collection.prototype.push);
goog.exportProperty(
    ol.Collection.prototype,
    'removeAt',
    ol.Collection.prototype.removeAt);
goog.exportProperty(
    ol.Collection.prototype,
    'setAt',
    ol.Collection.prototype.setAt);


goog.exportSymbol(
    'ol.Coordinate',
    ol.Coordinate);
goog.exportProperty(
    ol.Coordinate,
    'toStringHDMS',
    ol.Coordinate.toStringHDMS);


goog.exportSymbol(
    'ol.Extent',
    ol.Extent);



/**
 * @constructor
 * @extends {ol.Map}
 * @param {olx.MapOptionsExtern} options Options.
 */
ol.MapExport = function(options) {
  goog.base(this, {
    center: options.center,
    controls: options.controls,
    doubleClickZoom: options.doubleClickZoom,
    dragPan: options.dragPan,
    interactions: options.interactions,
    keyboard: options.keyboard,
    keyboardPanOffset: options.keyboardPanOffset,
    layers: options.layers,
    maxResolution: options.maxResolution,
    mouseWheelZoom: options.mouseWheelZoom,
    mouseWheelZoomDelta: options.mouseWheelZoomDelta,
    numZoomLevels: options.numZoomLevels,
    projection: options.projection,
    renderer: options.renderer,
    renderers: options.renderers,
    resolution: options.resolution,
    resolutions: options.resolutions,
    rotate: options.rotate,
    shiftDragZoom: options.shiftDragZoom,
    target: options.target,
    userProjection: options.userProjection,
    zoom: options.zoom,
    zoomDelta: options.zoomDelta,
    zoomFactor: options.zoomFactor
  });
};
goog.inherits(ol.MapExport, ol.Map);
goog.exportSymbol(
    'ol.Map',
    ol.MapExport);
goog.exportProperty(
    ol.Map.prototype,
    'getControls',
    ol.Map.prototype.getControls);
goog.exportProperty(
    ol.Map.prototype,
    'getInteractions',
    ol.Map.prototype.getInteractions);
goog.exportProperty(
    ol.MapBrowserEvent.prototype,
    'getCoordinate',
    ol.MapBrowserEvent.prototype.getCoordinate);


goog.exportSymbol(
    'ol.Object',
    ol.Object);
goog.exportProperty(
    ol.Object.prototype,
    'bindTo',
    ol.Object.prototype.bindTo);
goog.exportProperty(
    ol.Object.prototype,
    'changed',
    ol.Object.prototype.changed);
goog.exportProperty(
    ol.Object.prototype,
    'get',
    ol.Object.prototype.get);
goog.exportProperty(
    ol.Object.prototype,
    'notify',
    ol.Object.prototype.notify);
goog.exportProperty(
    ol.Object.prototype,
    'set',
    ol.Object.prototype.set);
goog.exportProperty(
    ol.Object.prototype,
    'setOptions',
    ol.Object.prototype.setOptions);
goog.exportProperty(
    ol.Object.prototype,
    'setValues',
    ol.Object.prototype.setValues);
goog.exportProperty(
    ol.Object.prototype,
    'unbind',
    ol.Object.prototype.unbind);
goog.exportProperty(
    ol.Object.prototype,
    'unbindAll',
    ol.Object.prototype.unbindAll);


goog.exportSymbol(
    'ol.Projection',
    ol.Projection);
goog.exportProperty(
    ol.Projection,
    'addProjection',
    ol.Projection.addProjection);
goog.exportProperty(
    ol.Projection,
    'getFromCode',
    ol.Projection.getFromCode);
goog.exportProperty(
    ol.Projection,
    'getTransform',
    ol.Projection.getTransform);
goog.exportProperty(
    ol.Projection,
    'getTransformFromCodes',
    ol.Projection.getTransformFromCodes);
goog.exportProperty(
    ol.Projection,
    'transform',
    ol.Projection.transform);
goog.exportProperty(
    ol.Projection,
    'transformWithCodes',
    ol.Projection.transformWithCodes);
goog.exportProperty(
    ol.Projection.prototype,
    'getCode',
    ol.Projection.prototype.getCode);
goog.exportProperty(
    ol.Projection.prototype,
    'getExtent',
    ol.Projection.prototype.getExtent);
goog.exportProperty(
    ol.Projection.prototype,
    'getUnits',
    ol.Projection.prototype.getUnits);


goog.exportSymbol(
    'ol.ProjectionUnits',
    ol.ProjectionUnits);
goog.exportProperty(
    ol.ProjectionUnits,
    'DEGREES',
    ol.ProjectionUnits.DEGREES);
goog.exportProperty(
    ol.ProjectionUnits,
    'METERS',
    ol.ProjectionUnits.METERS);


goog.exportSymbol(
    'ol.RendererHint',
    ol.RendererHint);
goog.exportProperty(
    ol.RendererHint,
    'DOM',
    ol.RendererHint.DOM);
goog.exportProperty(
    ol.RendererHint,
    'WEBGL',
    ol.RendererHint.WEBGL);



/**
 * @constructor
 * @extends {ol.control.Attribution}
 * @param {olx.control.AttributionOptionsExtern} options Options.
 */
ol.control.AttributionExport = function(options) {
  goog.base(this, {
    map: options.map,
    target: options.target
  });
};
goog.inherits(ol.control.AttributionExport, ol.control.Attribution);
goog.exportSymbol(
    'ol.control.Attribution',
    ol.control.AttributionExport);



/**
 * @constructor
 * @extends {ol.control.MousePosition}
 * @param {olx.control.MousePositionOptionsExtern} options Options.
 */
ol.control.MousePositionExport = function(options) {
  goog.base(this, {
    coordinateFormat: options.coordinateFormat,
    map: options.map,
    projection: options.projection,
    target: options.target,
    undefinedHtml: options.undefinedHtml
  });
};
goog.inherits(ol.control.MousePositionExport, ol.control.MousePosition);
goog.exportSymbol(
    'ol.control.MousePosition',
    ol.control.MousePositionExport);



/**
 * @constructor
 * @extends {ol.control.Zoom}
 * @param {olx.control.ZoomOptionsExtern} options Options.
 */
ol.control.ZoomExport = function(options) {
  goog.base(this, {
    delta: options.delta,
    map: options.map,
    target: options.target
  });
};
goog.inherits(ol.control.ZoomExport, ol.control.Zoom);
goog.exportSymbol(
    'ol.control.Zoom',
    ol.control.ZoomExport);


goog.exportSymbol(
    'ol.interaction.Keyboard',
    ol.interaction.Keyboard);
goog.exportProperty(
    ol.interaction.Keyboard.prototype,
    'addCallback',
    ol.interaction.Keyboard.prototype.addCallback);



/**
 * @constructor
 * @extends {ol.layer.TileLayer}
 * @param {olx.layer.LayerOptionsExtern} options Options.
 */
ol.layer.TileLayerExport = function(options) {
  goog.base(this, {
    brightness: options.brightness,
    contrast: options.contrast,
    hue: options.hue,
    opacity: options.opacity,
    saturation: options.saturation,
    source: options.source,
    visible: options.visible
  });
};
goog.inherits(ol.layer.TileLayerExport, ol.layer.TileLayer);
goog.exportSymbol(
    'ol.layer.TileLayer',
    ol.layer.TileLayerExport);



/**
 * @constructor
 * @extends {ol.overlay.Overlay}
 * @param {olx.overlay.OverlayOptionsExtern} options Options.
 */
ol.overlay.OverlayExport = function(options) {
  goog.base(this, {
    coordinate: options.coordinate,
    element: options.element,
    map: options.map,
    positioning: options.positioning
  });
};
goog.inherits(ol.overlay.OverlayExport, ol.overlay.Overlay);
goog.exportSymbol(
    'ol.overlay.Overlay',
    ol.overlay.OverlayExport);
goog.exportProperty(
    ol.overlay.Overlay.prototype,
    'getElement',
    ol.overlay.Overlay.prototype.getElement);
goog.exportProperty(
    ol.overlay.Overlay.prototype,
    'setCoordinate',
    ol.overlay.Overlay.prototype.setCoordinate);
goog.exportProperty(
    ol.overlay.Overlay.prototype,
    'setMap',
    ol.overlay.Overlay.prototype.setMap);


goog.exportSymbol(
    'ol.source.BingMaps',
    ol.source.BingMaps);


goog.exportSymbol(
    'ol.source.MapQuestOSM',
    ol.source.MapQuestOSM);


goog.exportSymbol(
    'ol.source.MapQuestOpenAerial',
    ol.source.MapQuestOpenAerial);


goog.exportSymbol(
    'ol.source.OpenStreetMap',
    ol.source.OpenStreetMap);


goog.exportSymbol(
    'ol.source.Stamen',
    ol.source.Stamen);


goog.exportSymbol(
    'ol.source.TileJSON',
    ol.source.TileJSON);


goog.exportSymbol(
    'ol.source.TiledWMS',
    ol.source.TiledWMS);
