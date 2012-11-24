// This plugin will add a question mark if there isn't one already present to the last
// character on one or more properties of the model.

var questionizer = function(schema, options) {
  var props = options.properties;

  if (props) {
    schema.pre('save', function(next) {
      for (var i = 0, max = props.length; i < max; i++) {
        var prop = props[i];

        if (typeof this[prop] === 'string' && this[prop].length > 0 && this[prop].slice(-1) !== '?') {
          this[prop] = this[prop] + '?';
        }
      }

      next();
    });
  }
};

module.exports = questionizer;