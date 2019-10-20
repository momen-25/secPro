import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';

import './main.html';
import './productUpload.html';
import './enter.html';
import './nav.html';
import './login.html';
import './first.html';
import './countdown.html';
import './myOrders.html';
import './order.html';
import './marketClintVeiw.html';
import './productView.html';
import './market.html';
import './home.html';
import '../collection.js';
import '../routes.js';
import './login.js';
import '../collection.js';







Template.first.rendered = function() {
  var hw = $(window).height()-$('.navHeight').height();
  $('.firstpage').css({
  	'height' : hw ,
  	'width' : "100%" ,
  	'padding' : '0px',
  	'margin' : '0px',
  })

  $(window).on("resize", function(){
  	   console.log($(window).height());
       var hw = $(window).height()-$('.navHeight').height();
     $('.firstpage').css({
    	'height' : hw ,
  	    'width' : "100%" ,
  	    'padding' : '0px',
     	'margin' : '0px',
  	

  })
});
}; 

Template.enter.rendered = function() {

  var hws = (($(window).height()-$('.navHeight').height()) - $('.thebtn').height())/2;
  console.log($('.firstpage').height())
  $('.thebtn').css({
  	
  	'margin-top' : hws,
  	'padding-left' : '43.5%'

  })


  $(window).on("resize", function(){
  	   console.log($(window).height());
  	    var hws = (($(window).height()-$('.navHeight').height()) - $('.thebtn').height())/2;

  $('.thebtn').css({
  	
  	'margin-top' : hws,
  	'padding-left' : '43.5%'
  })
});

};



Template.order.rendered = function() {
    Session.set("thisUser" , Meteor.userId()); 
  console.log(this)
    if (Session.get("thisUser")!==this.brandOwner) {
        $('.timer').addClass("TimerDisplay");
        console.log("yes")
    }else {
       $('.timer').removeClass("TimerDisplay");
       console.log("no")

    }

};




Template.productUpload.events({
    "submit .edit-profile": function(event) {
         event.preventDefault(); 

        var file1 = $('.mainPic').get(0).files[0];

            fsFile1 = new FS.File(file1);
         

            ProfileImages.insert(fsFile1);
            console.log(fsFile1)

                    var imageLoc1 = '/cfs/files/ProfileImages/'+fsFile1._id;
 
        var file2 = $('.secPic').get(0).files[0];

            fsFile2 = new FS.File(file2);

            ProfileImages.insert(fsFile2);
            console.log(fsFile2)

                    var imageLoc2 = '/cfs/files/ProfileImages/'+fsFile2._id;

 
        var file3 = $('.thirdPic').get(0).files[0];

            fsFile3 = new FS.File(file3);

            ProfileImages.insert(fsFile3);
            console.log(fsFile3)

                    var imageLoc3 = '/cfs/files/ProfileImages/'+fsFile3._id;  


                    var productType = $('.product-type').val();
                    var avColor = $('.product-color').val();
                    var discription = $('.discription').val();
                    var price = $('.price').val();
                    var brand = Markets.findOne({userId : Meteor.userId()}).brandName;
                    var brandId = Markets.findOne({userId : Meteor.userId()})._id;


                    var pro = {
                        userId: Meteor.userId(),
                        username: Meteor.user().username,
                        mainImg: imageLoc1,
                        secImg :imageLoc2,
                        thirdImg : imageLoc3,
                        type : productType,
                        colors : avColor,
                        dis : discription,
                        price :price,
                        brand : brand,
                        brandId : brandId,
                        createdOn:new Date(),

                        };

                        console.log(pro);

                    Product.insert(pro);
                    Bert.alert("Profile Update Successful!", "success", "growl-top-right");
  
    }
});


Template.enter.events({
  "submit .typePro " : function(event){
    event.preventDefault();


    
    Session.set("selectedType" , $('.typeValue:checked').val());
    console.log(Session.get('selectedType')); 

    var test = Product.find({type : Session.get('selectedType')}, { sort: { createdOn: 1 }}, { limit: 8}).fetch().pop();
  
    console.log(test);

  },

  "click .typeValue" : function(event){

    $('.typeValue:checked').siblings().attr("checked" , false); 
  }

})

Template.home.helpers({
  pro : function(){
    
   if (Session.get('selectedType')) {
    return Product.find({type : Session.get('selectedType')});
   }
    return Product.find();
  }


});


Template.nav.helpers({
  myMarket : function(){
    
    return Markets.findOne({userId : Meteor.userId()});
  },

  myOrders : function(){
    console.log(Orders.findOne({user : Meteor.userId()}))
    return Orders.findOne({user : Meteor.userId()})
  }


});


