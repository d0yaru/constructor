/*! plugin.js*/
$.fn.require_form = function (options) {
	var form = $(options.form),
		bttn = form.find('.validate-button'),
		text_inp = form.find('.require-inp'),
		radio_inp = form.find('.require-radio'),
		check_inp = form.find('.require-check'),
		select_inp = form.find('.require-select'),
		keyup = function () {
			/* проверка текстовых полей */
			var el = $(this);
			var val = el.val();
			var count = 2;

			if (el.data('min')) {
				count = el.data('min');
			}

			if (el.attr('type') === 'email') {
				validateEmail(el.val()) ? el.removeClass('empty') : el.addClass('empty');
			} else if (el.attr('type') === 'text' && el.data('strict')) {
				el.val().length === el.data('strict') ? el.removeClass('empty') : el.addClass('empty');
			} else {
				el.val().length < count ? el.addClass('empty') : el.removeClass('empty');
			}

			bttnState();
		},
		focusin = function () {
			var el = $(this),
				wrap = el.closest('p');

			if (el.hasClass('error')) {
				switch (el.attr('type')) {
					case 'text':
					case 'email':
						el.removeClass('error');
						wrap.find('.errorTxt').remove();
						break;
				}
			}
		},
		focusout = function () {
			var el = $(this),
				wrap = el.closest('p');

			switch (el.attr('type')) {
				case 'email':
					if (el.hasClass('empty')) {
						el.addClass('error');
						if (typeof (CUR_LANG) != "undefined" && CUR_LANG == "RU") {
							wrap.append('<span class="errorTxt">Неверный e-mail</span>');
						} else {
							wrap.append('<span class="errorTxt">Incorrect E-mail</span>');
						}
					}
					break;
				case 'text':
					if (el.hasClass('serial-number') && el.hasClass('empty')) {
						el.addClass('error');
						if (typeof (CUR_LANG) != "undefined") {
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
		changeCheck = function () {
			/* проверка чекбоксов */
			var el = $(this);
			el.prop('checked') == true ? el.removeClass('empty') : '';
			bttnState();
		},
		changeRadio = function () {
			/* проверка группы радиобатонов */
			radio_inp.removeClass('empty');
			bttnState();
		},
		select = function () {
			/*проверка селекта*/
			var el = $(this);
			el.val() == '-1' ? el.addClass('empty') : el.removeClass('empty');
			bttnState();
		},
		bttnState = function () {
			/* действия с кнопкой */
			form.find('.empty').length ? bttn.attr('disabled', true) : bttn.attr('disabled', false);
		},
		validate_frm = function () {
			/* проверка формы при загрузке */
			text_inp.each(function () {
				var el = $(this);
				var count = 2;

				if (el.data('min')) {
					count = el.data('min');
				}

				if (el.attr('type') === 'email') {
					validateEmail(el.val()) ? el.removeClass('empty') : el.addClass('empty');
				} else if (el.attr('type') === 'text' && el.data('strict')) {
					el.val().length === el.data('strict') ? el.removeClass('empty') : el.addClass('empty');
				} else {
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