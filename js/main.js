var tpl;
$(function(){
	tpl = $('#mustache-tpl').html();
	var w_popstate = 0;
	$(window).on('load', function(){
		++w_popstate;
	});
	$(window).on('popstate', function(e) {
		++w_popstate;
		if (w_popstate > 2) {
			getUrl();
		}
	});

	$(document).on('click', '.mfp-container', function(e){
		e.preventDefault();
		$.magnificPopup.close();
	});
	/* подсказки */
	$(document).click(function(e){
		//$('.hint').hide();
		$('.menu .item').removeClass('active');
		$('#home-gallery .overlay').hide();
	});
	$(document).keydown(function(e) {
	    if( e.keyCode === 27 ) {
			//$('.hint').hide();
			$.magnificPopup.close();
			$('.menu .item').removeClass('active');
			$('#home-gallery .overlay').hide();
		}
	});
	$(document).on('click', '.hint, .mfp-content, .mfp-arrow, .menu .item', function(e){e.stopPropagation();});
	/* END подсказки */
	/* KS LOGO */
	var ks = $('#ks');
	var ks_link = ks.find('span');
	var ks_txt = ks_link.text();
	var ks_txt_ttl = ks.attr('title');

	ks.hover(function(){
		ks_link.text(ks_txt_ttl);
	}, function(){
		ks_link.text(ks_txt);
	});

	/* END KS LOGO */
	$('.accordeonLink').click(function(){
		var el = $(this),
			wrap = el.closest('.accordeonWrap'),
			hide_txt = el.data('hide'),
			show_txt = el.data('show');

		wrap.hasClass('open') ? el.text(hide_txt) : el.text(show_txt);
		wrap.toggleClass('open');
		return false;
	});
	$('.menu').each(function(){
		var menu = $(this);
		var name = menu.find('.name');
		name.click(function(){
			var self = $(this).closest('.item');
			var item = $('.menu .item');
			var overlay = $('#home-gallery .overlay');
			if(!self.hasClass('active')) {
				item.removeClass('active');
				overlay.show();
				self.addClass('active');
			} else {
				overlay.hide();
				item.removeClass('active');
			}
		});
	});

	$('.pageUp').click(function(){
		$("body, html").animate({scrollTop: 0}, 400);
	});

	$('#show-more').click(function(){
		var el = $(this),
			url = el.attr('href'),
			count = el.data('page');
		$.post(url, 'page='+count, function(data){
			var tpl_recommend,
				render = function() {
					var content = $(Mustache.render(tpl_recommend, data.recommend));
					$(content).insertAfter('.recommendWrap .item:last');
				};
			tpl_recommend = $(tpl).filter('#recommend_tpl').html();
			console.log($(tpl).filter('#recommend_tpl'));
			render();
			el.data('page', count + 1);
			var method = (data.recommend.count === false) ? 'hide' : 'show';
			el[method]();
		}, 'json');
		return false;
	});

	$('#photoGallery').fotorama({
		width            : 708,
		height           : 530,
		margin           : 0,
		nav              : 'thumbs',
		navposition      : 'bottom',
		thumbwidth       : 100,
		// thumbheight      : 75,
		thumbmargin      : 10,
		thumbborderwidth : 2,
		arrows           : false,
		shadows  		 : false
	});
	$('#objectGall').magnificPopup({
		preloader       : true,
		delegate        : 'a',
		fixedBgPos      : true,
		fixedContentPos : true,
		type            : 'image',
		tLoading        : 'Loading image',
		mainClass       : 'mfp-img-mobile',
		closeMarkup     : '<button title="close" class="mfp-close"></button>',
		image: {
            verticalFit: true,
			tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',

		}
	}).fotorama({
		width            : 480,
		margin           : 0,
		nav              : 'thumbs',
		navposition      : 'bottom',
		thumbwidth       : 120,
		thumbheight      : 80,
		thumbmargin      : 0,
		thumbborderwidth : 2,
		arrows           : false,
		click            : false,
		shadows          : false

	});
	$('#photoUp').magnificPopup({
		preloader    : true,
		disableOn    : 700,
		removalDelay : 160,
		delegate     : '.photo-up',
		type         : 'image',
		tLoading     : 'Loading image',
		mainClass    : 'mfp-img-mobile',
		gallery: {
			enabled            : true,
			navigateByImgClick : true,
			tPrev              : 'предыдущая', // Alt text on left arrow
			tNext              : 'следующая', // Alt text on right arrow,
			preload            : [0,2] // Will preload 0 - before current, and 1 after the current image
		},
		image: {
			verticalFit : true,
			tError      : '<a href="%url%">The image #%curr%</a> could not be loaded.',
			markup      : '<div class="mfp-figure">'+
				'<div class="top sertificate"><button title="close" class="mfp-close"></button></div>'+
				'<div class="mfp-img"></div>'+
				'<div class="mfp-bottom-bar">'+
				'<div class="mfp-title"></div>'+
				'</div>'+
			  '</div>', // Popup HTML markup. `.mfp-img` div will be replaced with img tag, `.mfp-close` by close button

			titleSrc: function(item) {
				return '<div class="name">' +
					item.el.attr('title') +
					'</div><div class="link"><a href="' +
					item.el.data('link') +
					'">'+item.el.attr('title') +
					'</a></div><div class="downloadWrap"><i class="downloadFile"></i><a class="lieLink" target="blank" href="'+
					item.el.data('download') +
					'">Скачать</span></a></div>';
			}
		}
	});
	$('.videoUp').magnificPopup({
		type      : 'inline',
		tLoading  : 'Loading video',
		mainClass : 'mfp-img-mobile'
	});
	$('.catalogList a').each(function(){
		var link = $(this);
		if(link.find('span').length === 2){
			link.hover(function(){
				link.find('span').hide();
				link.find('.active').css('display', 'block');
			}, function(){
				link.find('span').css('display', 'block');
				link.find('.active').css('display', 'none');
			});
		}
	});
	$('select').not('.js-not-chosen').chosen({
		disable_search_threshold: 10,
		width: "100%",
		search_contains: true
	});
	$('.tab-link').each(function(){
		var returnLocation = (history.location || document.location).search;
		var self = $(this);
		if(!returnLocation){
			$('.tabsWrap li').eq(0).addClass('active');
			$('.tab-content').eq(0).addClass('active');
		}
		self.click(function(){
			var el = $(this);
			var key = el.data('key');
			var param = parseInt(el.data('val'),10);
			var wrap = $('.tabsWrap li[data-val='+param+']');
			var objTabs = $('.objTabs');
			if(objTabs.length) $('body, html').animate({scrollTop: objTabs.position().top}, 400);

			$('.tabsWrap li, .tab-content').removeClass('active');
			wrap.addClass('active');
			$('#'+key+'-'+param).addClass('active');
			changeUrl(returnLocation, key, param);
			return false;
		});
	});
	/*$('.objOrderFrm').each(function(){
		var wrap = $(this);
		wrap.find('form').each(function(){
			var form = $(this);
			var bttnWrap = form.find('.withHint');

			form.on('change', 'select', function(){
				var select = $(this);
				var formVal = form.serialize();
				var changeSelect = select.hasClass('changeSelect') ? true : false;
				$.post('.', 'newPrice=1&changeSelect=' + changeSelect + '&' + form.serialize(), function(data){
					if (changeSelect === true ) {
						changeForm(data);
					} else {
						changePrice(data);
					}

				}, 'json');
			});
			function changeForm(data) {
				//if (!data.elements) return;
				var changeBox = form.find('.changeBox');
				var removeBox = form.find('.removeBox');
				var changeTpl;
				var render = function() {
					var content = $(Mustache.render(changeTpl, data.result));
					removeBox.remove();
					$(content).insertAfter(changeBox);
					form.find('select')
						.chosen({
							disable_search_threshold: 10,
							width: "100%"
						})
						.bind('change');
				};
				changeTpl = $(tpl).filter('#form_tpl').html();
				render();
			}
			function changePrice(data) {
				var basket = form.find('.basket-price');
				var bttnWrap = form.find('.withHint');

				basket.val(data.priceString);

				var inpSubmit = '<input type="submit" value="'+data.message+'" class="addToBasket inpSubmit">';

				bttnWrap.html(inpSubmit);

				var title = form.find('.title') || false;

				if (!title) {
					return;
				}

				title.text(data.article);

			}
			form.submit(function(){
				var count = form.find('.basket-count').val();
				if(!isNaN(count) && count > 0 && count.length > 0) {
					var hint_wrap = form.find('.withHint');
					var val = form.serialize();
					var bttnWrap = form.find('.withHint');
					var inpSubmit = bttnWrap.find('.inpSubmit');
					inpSubmit.prop('disabled', true);
					$.post('.', val, function (data) {
						var buttonTxt = '';
						if(data.result === 1) {
							buttonTxt = '<a class="inpSubmit addToBasket" href="'+ORDER_PAGE+'">'+data.message+'</a>';
							data.hintName = form.data('hint');
							data.hintCount = form.find('.basket-count').val();
							hint(hint_wrap, data);
						} else {
							buttonTxt = '<i class="sendError">'+data.message+'</i>';
						}
						inpSubmit.replaceWith(buttonTxt);
					}, 'json');
				}
				return false;
			});
		});
		wrap.on('keyup', '.basket-count', function(){
			var el = $(this);
			var wrap = el.closest('form');
			var count = parseInt(el.val(), 10);
			var price_wrap = wrap.find('.basket-price');
			var price = parseInt(price_wrap.data('val'), 10);


			if(!isNaN(count) && count > 0 && price > 0) price_wrap.val(digitRender(price*count));
		});
		function digitRender(d) {
			var d = d.toString();
			if (d.length > 3) {
				d = d.replace(/\B(?=(?:\d{3})+(?!\d))/g, ' ');
			}
			return d;
		};
	});*/
	$('.filter .lieTab').click(function(){
		if(!$(this).hasClass('active')){
			var returnLocation = (history.location || document.location).search;
			var el = $(this);
			var key = el.data('key');
			var param = parseInt(el.data('val'),10);
			$('.filter .lieTab').removeClass('active');
			el.addClass('active');
			$('.searchResultWrap').removeClass('open');
			$('#ajax-content').find('.'+key+'-'+param).addClass('open');
			changeUrl(returnLocation, key, param);
		}
	});
	/*страница поиска по сайту*/
	$('.more-result').click(function(){
		var returnLocation = (history.location || document.location).search;
		var el = $(this);
		var url = el.attr('href');
		var key = el.data('key');
		var param = parseInt(el.data('val'), 10);
		var wrap = el.closest('.searchResultWrap');
		$.post(url+'&page='+param, '' ,function(data){
			var tpl_search_more,
				render = function() {
					var content = $(Mustache.render(tpl_search_more, data.search_list));
					wrap.find('.searchResult').append(content);
				};
			tpl_search_more = $(tpl).filter('#search_tpl').html();
			render();
			++param;
			el.data('val', param);
			(data.search_list.count === false) ? el.hide() : el.show();
		}, 'json');
		return false;
	});
	$('.orderTbl .orederList').click(function(){
		var el = $(this),
			el_tr = el.closest('tr'),
			id = el_tr.data('id'),
			sub_tr = $('.orderTbl .subList[data-id='+id+']');
		if(el.hasClass('active')){
			sub_tr.hide();
			el.removeClass('active');
		} else {
			sub_tr.show();
			el.addClass('active');
		}
	});
	$('.orderTbl .del').click(function(){
        var el = $(this),
            wrap = el.closest('tr'),
            id = wrap.data('id');

		$('.orderTbl tr').filter('[data-id='+id+']').remove();
		if(!$('.orderTbl tr').length) $('.orderWrap').remove();
		$.post('?act=delete', 'ID='+id+'&TYPE='+wrap.attr('data-type'));
		orderSum();
	});
	$('.orderTbl .num').on('keydown, keyup', function(){
		var el = $(this);
		var count = el.val();
		var wrap = el.closest('tr');

		if(!isNaN(count) && count > 0) {
			$.post('?act=count', 'ID='+wrap.data('id')+'&COUNT='+el.val()+'&TYPE='+wrap.attr('data-type'));
			orderSum();
		}
	});
	$('.withPlaceholder').each(function(){
		var inp = $(this).find('input, textarea'),
			val = inp.val(),
			placeholder = $(this).find('.placeholder');
		val.length ? placeholder.hide() : ''

		inp.focusin(function(){
			placeholder.hide();
		}).focusout(function(){
			!($(this).val().length) ? placeholder.show() : '';
		});
		placeholder.click(function(){
			placeholder.hide();
			inp.trigger('focus')
		});
	});
	if($('.digit').length){
		$('.digit').numericInput();
	}
	if($('form').length){
		$('form').each(function(){
			$(this).require_form({
				form: $(this)
			});
		});
	}
	if($('#map').length){
		ymaps.ready(init_map);
	}
	if($('#contact').length){
		ymaps.ready(init_map_contact);
	}
	if($('#dealerMap').length){
		ymaps.ready(init_map_dealer);
	}
	//$('.dealerList .lieLink').click(function(){ return false; });
	'use strict';
	 /*$('.inpFile').fileupload({
        url: '',
        dataType: 'json',
		progress:function(){
			var wrap = $(this).closest('.fileUpWrap');
			wrap.hide();
			if(!$('.loaderWrap').length) $('<p class="loaderWrap"><span class="loader"><img src="/i/loader.gif" /></span></p>').insertAfter(wrap);
		},
		done:function (e, data) {
			var wrap = $(this).closest('.fileUpWrap');
			var tpl_file,
				render = function() {
					$.each(data.jqXHR.responseJSON.files, function (index, file) {
						file.type = 'noname';
						var content = $(Mustache.render(tpl_file, file));
						$(content).insertBefore('.fileUpWrap');
						$('.loaderWrap').remove();
						wrap.show();
					});
				};
			tpl_file = $(tpl).filter('#file_tpl').html();
			render();
		}
    });
	$('.sendWrap form').submit(function(){
		var el = $(this),
			wrap = el.closest('.sendWrap');
		$.post('', el.serialize(), function(data){
			if(data.status === true){
				el.trigger('reset');
				el.find('.require-inp').addClass('empty');
				el.find('.inpSubmit').prop('disabled', true);
				el.find('.placeholder').show();
				wrap.find('.inner').addClass('accordeon');
				wrap.prepend('<div class="resultSend"><h2>'+data.header+'</h2><p>'+data.body+'.<br/><span class="lieLink">'+data.link+'</span></p></div>');
			}
		},'json');
		return false;
	});
	$('.sendWrap').on('click', '.fileDel', function(){
		$(this).closest('p').remove();
		$.post('', 'fileDel='+$(this).data('del'));
	}).on('click', '.lieLink', function(){
		var wrap = $(this).closest('.sendWrap');
		wrap.find('.accordeon').show().removeClass('accordeon');
		wrap.find('.resultSend').remove();
	});*/
	/*$('#filter').each(function() {
		var constructor = new Constructor();
       // constructor.render();
	});*/
});
function init_map(){
	$(this).point(dataMap);
}
function init_map_dealer(id){
	var myMap = new ymaps.Map('dealerMap', {
			center: [54.857781, 83.108133],
			zoom: 10
		});
	myMap.controls.add('zoomControl', { left: 5, top: 5 });
	var placemark;
	$('.dealerList').magnificPopup({
		delegate: '.lieLink',
		type: 'inline',
		modal: true,
		callbacks: {
			elementParse: function(item) {
				var el = item.el;
				var id = el.data('id');
				var name = el.data('name');
				$('#map-name').text(name);
				placemark = new ymaps.Placemark([mapSettings[id][0], mapSettings[id][1]], {
					balloonContentBody: '<p class="name">'+mapSettings[id][2]+'</p><p>'+mapSettings[id][3]+'</p>',
				}, {
					iconImageHref:'',
					balloonCloseButton: false,
					// Не скрывать иконку метки при открытии балуна
					hideIconOnBalloonOpen: true,
				});
				myMap.geoObjects.add(placemark);
				placemark.balloon.open();
			},
			close: function() {
				myMap.geoObjects.remove(placemark);
			}
		}
	});
}
function init_map_contact(){
	var myMap = new ymaps.Map('contact', {
			center: [59.969833,30.312781],
			zoom: 15
		}),
		myPlacemark = new ymaps.Placemark([59.971118, 30.312769], {}, {
			iconImageHref: '/i/marker-contact.png',
			iconImageSize: [134, 54],
			iconImageOffset: [-67, -54]
		}),
		line = new ymaps.Polyline([
            [59.966326, 30.311117],
            [59.971113, 30.306729],
            [59.970963, 30.312737],
            [59.971118, 30.312769]
        ], {}, { balloonHasCloseButton:false, strokeWidth: 5, strokeColor: 'ff0000'});
	myMap.controls.add('zoomControl', { left: 5, top: 5 });

	myMap.geoObjects.add(myPlacemark).add(line);
}
function orderSum() {
    $('[data-type="constr"]').not('.subList').each(function(){
        var $this = $(this),
            $priceTotal = $this.find('.price'),
            $priceBlock = $this.find('.price-one'),
            $price = parseInt(0),
            $count = parseInt($this.find('.count input').val());
		
        $('.subList[data-type="constr"][data-id="'+ $this.attr('data-id') +'"]').each(function(){
            var $this = $(this);
            $price += parseInt($this.find('.price-one').attr('data-price')) * $this.find('.count .info').text();
        });

        if($price == 0){
            $priceBlock.attr('data-price', $price).text('По запросу');
            $priceTotal.attr('data-price', $price).text('По запросу');
        } else{
            $priceBlock.attr('data-price', $price).html(number_format($price, 0, '.', ' ') + ' &#8381;');
            $priceTotal.attr('data-price', $price * $count).html(number_format($price * $count, 0, '.', ' ') + ' &#8381;');
        }
    });

    var sum = 0;
    var el = $(this);
    $('.orderTbl tr').not('.subList').each(function(){
        var el = $(this);

        if(typeof(el.attr('data-type')) != 'undefined' && el.attr('data-type') == 'constr'){
            var val = parseInt(el.find('.num').val(),10) || 0,
                price = parseInt(el.find('.price').attr('data-price'), 10) || 0;

            sum += price;
        } else {
            var val = parseInt(el.find('.num').val(),10) || 0,
                price = parseInt(el.find('.price-one').attr('data-price'), 10) || 0;

            var curPrice = val * price;
            sum += curPrice;

            if(curPrice == 0){
                el.find('.price').attr('data-price', 0).html('По запросу');
            } else {
                el.find('.price').attr('data-price', curPrice).html(number_format(curPrice, 0, '.', ' ') + ' &#8381;');;
            }
        }


    });

    if(parseInt(sum) == 0){
        sum = 'по запросу';
    } else {
        sum = accounting.formatMoney(
            sum, {
                symbol : "$",
                decimal : "",
                thousand: " ",
                precision : 0,
                format: "%v"
            }
        );

        sum += ' &#8381;';
    }

    $('#summ').html(sum);
}