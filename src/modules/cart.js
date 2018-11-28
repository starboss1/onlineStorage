let _createCart = (
	num,
	url
) =>{
	let $cart = $(`<div class="cart">`);
	let $a = $(`<a href="#">`);
	$a.append($(`<img src="${url}" alt="Cart" class="btn btn-primary cart-image" data-toggle="modal" data-target="#exampleModalLong">`));
	// var tempObj = JSON.parse(localStorage.getItem("card"));
	// var c = 0;
	// if(tempObj){
	// 	console.log(tempObj);
	// 	c = tempObj["counter"];
	// }
	$a.append($(`<span class="counter">`).text(num));
	$cart.append($a);
	return $cart;
}

module.exports = _createCart;