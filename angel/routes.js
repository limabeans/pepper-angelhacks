Router.route('/asdfsafd', function () {
  this.render('Home', {
    data: function () { return Items.findOne({_id: this.params._id}); }
  });
});


Router.route('/', function() {
  this.render('base');
});

Router.route('/pair/:_id', function() {
  this.render('pair', {
    data: function() {
      console.log(this);
      return Pairs.findOne({_id: this.params._id});
    }
  });
});
