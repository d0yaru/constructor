$(document).on('submit', '.js-form', function(e){
    e.preventDefault();

    var $form = $(this),
        url = $(this).attr('action'),
        data = $form.serialize(),
        error = false,
        wrap = $form.closest('.sendWrap');

    if(!$form.hasClass('is-loading')){

        $form.find('.require-inp').each(function(){
            var $input = $(this);
            if( $input.length && (!$.trim($input[0].value).length || $input[0].value == "") ) {
                $input.addClass('error');
                error = true;
            }
        });        

        if(!error){
            $form.addClass('is-loading');
            $.ajax({
                url: url,
                data: new FormData($form.get(0)),
                type: 'POST',
                processData: false,
                contentType: false,
                dataType: 'json'
            }).done(function( r ) {
                $form.trigger('reset');
                $form.find('.file-display').remove();

                wrap.find('.inner').addClass('accordeon');
                wrap.prepend('<div class="resultSend"><h2>'+r.header+'</h2><p>'+r.text+'<br/><span class="lieLink">'+r.link+'</span></p></div>');
                $form.removeClass('is-loading');

                wrap.on('click', '.lieLink', function(){
                    wrap.find('.accordeon').removeClass('accordeon');
                    wrap.find('.resultSend').remove();
                    $form.find('.placeholder').show();
                });

                // targets
                if ($form.attr('action').indexOf("act=form1") > 0) {
                    if (typeof ym != 'undefined') {
                        ym(44925766,'reachGoal','obchievoprosi');
                        //ym(44925766,'reachGoal','obratnaya_svyaz');
                    }
                    if (typeof gtag != 'undefined'){
                        gtag('event', 'obchievoprosi', {'event_category':'one'});
                        //gtag('event', 'obratnaya_svyaz', {'event_category':'one'});
                    }
                    console.log('reachGoal - form obchievoprosi');
                } else if ($form.attr('action').indexOf("act=form2") > 0) {
                    if (typeof ym != 'undefined') {
                        ym(44925766,'reachGoal','uchastievseminare');
                    }
                    if (typeof gtag != 'undefined'){
                        gtag('event', 'uchastievseminare', {'event_category':'one'});
                    }
                    console.log('reachGoal - form uchastievseminare');
                } else if ($form.attr('action').indexOf("act=form3") > 0) {
                    if (typeof ym != 'undefined') {
                        ym(44925766,'reachGoal','nestandartoborudovanie');
                    }
                    if (typeof gtag != 'undefined'){
                        gtag('event', 'nestandartoborudovanie', {'event_category':'one'});
                    }
                    console.log('reachGoal - form nestandartoborudovanie');
                }

            });
        }
    }

    return false;
});

