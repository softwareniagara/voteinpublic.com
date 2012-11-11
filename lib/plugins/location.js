var location = function(schema, options) {
  schema.add({
    latitude: String,
    longitude: String 
  });
  
  // Maybe on some hook like save, do something with their location. 
  // I don't know? 
};

module.exports = location;
