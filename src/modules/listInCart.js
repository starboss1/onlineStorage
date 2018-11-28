let _createListInCart = (
	arrProduct,
) => {
	// var c = 0;
	// for (var key in arrProduct) {
	// 	c++;
	// }
	let $cartBody = $(`<div class='cart-body'>`);
	let $cartList = $(`<div class="cart-list">`);
	var totalSum = 0;
		for(let key in arrProduct){
			if(key == 0)
				continue;
		jQuery.ajax({
			// url: 'https://nit.tron.net.ua/api/product/'+i,
			url: 'https://nit.tron.net.ua/api/product/'+key,
			method:'get',
			async:false,
			dataType: 'json',
			success: function(json){
				// let $cartItem = $(`<div class='clearfix cart-item' data-product-id="${i}">`);
				let $cartItem = $(`<div class='clearfix cart-item' data-product-id="${key}">`);
				$cartItem.append($(`<div class="cart-check-wrap" name="activate">`).append($(`<a name="before_delete href="#" class="cart-check">`).append($(`<img src="https://i.rozetka.ua/design/_.gif" width="23" height="23" alt="✓" class="cart-check-icon sprite">`))));
				let $cartInfo = ($(`<div class="cart-info">`));
				$cartInfo.append($(`<div class="cart-img">`).append($(`<img src="${json['image_url']}" alt="${json['name']}" class="smallImg">`)));
				let $cartContent = ($(`<div class="cart-content">`));
				$cartContent.append($(`<div class="cart-title">`).append($(`<span class="cart-title-span">`).text(json['name'])));
				let sum = 0;
				if(json['special_price']){
					$cartContent.append($(`<div class="cart-price">`).append($(`<span class="cart-uah">`).text(json['special_price'])));
					// sum = json['special_price'] * arrProduct[json['id']];
					sum = json['special_price'] * arrProduct[key];
				}
				else{
					$cartContent.append($(`<div class="cart-price">`).append($(`<span class="cart-uah">`).text(json['price'])));
					// sum = json['price'] * arrProduct[json['id']];
					sum = json['price'] * arrProduct[key];	
				}
				totalSum+=sum;

				$cartContent.append($(`<div class="cart-sum">`).append($(`<span class="cart-sum-uah">`).append($(`<span name="sum">`).text(sum))));
				let $cartAmount = $(`<div class="cart-amount">`);
				$cartAmount.append($(`<a href="#" class="cart-amount-minus" name="minus">`).append($(`<img src="https://i.rozetka.ua/design/_.gif" width="16" height="2" alt="&up;" class="cart-amount-minus-icon sprite">`)));
				$cartAmount.append($(`<input name="quantity" type="text" class="cart-amount-input-text" value="${arrProduct[key]}">`));
				$cartAmount.append($(`<a href="#" class="cart-amount-plus" name="plus">`).append($(`<img src="https://i.rozetka.ua/design/_.gif" width="21" height="20" alt="&up;" class="cart-amount-plus-icon sprite">`)));
				$cartContent.append($cartAmount);
				$cartInfo.append($cartContent);
				$cartItem.append($cartInfo);
				$cartList.append($cartItem);
			},
		});
}
console.log(totalSum);
$cartBody.append($cartList);
let $cartTotal = $(`<div class="cart-total clearfix">`);
let $cartSum = $(`<div class="cart-total-sum" name="total">`);
$cartSum.append($(`<span class="cart-total-title">`).text("Total:"));
$cartSum.append($(`<span class="cart-total-uah">`).append($(`<span name="cost">`).text(totalSum)));
$cartTotal.append($(`<div class="cart-total-label">`).append($cartSum));
$cartBody.append($cartTotal);


let $cartForm = ($(`<form id="clientForm">`));
let $formGroup = ($(`<div class="form-group">`));
$formGroup.append($(`<label for="inputName">`).text("Name"));
$formGroup.append($(`<input type="text" class="form-control" id="inputName" placeholder="Enter name:" required="required" >`));
$cartForm.append($formGroup);

$formGroup = ($(`<div class="form-group">`));
$formGroup.append($(`<label for="inputPhone">`).text("Phone"));
$formGroup.append($(`<input type="tel" class="form-control" id="inputPhone" required="required" pattern="[0-9]{3,}">`));
$cartForm.append($formGroup);

$formGroup = ($(`<div class="form-group">`));
$formGroup.append($(`<label for="inputEmail">`).text("Email"));
$formGroup.append($(`<input type="email" class="form-control" id="inputEmail" placeholder="abc@abc.abc" required="required" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$">`));
$cartForm.append($formGroup);

$cartForm.append($(`<button type="button" class="close btn btn-secondary" data-dismiss="modal">`).text("Close"))
$cartForm.append($(`<button type="submit" class="checkout btn btn-primary">`).text("Checkout"));

$cartBody.append($cartForm);
return $cartBody;
};

module.exports = _createListInCart;