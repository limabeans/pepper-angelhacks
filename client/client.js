Meteor.subscribe('users');

/**
 * Templates
 */
Template.list_messages.helpers({
  queryMessages: function() {
    return Messages.find({}, { sort: { time: -1}});
  }
});

Template.base.helpers({
  userLoggedIn: function() {
    return Meteor.user();
  }
});

Template.list_pairs.helpers({
  queryPairs: function() {
    var user = Meteor.user().emails[0].address;
    //Make sure that only your Pairs show up!
    return Pairs.find({$or:[{person1:user},{person2:user}]}); 
  }
});

Template.list_pairs.events = {
  'click a' : function(event) {
    console.log('clicked');
    console.log(event);
    console.log(this);
    console.log(this.person1);
  }
};

Template.pair.helpers({
  userLoggedIn: function() {
    return Meteor.user();
  }
});


Template.pair.events = {
  'keydown input#message': function(event) {
    if(event.which == 13) {
      var msg = document.getElementById('message');
      var user = Meteor.user().emails[0].address;
      Pairs.update(
        {_id: this._id},
        {
          $push: {
            messages: {
              message:msg.value,
              sender: user
            }
          }
        }
      );
      msg.value = '';
    }
  }
};
  




Template.create_pair.events = {
  'keydown input#pair' : function(event) {
    if(event.which == 13) {
      var pair = document.getElementById('pair');
      var thisEmail = Meteor.user().emails[0].address;
      var friendEmail = pair.value;
      if(friendEmail != '') {
        var verify = Meteor.users.findOne({
          emails:[{
            address:friendEmail,
            verified: false
          }] //Need an $or
        });
        if(!verify) {
          alert('doesnt exist!');
        } else {
          if(thisEmail === friendEmail) {
            alert('cant chat with yourself!');
          } else {
            Pairs.insert({
              person1: thisEmail,
              person2: friendEmail,
              messages: []
            });
            pair.value = '';
          }
        }
      }
    }
  }
};


Template.send_message.events = {
  'keydown input#message' : function (event) {
    if (event.which == 13) { // 13 is the enter key event
      if (Meteor.user()) {
        console.log('hi');
        if(Meteor.user().emails) {
          var name = Meteor.user().emails[0].address;
        } else {
          //Facebook
          var name = Meteor.user().profile.name;
        }
        var message = document.getElementById('message');

        if (message.value != '') {
          Messages.insert({
            name: name,
            message: message.value,
            time: Date.now(),
          });
          document.getElementById('message').value = '';
          message.value = '';
        }
      } else {
        alert('You are not logged in!');
      }
    }
  }
}


Template.list_users.helpers({
  queryUsers: function() {
    return Meteor.users.find({});
  }
});

