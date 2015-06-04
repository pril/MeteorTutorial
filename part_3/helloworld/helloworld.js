Persons = new Mongo.Collection('persons')


if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.body.helpers({
    persons: function()
    {
      return Persons.find({});
    }
  });

  Template.body.events ({
    'submit .add-person':function(event){
      var firstName=event.target.firstName.value,
          lastName=event.target.lastName.value;
      Persons.insert({
        firstname:firstName,
        lastname:lastName
      });
      event.target.firstName.value='';
      event.target.lastName.value='';
      return false;}
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
