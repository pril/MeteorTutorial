Meteor.publish(null, function () {
  return [
    Person.find()
  ];
});

