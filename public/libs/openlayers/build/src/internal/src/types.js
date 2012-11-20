goog.provide('ol.MapOptionsType');
goog.provide('ol.control.AttributionOptionsType');
goog.provide('ol.control.MousePositionOptionsType');
goog.provide('ol.control.ZoomOptionsType');
goog.provide('ol.layer.LayerOptionsType');
goog.provide('ol.overlay.OverlayOptionsType');
goog.provide('ol.source.BingMapsOptionsType');
goog.provide('ol.source.TiledWMSOptionsType');


/**
 * @typedef {{center: (ol.Coordinate|undefined),
 *            controls: (ol.Collection|undefined),
 *            doubleClickZoom: (boolean|undefined),
 *            dragPan: (boolean|undefined),
 *            interactions: (ol.Collection|undefined),
 *            keyboard: (boolean|undefined),
 *            keyboardPanOffset: (number|undefined),
 *            layers: (ol.Collection|undefined),
 *            maxResolution: (number|undefined),
 *            mouseWheelZoom: (boolean|undefined),
 *            mouseWheelZoomDelta: (number|undefined),
 *            numZoomLevels: (number|undefined),
 *            projection: (ol.Projection|string|undefined),
 *            renderer: (ol.RendererHint|undefined),
 *            renderers: (Array.<ol.RendererHint>|undefined),
 *            resolution: (number|undefined),
 *            resolutions: (Array.<number>|undefined),
 *            rotate: (boolean|undefined),
 *            shiftDragZoom: (boolean|undefined),
 *            target: (Element|string),
 *            userProjection: (ol.Projection|string|undefined),
 *            zoom: (number|undefined),
 *            zoomDelta: (number|undefined),
 *            zoomFactor: (number|undefined)}}
 */
ol.MapOptions;


/**
 * @typedef {{map: (ol.Map|undefined),
 *            target: (Element|undefined)}}
 */
ol.control.AttributionOptions;


/**
 * @typedef {{coordinateFormat: (ol.CoordinateFormatType|undefined),
 *            map: (ol.Map|undefined),
 *            projection: (ol.Projection|undefined),
 *            target: (Element|undefined),
 *            undefinedHtml: (string|undefined)}}
 */
ol.control.MousePositionOptions;


/**
 * @typedef {{delta: (number|undefined),
 *            map: (ol.Map|undefined),
 *            target: (Element|undefined)}}
 */
ol.control.ZoomOptions;


/**
 * @typedef {{brightness: (number|undefined),
 *            contrast: (number|undefined),
 *            hue: (number|undefined),
 *            opacity: (number|undefined),
 *            saturation: (number|undefined),
 *            source: ol.source.Source,
 *            visible: (boolean|undefined)}}
 */
ol.layer.LayerOptions;


/**
 * @typedef {{coordinate: (ol.Coordinate|undefined),
 *            element: (Element|undefined),
 *            map: (ol.Map|undefined),
 *            positioning: (Array.<string>|undefined)}}
 */
ol.overlay.OverlayOptions;


/**
 * @typedef {{culture: (string|undefined),
 *            key: string,
 *            style: ol.BingMapsStyle}}
 */
ol.source.BingMapsOptions;


/**
 * @typedef {{attributions: (Array.<ol.Attribution>|undefined),
 *            crossOrigin: (null|string|undefined),
 *            extent: (ol.Extent|undefined),
 *            maxZoom: (number|undefined),
 *            params: Object,
 *            projection: (ol.Projection|undefined),
 *            tileGrid: (ol.tilegrid.TileGrid|undefined),
 *            url: (string|undefined),
 *            urls: (Array.<string>|undefined),
 *            version: (string|undefined)}}
 */
ol.source.TiledWMSOptions;
