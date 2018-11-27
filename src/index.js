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


$(document).on('click', '.cart>a', function(){
	var tempObj = JSON.parse(localStorage.getItem("card"));
	var t = [];
	console.log(tempObj);
	t[0] = 0;
	for(var key in tempObj){
		if(key == "counter")
			continue;
		t[''+key] = tempObj[key];
		// t.push(tempObj[key]);
	}

	console.log(t);
	let _createList = require('./modules/listInCart');

	$('.modal-body').empty();

	$('.modal-body').append(_createList(t));
});

$(document).on('click', '.cart-amount-plus', function(){
	var $this = $(this);
	var c = $this.siblings('.cart-amount-input-text');
	var id = $this.closest('.cart-item').data('product-id');

	var newNum = (+c.val())+1;

	var productSum = $this.closest('.cart-item').find('.cart-sum-uah>span');
	var oldProductSum = +productSum.text();
	var newProductSum = +((oldProductSum/(+c.val())) * newNum);
	productSum.text(newProductSum);

	var oldTotalSum = $('.cart-total-uah>span').text();
	var newTotalSum = +oldTotalSum - oldProductSum + newProductSum;
	$('.cart-total-uah>span').text(newTotalSum);

	c.val(newNum);
	var tempObj = JSON.parse(localStorage.getItem("card"));
	tempObj[id] = newNum;
	var serialObj = JSON.stringify(tempObj);
	window.localStorage.setItem("card", serialObj);
});

$(document).on('click', '.cart-amount-minus', function(){
	var $this = $(this);
	var c = $this.siblings('.cart-amount-input-text');
	var id = $this.closest('.cart-item').data('product-id');

	var newNum = (+c.val())-1;
	if(newNum == 0)
		return;


	var productSum = $this.closest('.cart-item').find('.cart-sum-uah>span');
	var oldProductSum = +productSum.text();
	var newProductSum = +((oldProductSum/(+c.val())) * newNum);
	productSum.text(newProductSum);

	var oldTotalSum = $('.cart-total-uah>span').text();
	var newTotalSum = +oldTotalSum - oldProductSum + newProductSum;
	$('.cart-total-uah>span').text(newTotalSum);

	c.val(newNum);
	var tempObj = JSON.parse(localStorage.getItem("card"));
	tempObj[id] = newNum;
	var serialObj = JSON.stringify(tempObj);
	window.localStorage.setItem("card", serialObj);
});

$(document).on('click', '.cart-check-icon', function(){
	var $this = $(this);
	var c = $($this.closest('.cart-item'));
	var id = c.data('product-id');

	var tempObj = JSON.parse(localStorage.getItem("card"));
	tempObj['counter'] = tempObj['counter'] - tempObj[id];
	delete tempObj[id];
	var serialObj = JSON.stringify(tempObj);
	window.localStorage.setItem("card", serialObj);

	var productSum = $($this.closest('.cart-item').find('.cart-sum>.cart-sum-uah>span')).text();
	var oldProductSum = $('.cart-total-uah>span').text();
	var newProductSum = +oldProductSum - (+productSum);
	$('.cart-total-uah>span').text(newProductSum);

	$this.closest('.cart-item').remove();


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
		var tempObj = JSON.parse(window.localStorage.getItem("card"));
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
		window.localStorage.setItem("card", serialObj);
	}
});