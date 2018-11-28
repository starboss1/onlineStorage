let _createCart = (
	num,
	url
) =>{
	let $cart = $(`<div class="cart">`);
	let $a = $(`<a href="#">`);
	$a.append($(`<img src="${url}" alt="Cart" class="btn btn-primary cart-image" data-toggle="modal" data-target="#exampleModalLong">`));
	$a.append($(`<span class="counter">`).text(num));
	$cart.append($a);
	return $cart;
}
module.exports = _createCart;