$(function(){
    $('.file-to-upload').on('change', function(){
        updateFiles($(this));
    });

    function updateFiles(file){
        var filename = file.val().split('\\'),
            form = file.parents('form');
        filename = filename[filename.length - 1];

        $('.fileUpWrap', form).before('<p class="file-display"><i class="downloadIco noname"></i> ' + filename + ' <span class="fileDel" data-del="' + filename + '"></span></p>');

        file.removeAttr('id').attr('name', 'files[]').detach().appendTo('.file-display:last', form);
        $('.js-file', form).append('<input class="inpFile file-to-upload" type="file">');
        $('.file-to-upload', form).on('change', function(){
            updateFiles($(this));
        });

        $('.file-display', form).find('.fileDel').on('click', function(e) {
            e.preventDefault();
            $(this).parent().remove();
        });
    }

    $('.js-form-articles').each(function(){
        var $form = $(this);
        $('.js-type-articles', $form).on('change', function(){
            $('select', $form).not($(this)).parent().hide();
            $('select[data-type="'+ $(this).val() +'"]', $form).not($(this)).parent().show();
        });

        $('select', $form).on('change', function(){
            recalculatePrice($form);
            var parent = $(this).parents('form');

            parent.find('.addToBasket').show();
            parent.find('.js-go-to-basket').hide();
        });

        $('.basket-count', $form).on('change, keyup', function(){
            recalculatePrice($form);
        });

        recalculatePrice($form);
    });

    function recalculatePrice(form){
        var articleKey = form.attr('data-id');

        if(typeof(TYPE_REF) != "undefined" && articleKey in TYPE_REF){
            var currentType = $('select[name="TYPE"]', form).val();
            if(currentType in TYPE_REF[articleKey]){
                $('select, input[type="hidden"]', form).not('[name="TYPE"]').each(function(){
                    if($(this).attr('name') in TYPE_REF[articleKey][currentType]){
                        $(this).parent().parent().show();
                    } else {
                        $(this).parent().parent().hide();
                    }
                });
            }
        }

        $('select, input[type="hidden"]', form).not(".js-not-key").each(function(){
            if($(this).parent().css('display') != 'none' && $(this).parent().parent().css('display') != 'none')
                articleKey += $(this).val();
        });

        if(articleKey in ARTICLES_FORM && typeof(ARTICLES_FORM) != "undefined"){
            var count = parseInt($('.basket-count', form).val()),
                price = parseInt(ARTICLES_FORM[articleKey]['PRICE']) * count;

            if(price == 0)
                price = 'По запросу';

            if(!isNaN(price) && typeof(price) == 'number'){
                $('.js-article-title', form).html(ARTICLES_FORM[articleKey]['ARTICLE']);
                $('.basket-price', form).val(number_format(price, 0, '.', ' ')).attr('data-val', price);
            } else {
                $('.js-article-title', form).html('&nbsp;');
                $('.basket-price', form).val(price).attr('data-val', price);
            }
        } else {
            $('.js-article-title', form).html('&nbsp;');
            $('.basket-price', form).val('По запросу').attr('data-val', 'По запросу');
        }
    }
	
	function inArray(needle, haystack) {
		var length = haystack.length;
		for(var i = 0; i < length; i++) {
			if(haystack[i] == needle) return true;
		}
		return false;
	}

    $('.addToBasket').on('click', function(e){
        e.preventDefault();
		var showPopup = {
			popup_id: "antistat-nozh",
			items: [
				4681,
				4690,
				20279,
				20284,
				20281,
				4693,
				23713,
				4698,
				4701,
				4696,
				4703,
				5332,
				4684
			]
		};
		
		var $prod_id = $(this).parents('.js-form-articles').attr('data-id');
		if (inArray($prod_id, showPopup.items)){
			$.magnificPopup.open({
				  items: {
					src: '<div class="white-popup">К антистатическому стулу требуется заказать <a target="_blank" href="/production/esd_chairs/antistaticheskie_nozhki_vkg_f_05/">антистатические ножки</a> или <a target="_blank" href="/production/esd_chairs/antistaticheskie_kolesa/">антистатические колеса</a></div>', // can be a HTML string, jQuery object, or CSS selector
					type: 'inline'
				  },
				  closeBtnInside: true
			});
		}
		
        var $form = $(this).parents('form'),
            articleKey = $form.attr('data-id'),
            button = $(this);

        $('select, input[type="hidden"]', $form).not(".js-not-key").each(function(){
            if($(this).parent().css('display') != 'none')
                articleKey += $(this).val();
        });
		console.log(articleKey);
        if(articleKey in ARTICLES_FORM && typeof(ARTICLES_FORM) != "undefined"){
            var count = parseInt($('.basket-count', $form).val()),
                id = parseInt(ARTICLES_FORM[articleKey]['ID']);
			
			var $add_params = [];
			$form.find('.js-not-key').each(function(){
				$label = $(this).parents('.frmBox').find('.inpLbl').text();
				$value = $(this).val();
				$add_params.push($label+": "+$value);
			});
			console.log($add_params);
			
            if(!isNaN(id) && count > 0){
                $.ajax({
                    url: $form.attr('action'),
                    method: 'post',
                    data: {
                        "ID": id,
                        "COUNT": count,
						"ADD_PARAMS": $add_params
                    },
                    type: 'POST',
                    dataType: 'json'
                }).done(function( r ) {
                    button.hide();
                    button.siblings('.js-go-to-basket').show();

                    showMsg(button, r.text);

                    if(!$('.service').hasClass('withBasket'))
                        $('.service').addClass('withBasket');

                    if(!$('.js-cart-total').length)
                        $('.service').prepend('<a href="/order/" class="lieButton js-cart-total">'+ r.basketText+'</a>');
                    else
                        $('.js-cart-total').html(r.basketText);
                });
            } else {
                showMsg(button, JS_LANG['CANT_ADD_TO_BASKET']);
            }
        } else {
            showMsg(button, JS_LANG['CANT_ADD_TO_BASKET']);
        }
    });

    function showMsg(div, msg){
        div.parent().append('<div class="hint">' + msg + ' <i class="arr"></i></div>');
        setTimeout("$('.hint').remove()", 2000);
    }

    $('#city').on('change', function(){
        showDealersInCity();
        $('#map').trigger('setCenter');
    });

    if($('#orderSend').length){
        showDealersInCity();
    }

    function showDealersInCity(){
        $('.partnerWrap .js-dealers').hide();
        $('[data-city-id="' + $('#city').val() + '"]').show();
        showDealer();
        $('#map').trigger('setMarker');
    }

    $('.js-dealer').on('change', function(){
        showDealer();
        $('#map').trigger('setMarker');
    });

    $('#orderSend').on('submit', function(e){
        e.preventDefault();

        var $form = $(this),
            url = $(this).attr('action'),
            data = $form.serialize(),
            error = false;

        if(!$form.hasClass('is-loading')){
            $form.find('.require-inp').each(function(){
                var $input = $(this);
                if( $input.length && (!$.trim($input[0].value).length || $input[0].value == "") ) {
                    $input.addClass('error');
                    error = true;
                }
            });

            if(!error){
                $form.addClass('is-loading');
                $.ajax({
                    url: url,
                    data: new FormData($form.get(0)),
                    type: 'POST',
                    processData: false,
                    contentType: false,
                    dataType: 'json'
                }).done(function( r ) {
                    if(r.status == 1) {
                        $('.orderSend').html('<p>'+r.text+'</p>');

                        // target (7)
                        if (typeof ym != 'undefined') {
                            ym(44925766,'reachGoal','formadistriba');
                        }
                        if (typeof gtag != 'undefined'){
                            gtag('event', 'formadistriba', {'event_category':'one'});
                        }
                        console.log('reachGoal - form formadistriba');

                    } else {
                        $('.orderSend .col:first').append('<p>'+r.text+'</p>');
                    }
                    $form.removeClass('is-loading');
                });
            }
        }

        return false;
    });

    $('.js-save-to-computer').on('click', function(e){
        e.preventDefault();

        if(typeof(ID) != "undefined" && typeof(COMPL) != "undefined"){
            window.location.href = '?' + $.param({save: 1, id: ID, compl: COMPL});
        }

        return false;
    });

    updateConstrPrices();

    $('#constructor-type.js-not-chosen').chosen({
        disable_search_threshold: 10,
        width: "100%",
        search_contains: true
    }).change(function(e){
        window.location.href = $(e.target).val();
    });

    $('.tooltip-content span').on('click', function(){
        var $this = $(this);

        if(!$this.hasClass('tooltip-active'))
            $this.addClass('tooltip-active');

        $this.find('input').prop('checked', true);
        $this.siblings('span').removeClass('tooltip-active').find('input').prop('checked', false);

        if(typeof(updateConstructor) == 'function'){
            updateConstructor();
        }
    });
    
    $('.js-auto-props').on('click', function(e){
        e.preventDefault();
        var $this = $(this),
            $selector = '';

        $('.tooltips-opened').removeClass('tooltips-opened');
        if($this.siblings('.tooltip-content').length > 0){
            $this.parent().addClass('tooltips-opened');
        }
    });
});

