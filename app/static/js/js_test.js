/*
context menu 1
$(document).bind(“contextmenu”, function (e) {
    e.preventDefault();                 // To prevent the default context menu.
    $(“#cntnr”).css(“left”, e.pageX);   // For updating the menu position.
    $(“#cntnr”).css(“top”, e.pageY);    //
    $(“#cntnr”).fadeIn(500, startFocusOut()); //  For bringing the context menu in picture.
});
function startFocusOut() {
    $(document).on(“click”, function () {
        $(“#cntnr”).hide(500);              // To hide the context menu
        $(document).off(“click”);
    });
}
$(“#items > li”).click(function () {
    $(“#op”).text(“You have selected “ + $(this).text());  // Performing the selected function.
});
*/



    //$(this).children().css({"top": (event.pageY-parentOffset.top) +  "px", "left": (event.pageX - parentOffset.left) +  "px"}).show();
    //$(this).children().css({"top": (event.pageY - parentOffset.offsetTop) +  "px", "left": (event.pageX - parentOffset.offsetLeft) +  "px"}).show();
    //s = $(this).children().css({"top": event.mouseY +  "px", "left": event.mouseX +  "px"}).show();
    //console.log(event.mouseX, event.mouseY)
    //console.log(e.pageX,  e.pageY)
    //console.log($(this).offsetTop, $(this).offsetLeft)

         //console.log($(this).context)
     //e.preventDefault();
     //e.stopPropagation();
     //console.log(this)
     //console.log($(this))
     //var parentOffset = $(this).offsetParent();

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