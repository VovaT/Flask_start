// hide menu when button pressed not on element or not on element all children
function reg_mouseup_event(element){
     $(document).mouseup(function (e){ // событие клика по веб-документу
         if (!element.is(e.target) // если клик был не по нашему блоку
		            && element.has(e.target).length === 0) { // и не по его дочерним элементам
	         element.find('.submenu').hide()
			 element.hide(); // скрываем его
		 }
	 });
}

function button_action(event){
            //console.log($(this));
            //console.log($(event.currentTarget));
            //console.log($(event.currentTarget).parent());
    $(event.currentTarget).parent().hide();
    if (event.target.hasAttribute('gid')){
        var gid = event.target.getAttribute('gid');
        var action = event.target.getAttribute('action');
        var mailnode = event.target.getAttribute('mailnode');
        //console.log(server_url);
        $.getJSON(
            '/object',
            {'id': gid, 'action': action, 'mailnode': mailnode},
            function(data){
                //console.log(data)
                var _text = '';
                for (var item in data){
                    _text += item + '=' + data[item]+ "<br>"
                }
                //console.log(_text)
                $("div.main_area").html(_text)
            }
        );
    }
}
/*
(function($, undefined){
    console.log('ov', $(".scroll-1").css('overflow'))
    //var a = $(document.getElementsByClassName("scalix_menu"))
    //console.log(a);
    //console.log(this)
    $(".scalix_menu_target").bind("contextmenu", function(e) {
        e.preventDefault();
        if ($(this).children().css('display') == 'none'){
            s = $(this).children().css({"top": event.pageY +  "px", "left": event.pageX +  "px"}).show();
        }
    });
    var el = $(".scalix_menu");
    // hide menu when button pressed not on element or not on element all children
    reg_mouseup_event(el)

    $(document).bind("click", function(e){
        if (!$(e.target).parents(".scalix_menu_target").length > 0) {
            $(".scalix_menu_target").children().hide();
        }
    });

})(jQuery);
*/


(function($, undefined){
    console.log('ov', $(".scroll-1").css('overflow'))
     console.log($(this))
    //var a = $(document.getElementsByClassName("scalix_menu"))
    //console.log(a);
    //console.log(this)

    var max_width = 100;
    var def_width = 50;
    var w;
    $(".list_item").bind("contextmenu", function(e) {

        //console.log($(this).children())
        //console.log($(this))
        e.preventDefault();
        element = $(this).children()
        //console.log($(this).with(), $(this).height())
        var s;
        if ($(this).children().css('display') == 'none'){
            s = $(this).children().css({"top": event.pageY +  "px", "left": event.pageX +  "px"}).show();
            //$(s).width(def_width);
        }
        // hide menu when button pressed not on element or not on element all children
        reg_mouseup_event(element)

     });
    $(".menu_item").bind("click", function(e) {
        button_action(e)
        //console.log($(this).children())
         //console.log($(this).offset().left, $(this).width())
         var tX = $(this).offset().left + $(this).width()
         var tY = $(this).offset().top
        e.preventDefault();
        //element = $(this).children()
        var s;
        if ($(this).children().css('display') == 'none'){
            //s = $(this).children().css({"top": event.pageY +  "px", "left": event.pageX +  "px"}).show();
            s = $(this).children().css({"top": tY +  "px", "left": tX +  "px"}).show();
            //$(s).width(def_width);
        }
        if (s){
            // hide menu when button pressed not on element or not on element all children
            reg_mouseup_event(s)
	    }
    });


/*
function sx_action(el, action_a) {
    console.log(action_a);
}
*/
})(jQuery);
