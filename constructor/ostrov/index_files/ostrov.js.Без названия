$(function(){
    if($('.designerShowWrap').length){
        $(window).scroll(function(){
            var position = $(this).scrollTop(),
                img_position = Math.floor($('.designerShowWrap').position().top);
            if (position > img_position) {
                $('.designerShow').css({
                    'position' : 'fixed',
                    'top' : 0
                })
            } else {
                $('.designerShow').removeAttr('style');
            }
        });
    }

    $('.tabGroup, .radioTab, .radioStyle, .checkboxStyle').on('click', function(e){
        e.preventDefault();
        var $this = $(this),
            $selector = '',
            $inputName = $this.find('input').attr('name');

        if($this.hasClass('disabled')) return;

        if($this.hasClass('tabGroup')){
            $selector = 'tabGroup';
        } else if($this.hasClass('radioTab')){
            $selector = 'radioTab';
        } else if($this.hasClass('radioStyle')){
            $selector = 'radioStyle';
        } else if($this.hasClass('checkboxStyle')){
            $selector = 'checkboxStyle';
        }

        if(!$this.hasClass('active')){
            if(!$this.hasClass('checkboxStyle')){
                //$this.parent().parent()
                //    .find('.' + $selector).removeClass('active').find('input').prop('checked', false);
                $this.parent().parent()
                    .find('[name="'+$inputName+'"]').prop('checked', false).parent().removeClass('active');
                //$this.parent().parent()
                //    .find('.lieLink').remove();
                $this.parent().parent()
                    .find('[name="'+$inputName+'"]').parent().siblings('.lieLink').remove();
            }
            $this.addClass('active').find('input').prop('checked', true);
        } else if(!$this.hasClass('radioTab') && !$this.hasClass('tabGroup') && $this.find('input[name="base"]').length <= 0) {
            $this.removeClass('active').find('input').prop('checked', false);
            $this.parent().find('.lieLink').remove();
        }

        $('.tooltips-opened').removeClass('tooltips-opened');
        if($this.siblings('.tooltip-content').length > 0 && $this.hasClass('active')){
            $this.parent().addClass('tooltips-opened');
        }

        if($('.js-go-to-basket-btn').length > 0){
            $('.js-go-to-basket-btn').remove();
            $('.js-submit-btn').show();
        }

        updateConstructor();
    });

    $('.filterTab .inpLbl').on('click', function(){
        var $this = $(this);

        if($this.hasClass('press')) return;

        $this.addClass('press').siblings('p').removeClass('press');
        $this.siblings('div')
            .hide()
            .find('input')
            .prop('checked', false)
            .parent().removeClass('active');
        $this.next('div').show();

        updateConstructor();
    });

    $('label').on('mouseenter', function(){
        var $this = $(this),
            $input = $this.find('input'),
            $material = $('input[name="material"]:checked').val(),
            $size = $('input[name="size"]:checked').val(),
            $base = $('input[name="base"]:checked').val();

        if(!CONSTR_DATA.hasOwnProperty($material)) return;
        if(!CONSTR_DATA[$material].hasOwnProperty($size)) return;


        var $subData = CONSTR_DATA[$material][$size];
        if(!$subData.hasOwnProperty($input.attr('name'))) return;
        if(!$subData[$input.attr('name')].hasOwnProperty($input.attr('value'))) return;

        $.each($subData[$input.attr('name')][$input.attr('value')], function(index, value){ // TODO: тут возможно надо будет добавить цвет, чтобы не в цикле искать
            if(!value.hasOwnProperty('HINT')) return;
            if(value['HINT'].length <= 0) return;

            $this.append('<span class="lblHint">' + value['HINT'] + '</span>');
        });
    }).on('mouseleave', function(){
        var $this = $(this),
            $maybeHint = $this.find('.lblHint');

        if($maybeHint.length > 0){
            $maybeHint.remove();
        }
    });

    $('.js-submit-ostrov').on('click', function(e){
        e.preventDefault();
        var $form = $(this).parents('form'),
            button = $(this);

        $.ajax({
            url: $form.attr('action'),
            method: 'post',
            data: {
                "ID": ID,
                "COMPL": COMPL
            },
            type: 'POST',
            dataType: 'json'
        }).done(function( r ) {
            showMsg(button, r.text);
            button.hide();
            button.after(ORDER_BTN);

            if(!$('.service').hasClass('withBasket'))
                $('.service').addClass('withBasket');

            if(!$('.js-cart-total').length)
                $('.service').prepend('<a href="/order/" class="lieButton js-cart-total">'+ r.basketText+'</a>');
            else
                $('.js-cart-total').html(r.basketText);

            resetConstructor();
        });
    });

    $('#print').on('click', function(e){ // TODO: возможно надо будет переделать, т.к. добавится выбор цвета
        e.preventDefault();

        var $data = {},
            $material = $('input[name="material"]:checked').val(),
            $size = $('input[name="size"]:checked').val();

        if(!CONSTR_DATA.hasOwnProperty($material)) return;
        if(!CONSTR_DATA[$material].hasOwnProperty($size)) return;

        $('input[type="checkbox"]:checked, input[type="radio"]:checked, [name="middle-bar"]:checked, [name="set-bar"]:checked')
            .not(':disabled')
            .not('[name="material"], [name="color"], [name="size"]')
            .each(function() {
                var $this = $(this),
                    $name = $this.attr('name'),
                    $val = $this.val(),
                    $color = 1;

                if($this.parent().siblings('.tooltip-content').length > 0){
                    $color = $this.parent().siblings('.tooltip-content').find('.tooltip-active input').val();
                }

                if(!$data.hasOwnProperty($name)) $data[$name] = {};

                $data[$name][$val] = $color;
            });

        $.ajax({
            url: '?print',
            data: {
                "MATERIAL": $material,
                "SIZE": $size,
                "DATA": $data
            },
            type: 'POST'
        }).done(function( r ) {
            var newWin = window.open('', print, "width=800,height=600,resizable=yes,scrollbars=yes,status=yes");
            newWin.document.write(r);
            newWin.focus();
            setTimeout(function() {
                newWin.print();
            }, 100);
        });
    });

    updateConstructor();
});

