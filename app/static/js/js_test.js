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