let _createHtml = ({
	id,
	name,
	image_url,
	description,
	price,
	special_price,
}) => {
	let $product = $(`<div class="card col-xs-12 col-sm-6 col-md-4 col-lg-3 p-1 product" data-product-id="${id}">`);
	$product.append($(`<img src="${image_url}" alt="${name}" class="img-fluid product-image">`));
	$product.append($(`<span class="product-title">`).text(name));
	let $prices = $(`<div class="prices">`);
	if(special_price){
		$prices.append($(`<span class="product-price product-price-old">`).text(price));
		$prices.append($(`<span class="product-price product-special-price">`).text(special_price));
	}
	else{
		$prices.append($(`<span class="product-price">`).text(price));
	}
	$product.append($prices);
	$product.append($(`<button class="product-buy">`).text('Add'));
	return $product;
};

module.exports = _createHtml;