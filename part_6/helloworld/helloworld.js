if (Meteor.isClient)
{
  Schemas = {};

  Template.registerHelper("Schemas", Schemas);

  Schemas.Person = new SimpleSchema({
    firstName: {
      type: String,
      index: 1,
      unique: true
    },
    lastName: {
      type: String,
      optional: true
    },
    age: {
      type: Number,
      optional: true
    }
  });

  var Collections = {};

  Template.registerHelper("Collections", Collections);

  People = Collections.People = new Mongo.Collection("People");
  People.attachSchema(Schemas.Person);

  Meteor.publish(null, function () {
    return People.find();
  });

  People.allow({
    insert: function () {
      return true;
    },
    remove: function () {
      return true;
    }
  });
}
