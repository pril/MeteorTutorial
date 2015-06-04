
var Person = new Meteor.Collection("person");

if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);
  Meteor.subscribe("person");
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
      return Person.find().fetch().length;
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
     Person.insert({
        firstName:firstName,
        lastName:lastName
      },function(err) {
        if (err)
          alert(err);
        else
          console.log("Daten hinzugefügt!");
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
    //Security Critical Subscriber
    Meteor.publish('persons',function()
    {
      //return Persons.find({owner:Meteor.userId()});
      Persons.find();
    })
  });
}


