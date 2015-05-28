
var Person = new Meteor.Collection("person");
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
      console.log(Person.find().fetch().length);
      return Person.find().count();
    }
  });

  Template.person.events({
    'click #change-person':function(event,target)
    {
      var firstName=target.find("#firstname").value;
      var lastName= target.find("#lastname").value;
      var personid= target.find("#personid").value;
      Person.update({_id:personid},{
        firstName:firstName,
        lastName:lastName
      });
    },
    'click #remove-person':function(event,target)
    {
      var personid=target.find("#personid").value;
      Person.remove({_id:personid});
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
    Meteor.publish('person',function()
    {
      return Person.find({
        owner:Meteor.userId()
    })});
  Meteor.methods({
    addPerson:function(person,userid) {

      Person.insert({
        firstName:person.firstName,
        lastName:person.lastName,
        owner:userid})
    }});
}
