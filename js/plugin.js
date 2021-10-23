$.fn.require_form = function (options) {
	var form = $(options.form),
		bttn = form.find('.validate-button'),
		text_inp = form.find('.require-inp'),
		radio_inp = form.find('.require-radio'),
		check_inp = form.find('.require-check'),
		select_inp = form.find('.require-select'),
		keyup = function() { /* проверка текстовых полей */
			var el = $(this);
			var val = el.val();
			var count = 2;

			if(el.data('min')) {
				count = el.data('min');
			}

			if(el.attr('type') === 'email') {
				validateEmail(el.val()) ? el.removeClass('empty') : el.addClass('empty');
			}
			else if(el.attr('type') === 'text' && el.data('strict')) {
				el.val().length === el.data('strict') ?  el.removeClass('empty') : el.addClass('empty');
			}
			else {
				el.val().length < count ? el.addClass('empty') : el.removeClass('empty');
			}

			bttnState();
		},
		focusin = function(){
			var el = $(this),
				wrap = el.closest('p');

			if(el.hasClass('error')) {
				switch(el.attr('type')) {
					case 'text':
					case 'email':
						el.removeClass('error');
						wrap.find('.errorTxt').remove();
						break;
				}
			}
		},
		focusout = function(){
			var el = $(this),
				wrap = el.closest('p');

				switch(el.attr('type')) {
					case 'email':
						if(el.hasClass('empty')) {
							el.addClass('error');
							if (typeof (CUR_LANG) != "undefined" && CUR_LANG == "RU") {
								wrap.append('<span class="errorTxt">Неверный e-mail</span>');
							} else {
								wrap.append('<span class="errorTxt">Incorrect E-mail</span>');
							}
						}
						break;
					case 'text':
						if(el.hasClass('serial-number') && el.hasClass('empty')) {
							el.addClass('error');
							if(typeof (CUR_LANG) != "undefined") {
								if (CUR_LANG === "EN") {
									wrap.append('<span class="errorTxt">Please enter your DC\'s ' + el.data('strict') + '-digits serial number. For example, 19DC03G10003LLB</span>');
								} else if (CUR_LANG === "DE") {
									wrap.append('<span class="errorTxt">Bitte geben Sie die ' + el.data('strict') + '-stellige Seriennummer Ihres Schranks ein. Zum Beispiel 19DC03G10003LLB</span>');
								}
							}
						}
						break;
				}
		},
		changeCheck = function(){ /* проверка чекбоксов */
			var el = $(this);
			el.prop('checked') == true ? el.removeClass('empty') : '';
			bttnState();
		},
		changeRadio = function(){ /* проверка группы радиобатонов */
			radio_inp.removeClass('empty');
			bttnState();
		},
		select = function(){ /*проверка селекта*/
			var el = $(this);
			el.val() == '-1' ? el.addClass('empty') : el.removeClass('empty');
			bttnState();
		},
		bttnState = function(){ /* действия с кнопкой */
			form.find('.empty').length ? bttn.attr('disabled', true) : bttn.attr('disabled', false);
		},
		validate_frm = function(){ /* проверка формы при загрузке */
			text_inp.each(function(){
				var el = $(this);
				var count = 2;

				if(el.data('min')) {
					count = el.data('min');
				}

				if(el.attr('type') === 'email') {
					validateEmail(el.val()) ? el.removeClass('empty') : el.addClass('empty');
				}
				else if(el.attr('type') === 'text' && el.data('strict')) {
					el.val().length === el.data('strict') ?  el.removeClass('empty') : el.addClass('empty');
				}
				else {
					el.val().length < count ? el.addClass('empty') : el.removeClass('empty');
				}
			});
			bttnState();
		};
	function validateEmail(email) {
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}
	text_inp.on('propertychange keyup input paste', keyup);
	text_inp.on('focusin', focusin);
	text_inp.on('focusout', focusout);
	check_inp.on('change', changeCheck);
	radio_inp.on('change', changeRadio);
	select_inp.on('change', select);
	validate_frm();
}
$.fn.numericInput = function () {
	var obj = $(this);
	obj.on('keydown', function (e) {
		var key = e.charCode || e.keyCode || 0;
		// allow backspace, tab, delete, arrows, numbers and keypad numbers ONLY
		return (
			key == 61|| /*+*/
			key == 107|| /*+*/
			key == 8 || /*Backspace*/
			key == 9 || /* TAB */
			key == 13 || /*ENTER*/
			key == 16 || /*SHIFT*/
			key == 17 || /*CTRL*/
			key == 65 || /*A*/
			key == 67 || /*C*/
			key == 86 || /*V*/
			key == 88 || /*X*/
			key == 110 || /*точка*/
			key == 190 || /*точка*/
			key == 188 || /*запятая*/
			key == 191 || /*запятая*/
			(key >= 48 && key <= 57) || /* верхняя */
			(key >= 96 && key <= 105) || /* правая клава */
			(key >= 112 && key <= 123) /* F1-F12 */
		);
	});
};
function hint(wrap, data) {
	var val_count = parseInt(data.count, 10),
		info = numeral(val_count, 'позиция', 'позиции', 'позиций'),
		basket_data = {
			"info" : info,
			"count" : val_count,
			"url" : ORDER_PAGE
		},
		tpl_hint,
		render = function() {
			var content = $(Mustache.render(tpl_hint, data));
			wrap.append(content);
			setTimeout("$('.hint').remove()", 2000);
		};
	tpl_hint = $(tpl).filter('#hint').html();
	render();
	if($('.withBasket').length){
		var basket_count = parseInt($('.withBasket .lieButton').data('count'), 10),
			count = val_count + basket_count,
			info = numeral(count, 'позиция', 'позиции', 'позиций');
		$('.withBasket .lieButton b').text(data.count+' '+data.cart);
		$('.withBasket .lieButton').data('count', count);
	} else {
		$('.header .service').addClass('withBasket');
		var tpl_basket,
			render = function() {
				var content = $(Mustache.render(tpl_basket, data));
				$('.withBasket').prepend(content);
			};
		tpl_basket = $(tpl).filter('#basket_link').html();
		render();
	}
}
function getUrl(){
	var returnLocation = (history.location || document.location).search;
	if(returnLocation) {
		var hash_obj = parseUrl(returnLocation),
			href = $.param(hash_obj);
		//sendUrl(href);
		urlDraw(hash_obj);
	}
}
function changeUrl(returnLocation, key, val, flag){
	var hash_obj = returnLocation ? parseUrl(returnLocation) : {};
	if(key.length && !(isNaN(val))){
		var new_hash_obj = addedHash(hash_obj, key, val),
			href = $.param(new_hash_obj);
		history.pushState(null, null, '?'+href);
		//sendUrl(new_hash_obj);
	}
}
function parseUrl(url_hash){
	var hash = url_hash.substring(1),
		hash_obj;
	hash ? hash_obj = JSON.parse('{"' + hash.replace(/&/g, '","').replace(/&/g, '","').replace(/=/g,'":"') + '"}', function(key, value) { return key==="" ? value : decodeURIComponent(value) }) : {};
	return hash_obj;
}
function addedHash(hash_obj, key, val){
	hash_obj[""+key+""] = val;
	return hash_obj;
}

function numeral(count, form_1, form_2, form_3) {
	while(count >= 20) {
		count = count % 10;
	}
	if(((count === 0) || (count >= 5 && count <= 19))) {
		return form_3;
	}
	else if(count === 1) {
		return form_1;
	}
	else if(count >= 2 && count <= 4) {
		return form_2;
	}
}
