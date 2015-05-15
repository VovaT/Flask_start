(function($, undefined){
//var a = $(document.getElementsByClassName("scalix_menu"))
//console.log(a);
    console.log(this)

    $(".scalix_menu_target").bind("contextmenu", function(e) {
    e.preventDefault();
     //console.log($(this).context)
     //e.preventDefault();
     //e.stopPropagation();
     //console.log(this)
     //console.log($(this))
     //var parentOffset = $(this).offsetParent();

    if ($(this).children().css('display') == 'none'){
        s = $(this).children().css({"top": event.pageY +  "px", "left": event.pageX +  "px"}).show();
    }

    // create and show menu
    });
    $(document).mouseup(function (e){ // событие клика по веб-документу
		var div = $(".scalix_menu"); // тут указываем ID элемента
		if (!div.is(e.target) // если клик был не по нашему блоку
		    && div.has(e.target).length === 0) { // и не по его дочерним элементам
			div.hide(); // скрываем его
		}
	});

    $(document).bind("click", function(e){
        if (!$(e.target).parents(".scalix_menu_target").length > 0) {
        $(".scalix_menu_target").children().hide();
        }
    });
  /*
    $('.scalix_menu').on('click', function(e){
        if ($(this).children().css('display') == 'none'){
            var mouseX = e.pageX
            var mouseY = e.pageY

           /* var boundsX = $(window).width()
            var boundsY = $(window).height()
            var menuWidth = $(this).outerWidth()
            var menuHeight = $(this).outerHeight()
            var X, Y
            if (mouseY + menuHeight > boundsY) {
				Y = {"top": mouseY - menuHeight + $(window).scrollTop()};
			}
			else {
				Y = {"top": mouseY + $(window).scrollTop()};
			}

			if ((mouseX + menuWidth > boundsX) && ((mouseX - menuWidth) > 0)) {
				X = {"left": mouseX - menuWidth + $(window).scrollLeft()};
			}
			else {
				X = {"left": mouseX + $(window).scrollLeft()};
			}

            console.log($(this).children()[0].textContent);
            $(this).children().css({top: mouseY, left: mouseX, position:'absolute'});
            //$(this).children().offset({ top: mouseY, left:mouseX})
            $(this).children().show();
            console.log(mouseX, mouseY);
            console.log($(this).position())


            console.log('Show');

         }
         else{
             $(this).children().hide();
             console.log('hide');
         }


    });
*/
})(jQuery);