function showMsg(div, msg){
    div.parent().append('<div class="hint">' + msg + ' <i class="arr"></i></div>');
    setTimeout("$('.hint').remove()", 2000);
}

function disableBySelector(selector){
    $(selector)
        .prop('disabled', true)
        .parent().addClass('disabled');
}

function enableBySelector(selector){
    $(selector)
        .prop('disabled', false)
        .parent().removeClass('disabled');
}

function updateConstructor(){
    var $data = [],
        $price = $('.priceWrap .price'),
        $newPrice = 0,
        $material = $('input[name="material"]:checked').val(),
        $size = $('input[name="size"]:checked').val(),
        $baseSelector = $('input[name="base"]:checked'),
        $base = $baseSelector.val(),
        $baseColor = 1; // по-умолчанию цвет лежит в ключе 1

    if($baseSelector.parent().siblings('.tooltip-content').length > 0){
        $baseColor = $baseSelector.parent().siblings('.tooltip-content').find('.tooltip-active input').val();
    }

    /*
     * если выбрано антистатическое исполнение то выбираем колодку (скрытый элемент в калькуляторе)
     */
	if($('[name="material"]:checked').not(':disabled').val() == 2){
		$('[name="kolodka"]').parent().addClass('active').find('input').prop('checked', true);
	}
	else{
		$('[name="kolodka"]').parent().removeClass('active').find('input').prop('checked', false);
	}
	
	/*
     * если выбрана нижняя полка передняя, то деактивируем подвесную тумбу переднюю шириной 35
     */
    if($('[name="rack-down-front"]:checked').not(':disabled').length > 0){
        disableBySelector('[name="stand-front"][value="2"], [name="stand-front"][value="4"]');
    } else {
        enableBySelector('[name="stand-front"][value="2"], [name="stand-front"][value="4"]');
    }

    /*
     * если выбрана передняя тумба шириной 35, то деактивируем нижнюю полку переднюю
     */
    if($('[name="stand-front"][value="2"]:checked, [name="stand-front"][value="4"]:checked').not(':disabled').length > 0){
        disableBySelector('[name="rack-down-front"]');
    } else {
        enableBySelector('[name="rack-down-front"]');
    }

    /*
     * если выбрана нижняя полка задняя, то деактивируем подвесную тумбу заднюю шириной 35
     */
    if($('[name="rack-down-back"]:checked').not(':disabled').length > 0){
        disableBySelector('[name="stand-back"][value="2"], [name="stand-back"][value="4"]');
    } else {
        enableBySelector('[name="stand-back"][value="2"], [name="stand-back"][value="4"]');
    }

    /*
     * если выбрана задняя тумба шириной 35, то деактивируем нижнюю полку заднюю
     */
    if($('[name="stand-back"][value="2"]:checked, [name="stand-back"][value="4"]:checked').not(':disabled').length > 0){
        disableBySelector('[name="rack-down-back"]');
    } else {
        enableBySelector('[name="rack-down-back"]');
    }

    /*
     * если выбрано освещение рабочей поверхности, то активируем инструментальную планку переднюю и заднюю
     */
    if($('[name="light"]:checked, [name="light-1"]:checked').not(':disabled').length > 0){
        enableBySelector('[name="instrumental-strap-front"], [name="instrumental-strap-back"]');
    } else {
        disableBySelector('[name="instrumental-strap-front"], [name="instrumental-strap-back"]');
    }

    /*
     * если выбранодно освещение, то деактивируем другое
     */
    if($('[name="light"]:checked').not(':disabled').length > 0){
        disableBySelector('[name="light-1"]');
    } else {
        enableBySelector('[name="light-1"]');
    }
    if($('[name="light-1"]:checked').not(':disabled').length > 0){
        disableBySelector('[name="light"]');
    } else {
        enableBySelector('[name="light"]');
    }

    /*
     * пробегаемся по кнопкам "Убрать" и если рядом с ними деактивированный пункт, то удаляем их
     */
    $('.lieLink').each(function(){
        var $this = $(this),
            needRemove = false;

        if($this.siblings('label.disabled').length > 0){
            needRemove = true;
        }

        if($this.siblings('label').find('input:checked').length <= 0){
            needRemove = true;
        }

        if(needRemove){
            $this.remove();
        }
    });

    /*
     * пробегаемся по radio и если они выбраны, то добавляем кнопку "Убрать"
     */
    $('[type="radio"]').not('[name="base"]').not('[name="color"]').not('[name="size"]').not('[name="material"]').each(function(){
        var $this = $(this),
            needAdd = false;

        if($this.parent().siblings('.lieLink').length > 0) return;

        if($this.is(':checked')){
            needAdd = true;
        }

        if($this.parent().hasClass('disabled')){
            needAdd = false;
        }

        if(needAdd){
            $this.parent().after(DEL_BTN);
        }

        $('.lieLink').off().on('click', function(){
            var $this = $(this);

            $this.siblings('label').removeClass('active')
                .find('input').prop('checked', false);

            $this.remove();

            $('.tooltips-opened').removeClass('tooltips-opened');

            updateConstructor();
        });
    });

    if(!CONSTR_DATA.hasOwnProperty($material)) return;
    if(!CONSTR_DATA[$material].hasOwnProperty($size)) return;

    $data = CONSTR_DATA[$material][$size];
    //$newPrice = $data['base'][$base][$baseColor]['PRICE'];
    ID = $data['base'][$base][$baseColor]['ID'];
    COMPL = [];

    /*
     * проставляем изображения и считаем цену
     */
	var on_request = false;
    var $imagesBlock = $('.designerShow');
    $imagesBlock.find('img').remove();
    $('input[type="checkbox"]:checked:visible, input[type="radio"]:checked:visible, [name="middle-bar"]:checked, [name="set-bar"]:checked')
        .not(':disabled')
        .not('[name="material"], [name="color"], [name="size"]')
        .each(function(){
            var $this = $(this),
                $name = $this.attr('name'),
                $val = $this.val(),
                $color = 1;


            if(!$data.hasOwnProperty($this.attr('name'))) return;
            if(!$data[$this.attr('name')].hasOwnProperty($this.attr('value'))) return;

            if($this.parent().siblings('.tooltip-content').length > 0){
                $color = $this.parent().siblings('.tooltip-content').find('.tooltip-active input').val();
            }

            var $subData = $data[$this.attr('name')][$this.attr('value')][$color];
			
			if (parseInt($subData['PRICE']) == 0) on_request = true;
            if($subData.hasOwnProperty('PRICE')){
                $newPrice = parseInt($newPrice) + parseInt($subData['PRICE']);
            }

            if($subData.hasOwnProperty('ID')){
                COMPL.push($subData['ID']);
            }

            if($subData.hasOwnProperty('IMG')){
                if($subData['IMG'].length > 0)
                    $imagesBlock.append('<img src="' + $subData['IMG'] + '" class="' + $name + '">');
            }

        });

    if (on_request){
		$(".price-currancy").hide();
		$price.text("по запросу");
	}
	else{
		$(".price-currancy").show();
		$price.text(number_format($newPrice, 0, '.', ' '));
	}
}