import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
	ProfileImages = new FS.Collection("ProfileImages", {
    stores: [new FS.Store.GridFS("ProfileImages")]
});

Product = new Mongo.Collection("product");
Markets = new Mongo.Collection("markets");
Orders = new Mongo.Collection('orders');
Checks = new Mongo.Collection('check'); 
Timer = new Mongo.Collection('timer'); 
 




	

});