function updateConstrPrices(){
    orderSum();
}

function number_format( number, decimals, dec_point, thousands_sep ) {	// Format a number with grouped thousands
    //
    // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +	 bugfix by: Michael White (http://crestidg.com)

    var i, j, kw, kd, km;

    // input sanitation & defaults
    if( isNaN(decimals = Math.abs(decimals)) ){
        decimals = 2;
    }
    if( dec_point == undefined ){
        dec_point = ",";
    }
    if( thousands_sep == undefined ){
        thousands_sep = ".";
    }

    i = parseInt(number = (+number || 0).toFixed(decimals)) + "";

    if( (j = i.length) > 3 ){
        j = j % 3;
    } else{
        j = 0;
    }

    km = (j ? i.substr(0, j) + thousands_sep : "");
    kw = i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands_sep);
    //kd = (decimals ? dec_point + Math.abs(number - i).toFixed(decimals).slice(2) : "");
    kd = (decimals ? dec_point + Math.abs(number - i).toFixed(decimals).replace(/-/, 0).slice(2) : "");


    return km + kw + kd;
}


function showDealer(){
    var selectedDealer = $('[data-city-id="' + $('#city').val() + '"] select').val();
    $('.partnerInfo').hide();
    $('[data-dealer-id="' + selectedDealer + '"]').show();
    $('.js-distributor-value').val(selectedDealer);
}

function resetConstructor(){
    var $form = $('#filter');

    $form.find('input[type="checkbox"], input[type="radio"]')
        .not('[name="material"], [name="size"], [name="base"]')
        .each(function(){
            var $type = $(this).attr('type');

            $(this).prop('checked', false);

            $(this).parent().removeClass('active')
                .siblings('span.lieLink').remove();
    });

    updateConstructor();
}