Template.productView.helpers({
  proView : function(){
    var productView = Product.findOne({_id : this._id});
    return productView;
  }

});

Template.productView.events({
  "click .sacImg" : function(event){
    $('.mainImgPro img').attr("src",event.target.src)
  },

 "click .book" : function(event){
  var Product = this._id;
  var brand = this.brandId;
  var user = Meteor.userId();
  var userName = Meteor.user().username;
  var img = this.mainImg;

      var order = {
        brandOwner :this.userId , 
        bookedProduct : Product,
        brand : brand ,
        user : user,
        userName : userName,
        img : img,
        createdOn:new Date(),
      };

  Orders.insert(order)
  console.log(order);


 }
});

Template.market.events({
  "submit .marketForm" : function(event){
    event.preventDefault();
            var file = $('.brandLogo').get(0).files[0];

            fsFile = new FS.File(file);
         

            ProfileImages.insert(fsFile);
            console.log(fsFile)

             var brandLogo = '/cfs/files/ProfileImages/'+fsFile._id;
             var brandName = $('.brandName').val();
             var facePage = $('.facePage').val();
             var phNum = $('.phNum').val();
             var mainLocation = $('.mainLocation').val();
             var secLocation = $('.secLocation').val();
             var thirdLocation = $('.thirdLocation').val();

                    var NewMarket = {
                        userId: Meteor.userId(),
                        username: Meteor.user().username,
                        logo: brandLogo,
                        facebook :facePage,
                        number : phNum,
                        mainLocation : mainLocation,
                        secLocation : secLocation,
                        thirdLocation : thirdLocation,
                        brandName:brandName,
                        createdOn:new Date(),

                        };
             Markets.insert(NewMarket)           
            console.log(NewMarket);
  },

"click .timer" : function(){

var x = new Date().getTime() + 60000;
var selectedId = this._id;
// Set the date we're counting down to

// Update the count down every 1 second
var M = setInterval(function() {

var d = x - new Date().getTime();
var hours = Math.floor((d % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
var minutes = Math.floor((d % (1000 * 60 * 60)) / (1000 * 60));
var seconds = Math.floor((d % (1000 * 60)) / 1000);

$(".demo1").html( hours + "h" + minutes + "m" + seconds + "s")


console.log("hours" , hours , "minutes" , minutes , "second" , seconds );

 if (hours==0 && minutes==0 && seconds == 0) {
  Orders.remove(selectedId);
  console.log('done');
  console.log(selectedId);
 }

   if (d < 0) {
    clearInterval(M);
    console.log('finsh')
  }



}, 1000);
  },   

});

Template.market.helpers({
  NewMarket : function(){

   
    return Markets.findOne({userId : Meteor.userId()});

  },

  
    pro : function(){
    
   
    return Product.find({brandId : this._id});
  },

 order :function(){
  console.log();
  return Orders.find({brand : this._id});
 }

});

Template.myOrders.helpers({

  order : function(){
    return Orders.find({user : Meteor.userId()});


  }

});

Template.marketClintVeiw.helpers({
  clintVeiw : function(){
    return this;
  },

    pro : function(){
    
   
    return Product.find({brandId : this._id});
  }
});

Template.order.helpers({
  order : function(){


    return Orders.findOne({_id : this._id});


  },

  timer : function(){

    console.log("from timer " , Timer.findOne({theOrder:this._id},{ sort: { createdOn: -1 }}, { limit: 1}));
    return Timer.findOne({theOrder:this._id},{ sort: { createdOn: -1 }}, { limit: 1});
  }
});

Template.order.events({

"click .timer" : function(){

  var timer = {
    brandOwner  : this.brandOwner,
    clint : this.user,
    theOrder : this._id,
    createdOn : new Date(),

  };


  Timer.insert(timer);
  var theID = Timer.find({theOrder : this._id}).fetch().pop()._id;
  console.log(theID);

var x = new Date().getTime() + 60000;
var selectedId = this._id;
// Set the date we're counting down to

// Update the count down every 1 second

var M = setInterval(function() {

var d = x - new Date().getTime();
var hours = Math.floor((d % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
var minutes = Math.floor((d % (1000 * 60 * 60)) / (1000 * 60));
var seconds = Math.floor((d % (1000 * 60)) / 1000);


    Timer.update(theID, {

      $set: { 
              seconds: seconds,
              minutes: minutes ,
              hours: hours 
            },



    });


console.log("hours" , hours , "minutes" , minutes , "second" , seconds );

 if (hours==0 && minutes==0 && seconds == 0) {
  Orders.remove(selectedId);
  console.log('done');
  console.log(selectedId);
 }

   if (d < 0) {
    clearInterval(M);
    console.log('finsh')
  }



}, 1000);
  },  
})