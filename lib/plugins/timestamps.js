var timestamps = function(schema, options) {
  schema.add({
    createdAt: Date,
    modifiedAt: Date
  });
  
  schema.pre('save', function(next) {
    if (typeof this.createdAt === 'undefined') {
      this.createdAt = new Date;
    }
    
    this.modifiedAt = new Date;
    next();
  });
};

module.exports = timestamps;
