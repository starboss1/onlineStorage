import 'bootstrap';
import './scss/main.scss';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;


let _createCart = require('./modules/cart');
var tempObj = JSON.parse(localStorage.getItem("card"));
if(JSON.parse(localStorage.getItem("card")))
	$("header").append(_createCart(tempObj["counter"],"https://svgsilh.com/svg/294547.svg"));
else{
	$("header").append(_createCart(0,"https://svgsilh.com/svg/294547.svg"));
}

let _createFilter = require('./modules/filter');

jQuery.ajax({
	url: 'https://nit.tron.net.ua/api/category/list',
	method:'get',
	dataType: 'json',
	success: function(json){
		$('.filter').append(_createFilter(json));
	},
});

let _createProduct = require('./modules/product');

jQuery.ajax({
	url: 'https://nit.tron.net.ua/api/product/list',
	method: 'get',
	dataType: 'json',
	success: function(json){
		json.forEach(product => $('.product-grid').append(_createProduct(product)));
	},

	error: function(xhr){
		alert("An error occured: "+ xhr.status+" "+ xhr.statusText);
	},
});

$(document).on('click','.category',function(){
	var $this = $(this);
	var id = $this.data('category-id');
	$(".product-grid").empty();
	$(".btn-primary").text($this.children().text());
	jQuery.ajax({	
	url: 'https://nit.tron.net.ua/api/product/list/category/'+id,
	method: 'get',
	dataType: 'json',
	success: function(json){
		json.forEach(product => $('.product-grid').append(_createProduct(product)));
	},

	

	error: function(xhr){
		alert("An error occured: "+ xhr.status+" "+ xhr.statusText);
	},
});

});

// jQuery.ajax({
// 	type: 'post',
// 	url: 'https://nit.tron.net.ua/api/order/add';
// 	token: 'CtYYx-Z_oB-DmwlepHLS';
// 	data: 
// })



$(document).on('click','.product-buy',function(){
	var $this = $(this);
	var id = $this.closest('.product').data('product-id');

	if(!window.localStorage.card){
		var obj = {

		};
		obj[""+id] = 1;
		obj["counter"] = 1;
		$(".counter").text("1");
		$(".counter").display = 'inline-block';
		var serialObj = JSON.stringify(obj);
		localStorage.setItem("card", serialObj);

	}
	else{
		var tempObj = JSON.parse(localStorage.getItem("card"));
		for(var key in tempObj){
			if(key == id){
				tempObj[""+key]++;
				break;
			}
		}
		if(tempObj[""+id] ===undefined){
			tempObj[""+id] = 1;
		}
		var t = tempObj["counter"]+1;
		tempObj["counter"] = t;
		$(".counter").text(t);
		var serialObj = JSON.stringify(tempObj);
		localStorage.setItem("card", serialObj);
	}
});