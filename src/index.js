import 'bootstrap';
import './scss/main.scss';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;

$(function(){
	$('[rel="popover"]').popover({
		container: 'body',
		html: true,
		content: function () {
			var clone = $($(this).data('popover-content')).clone(true).removeClass('hide');
			return clone;
		}
	}).click(function(e) {
		e.preventDefault();
	});
});

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
	let u;
	if(id == "1")
		u = 'https://nit.tron.net.ua/api/product/list/';
	else
		u = 'https://nit.tron.net.ua/api/product/list/category/'+id;

	jQuery.ajax({
	url:u,
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


$(document).on('click', '.cart-image', function(){
	var tempObj = JSON.parse(localStorage.getItem("card"));
	var t = [];
	t[0] = 0;
	for(var key in tempObj){
		if(key == "counter")
			continue;
		t[''+key] = tempObj[key];
		// t.push(tempObj[key]);
	}

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

	$('.counter').text(+$('.counter').text()+1);

	c.val(newNum);
	var tempObj = JSON.parse(localStorage.getItem("card"));
	tempObj[id] = newNum;
	tempObj['counter'] = +tempObj['counter'] + 1;
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

	$('.counter').text(+$('.counter').text()-1);

	var oldTotalSum = $('.cart-total-uah>span').text();
	var newTotalSum = +oldTotalSum - oldProductSum + newProductSum;
	$('.cart-total-uah>span').text(newTotalSum);

	c.val(newNum);
	var tempObj = JSON.parse(localStorage.getItem("card"));
	tempObj[id] = newNum;
	tempObj['counter'] = +tempObj['counter'] - 1;
	var serialObj = JSON.stringify(tempObj);
	window.localStorage.setItem("card", serialObj);
});

$(document).on('click', '.cart-check-icon', function(){
	var $this = $(this);
	var c = $($this.closest('.cart-item'));
	var id = c.data('product-id');

	var tempObj = JSON.parse(localStorage.getItem("card"));
	var newCount = tempObj['counter'] - tempObj[id];
	$('.counter').text(newCount);
	tempObj['counter'] = newCount;
	delete tempObj[id];
	var serialObj = JSON.stringify(tempObj);
	window.localStorage.setItem("card", serialObj);
	var newProductSum = +$('.cart-total-uah>span').text() - (+$($this.closest('.cart-item').find('.cart-sum>.cart-sum-uah>span')).text());
	$('.cart-total-uah>span').text(newProductSum);

	$this.closest('.cart-item').remove();


});

$(document).on('click', '.checkout', function(e){
	var name = $('#inputName').val();
	var phone = $('#inputPhone').val();
	var email = $('#inputEmail').val();
	var dataProducts = "";
	var tempObj = JSON.parse(localStorage.getItem("card"));
	for(var key in tempObj){
		if(key == "counter")
			continue;
		dataProducts+="products["+key+"]="+tempObj[key]+"&";
	}
	if(name && phone && email && dataProducts){

	jQuery.ajax({
		url: 'https://nit.tron.net.ua/api/order/add',
		method: 'post',
		token: 'CtYYx-Z_oB-DmwlepHLS',
		dataType: 'json',
		data:
		'name='+name+'&email='+email+'&phone='+phone+'&'+dataProducts+'token=CtYYx-Z_oB-DmwlepHLS',
		success: function(){
			alert("Your order is accepted");
			localStorage.removeItem("card");
			$('.counter').text("0");
			$('#exampleModalLong').modal('hide')

		},

		error: function(xhr){
			alert("An error occured: "+ xhr.status+" "+ xhr.statusText);
		},
});
}
});



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