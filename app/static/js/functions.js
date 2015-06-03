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