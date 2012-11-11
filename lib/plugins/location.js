var location = function(schema, options) {
  schema.add({
    coordinates: {
        type: [Number],
        index: '2d'
    }
  });
  
  // Maybe on some hook like save, do something with their location. 
  // I don't know? 
};

module.exports = location;
