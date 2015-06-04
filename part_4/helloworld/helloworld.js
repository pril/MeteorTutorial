Persons = new Mongo.Collection("persons");
if (Meteor.isClient) {
  // counter starts at 0
  Meteor.subscribe("person");

  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.body.helpers({
    persons:function() {
      return Person.find();
    },
    personscount:function(){
      return Person.find().count();
    }
  });

  Template.person.events({
    'click #change-person':function(event,target)
    {
      var firstName=target.find("#firstname").value;
      var lastName= target.find("#lastname").value;
      var personid= target.find("#personid").value;
      Meteor.call('updatePerson',{
        firstName:firstName,
        lastName:lastName,
        id:personid,
        owner:Meteor.userId()
      });
    },
    'click #remove-person':function(event,target)
    {
      var personid=target.find("#personid").value;
      Meteor.call('removePerson',{
        id:personid,
        owner:Meteor.userId()
      });

    }
  });

  Template.body.events({
    'submit .add-person': function(event){
      var firstName=event.target.firstName.value;
      var lastName=event.target.lastName.value;
      Meteor.call('addPerson',{
        firstName:firstName,
        lastName:lastName,
        owner:Meteor.userId()
      });
      event.target.firstName.value = "";
      event.target.lastName.value="";
    }
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
    Meteor.publish('person',function(userid)
    {
      return Person.find({
        owner:userid
    })});
  Meteor.methods({
    addPerson:function(person) {
    console.log(person);
      Person.insert({
        firstName:person.firstName,
        lastName:person.lastName,
        owner:person.owner})
    },
    removePerson:function(person){
      Person.removePerson({_id:person.id,owner:person.owner})
    },
    updatePerson:function(person)
    {
      Person.update({_id:personid},{
        firstName:person.firstName,
        lastName:person.lastName
      });
    }});
}
