/*! main.js*/
function orderSum() {
	$('[data-type="constr"]').not('.subList').each(function () {
		var $this = $(this),
			$priceTotal = $this.find('.price'),
			$priceBlock = $this.find('.price-one'),
			$price = parseInt(0),
			$count = parseInt($this.find('.count input').val());

		$('.subList[data-type="constr"][data-id="' + $this.attr('data-id') + '"]').each(function () {
			var $this = $(this);
			$price += parseInt($this.find('.price-one').attr('data-price')) * $this.find('.count .info').text();
		});

		if ($price == 0) {
			$priceBlock.attr('data-price', $price).text('По запросу');
			$priceTotal.attr('data-price', $price).text('По запросу');
		} else {
			$priceBlock.attr('data-price', $price).html(number_format($price, 0, '.', ' ') + ' &#8381;');
			$priceTotal.attr('data-price', $price * $count).html(number_format($price * $count, 0, '.', ' ') + ' &#8381;');
		}
	});

	var sum = 0;
	var el = $(this);
	$('.orderTbl tr').not('.subList').each(function () {
		var el = $(this);

		if (typeof (el.attr('data-type')) != 'undefined' && el.attr('data-type') == 'constr') {
			var val = parseInt(el.find('.num').val(), 10) || 0,
				price = parseInt(el.find('.price').attr('data-price'), 10) || 0;

			sum += price;
		} else {
			var val = parseInt(el.find('.num').val(), 10) || 0,
				price = parseInt(el.find('.price-one').attr('data-price'), 10) || 0;

			var curPrice = val * price;
			sum += curPrice;

			if (curPrice == 0) {
				el.find('.price').attr('data-price', 0).html('По запросу');
			} else {
				el.find('.price').attr('data-price', curPrice).html(number_format(curPrice, 0, '.', ' ') + ' &#8381;');;
			}
		}


	});

	if (parseInt(sum) == 0) {
		sum = 'по запросу';
	} else {
		sum = accounting.formatMoney(
			sum, {
				symbol: "$",
				decimal: "",
				thousand: " ",
				precision: 0,
				format: "%v"
			}
		);

		sum += ' &#8381;';
	}

	$('#summ').html(sum);
}