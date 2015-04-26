/**
 * Templates
 */
Template.messages.helpers({
  messages: function() {
    return Messages.find({}, { sort: { time: -1}});
  }
})

Template.input.events = {
  'keydown input#message' : function (event) {
    if (event.which == 13) { // 13 is the enter key event
      if (Meteor.user()) {
        console.log('hi');
        var name = Meteor.user().emails[0].address;
        console.log(name);
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
