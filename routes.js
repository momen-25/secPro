Router.configure({
  layoutTemplate: 'ApplicationLayout'
});

console.log("mmmm")

Router.route('/', function () {
    this.render('nav' ,{to : 'nav'});
    this.render('first',{to : 'main'});//space to every route becouse it render kidData evey where 


});

Router.route('/countdown', function () {
    this.render('nav' ,{to : 'nav'});
    this.render('countdown',{to : 'main'});//space to every route becouse it render kidData evey where 


});

Router.route('/login', function () {
    this.render('nav' ,{to : 'nav'});
    this.render('login',{to : 'main'});//space to every route becouse it render kidData evey where 

});
Router.route('/signup', function () {
    this.render('nav' ,{to : 'nav'});
    this.render('signup',{to : 'main'});//space to every route becouse it render kidData evey where 

});

Router.route('/productUpload', function () {
    this.render('nav' ,{to : 'nav'});
    this.render('productUpload',{to : 'main'});//space to every route becouse it render kidData evey where 

});

Router.route('/product/:_id', function () {


  this.render('nav', {
    to : 'nav',
 



  })

  this.render('productView', {
  	to : "main",
    data: function () {
      console.log("2from router ",this.params._id);
      var productView = Product.findOne({_id : this.params._id});
      console.log(productView)
      return productView
  

    }



  });




});



Router.route('/market/:_id', function () {


  this.render('nav', {
    to : 'nav',
 



  })

  this.render('market', {
  	to : "main",
    data: function () {
      console.log("2from router ",this.params._id);
      var NewMarket = Markets.findOne({_id : this.params._id});
      console.log(NewMarket)
      return NewMarket
  

    }



  });




});

Router.route('/orders/:_id', function () {


  this.render('nav', {
    to : 'nav',
 



  })

  this.render('order', {
  	to : "main",
    data: function () {
      var order = Orders.findOne({_id : this.params._id});
      return order;
  

    }



  });




});

Router.route('/marketClintVeiw/:brandName', function () {


  this.render('nav', {
    to : 'nav',
 



  })

  this.render('marketClintVeiw', {
  	to : "main",
    data: function () {
      return Markets.findOne({brandName : this.params.brandName})
   
  

    }



  });




});


Router.route('/market', function () {


  this.render('nav', {
    to : 'nav',
 



  })

  this.render('market', {
  	to : "main",
    data: function () {

  

    }



  });




});

Router.route('/myOrders/:userName', function () {


  this.render('nav', {
    to : 'nav',
 



  });


  this.render('myOrders', {
  	to : "main",
    data: function () {
      return Orders.find({userName : this.params.userName});
   
  

    }



  });



});