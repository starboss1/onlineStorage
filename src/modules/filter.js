let _createHtmlFilter = (
	json
) => {
	let $dropdown = $(`<div class="dropdown">`);
	$dropdown.append($(`<span class="filter-title">`).text("Сотування"));
	$dropdown.append($(`<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">
 `).text("All products").append($(` <span class="caret">`)));
	let $ul = $(`<ul class="dropdown-menu">`);
	console.log(json);
	json.forEach(index => $ul.append($(`<li class="category" data-category-id="${index["id"]}">`).append($('<a href="#"></a>').text(index["description"]))));
	$dropdown.append($ul);
	return $dropdown;
};

module.exports = _createHtmlFilter;