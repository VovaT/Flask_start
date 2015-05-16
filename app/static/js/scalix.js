(function($, undefined){
    //var a = $(document.getElementsByClassName("scalix_menu"))
    //console.log(a);
    //console.log(this)
    $(".scalix_menu_target").bind("contextmenu", function(e) {
        e.preventDefault();
        if ($(this).children().css('display') == 'none'){
            s = $(this).children().css({"top": event.pageY +  "px", "left": event.pageX +  "px"}).show();
        }
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

})(jQuery);



(function($, undefined){
    //var a = $(document.getElementsByClassName("scalix_menu"))
    //console.log(a);
    //console.log(this)

    var max_width = 100;
    var def_width = 50;
    var w;
    $(".list_item").bind("contextmenu", function(e) {
        console.log($(this).children())
        e.preventDefault();
        element = $(this).children()
        var s;
        if ($(this).children().css('display') == 'none'){
            s = $(this).children().css({"top": event.pageY +  "px", "left": event.pageX +  "px"}).show();
            //$(s).width(def_width);
        }

        // hide menu when button pressed not on element or not on element all children
        $(document).mouseup(function (e){ // событие клика по веб-документу
   		        if (!element.is(e.target) // если клик был не по нашему блоку
		            && element.has(e.target).length === 0) { // и не по его дочерним элементам
			        element.find('.submenu').hide()
			        element.hide(); // скрываем его
		        }
	        });
     });

    $(".menu_item").bind("click", function(e) {
        //console.log($(this).children())
        e.preventDefault();
        //element = $(this).children()
        var s;
        if ($(this).children().css('display') == 'none'){
            s = $(this).children().css({"top": event.pageY +  "px", "left": event.pageX +  "px"}).show();
            //$(s).width(def_width);
        }

        if (s){
            $(document).mouseup(function (e){ // событие клика по веб-документу
   		        if (!s.is(e.target) // если клик был не по нашему блоку
		            && s.has(e.target).length === 0) { // и не по его дочерним элементам
			        s.find('.submenu').hide()
			        s.hide(); // скрываем его

		        }
	        });
	    }
    });


/*
function sx_action(el, action_a) {
    console.log(action_a);
}
*/
})(jQuery);


