$.getScript('static/js/functions.js', function() {
});

var activeTab = null;
var LOG_SCROLL = null;
var LAST_LOG_ID = 0;

/*____________________________BUTTON ACTIONS______________________________________*/

function delete_active_items(){
    $('.scroll-area').find('.active-item').each(function(i){
        //$(this)[i].className = 'list_item';
        if ($(this)[i].hasAttribute('gid')){
            console.log($(this)[i].getAttribute('gid'));
            $.ajax({
                url: '/object/' + $(this)[i].getAttribute('gid'),
                type: 'DELETE',
                success: function(result) {
                    console.log(result)
               }
            });
        }
    });
    update_log();
}



/*____________________________END BUTTON ACTIONS______________________________________*/


function show_log(id, type, message, additional){
    if (additional == 'undefined' ){
        additional = "OK";
    }
    //height_footer
    var div = document.createElement('div');

    var row = document.createElement('div');
    row.className = row.className + ' row';

    var div_id = document.createElement('div');
    div_id.className = div_id.className + 'col-md-1';
    div_id.innerHTML = id

    var div_type = document.createElement('div');
    div_type.className = div_type.className + 'col-md-1';
    div_type.innerHTML = type

    var div_mess = document.createElement('div');
    div_mess.className = div_mess.className + 'col-md-9';
    div_mess.innerHTML = message

    var div_add = document.createElement('div');
    div_add.className = div_add.className + 'col-md-1';
    div_add.innerHTML = additional

    row.appendChild(div_id)
    row.appendChild(div_type)
    row.appendChild(div_mess)
    row.appendChild(div_add)



    var text = "<div class='row'>"
    text = text + "<div class='col-md-1'>" + id +'</div>';
    text = text + "<div class='col-md-1'>" + type +'</div>';
    text = text + "<div class='col-md-9'>" + message +'</div>';
    text = text + "<div class='col-md-1'>" + additional +'</div>';
    text = text + "</div>"

    div.appendChild(row);
    div.className = div.className + " log_item";

    aa = document.getElementsByClassName("height_footer")[0].appendChild(div);
    if (LOG_SCROLL == null){
        LOG_SCROLL = $('.scroll-footer');
    }
    LOG_SCROLL.scrollTop(LOG_SCROLL.prop('scrollHeight'));
}

function update_log(){

    $.getJSON(
            '/get_log',
            {'last_id': LAST_LOG_ID},
            function(data){

                var _text = '';
                for	(index = 0; index < data.length; index++) {
                    item = data[index]
                    //console.log(item['id'])
                    if (item['id'] != 'undefined'){
                        LAST_LOG_ID = item['id'];
                        show_log(item['id'], item['type'], item['message'], item['result'])
                    }
                }
            }
        );
    //show log
}

function generate_contextmenu(){
    $(".list_item").bind("contextmenu", function(e) {
        //console.log($(this).children())
        //console.log($(this))
        e.preventDefault();
        element = $(this).children()
        //console.log($(this).with(), $(this).height())
        var s;
        if ($(this).children().css('display') == 'none'){
            s = $(this).children().css({"top": event.pageY +  "px", "left": event.pageX +  "px"}).show();
        }
        // hide menu when button pressed not on element or not on element all children
        reg_mouseup_event(element)

     });

    $(".list_item").bind("click", function(e) {
        e.preventDefault();
        on_item_click(e);
    });

    $(".menu_item").bind("click", function(e) {
        e.preventDefault();
        on_item_click(e, true);
        //console.log($(this).children())
         //console.log($(this).offset().left, $(this).width())
         var tX = $(this).offset().left + $(this).width()
         var tY = $(this).offset().top
        //element = $(this).children()
        var s;
        if ($(this).children().css('display') == 'none'){
            //s = $(this).children().css({"top": event.pageY +  "px", "left": event.pageX +  "px"}).show();
            s = $(this).children().css({"top": tY +  "px", "left": tX +  "px"}).show();
        }

        if (s){
            // hide menu when button pressed not on element or not on element all children

            reg_mouseup_event(s)
	    }
    });
}


function change_list_content(action){

    //console.log($('div.tab-pane.active').find('div.scroll-area').html().replace(" ", "_"));
    // if data already loaded, don't do it again. If you want load data again -- press update button
    if ($('div.tab-pane.active').find('div.scroll-area').html().length > 10){
        return ''
        //?? return ''
    }

    var url;
    switch(action.toLowerCase()) {
        case 'users':
            url = 'users';
            break;
        case 'groups':
            url = 'groups'
            break;
        default:
            url = ''
    }

    console.log('url', url);
    //console.log($('div.tab-pane.active').find('div.list-group').html('<a href=#>dfg</a>')
    $.get(url,
        function(data){
            console.log($('div.tab-pane.active').find('div.scroll-area').html(data));
            generate_contextmenu();
        }
    );

}


function on_item_click(event, hide){
    event.preventDefault();
    event.stopPropagation();
    //console.log('event', $(event.currentTarget))
            //console.log($(this));
            //console.log($(event.currentTarget));
            //console.log($(event.currentTarget).parent());

    if (hide == true){
        $(event.currentTarget).parent().hide();
    }
    /*
    document.getElementById("MyID").className =
    document.getElementById("MyID").className.replace(/\bMyClass\b/,'');
    ELEMENT.classList.remove("CLASS_NAME");
    */
    //console.log(event.target.classList)

    //console.log($('scroll-area').childNodes.className = 'list_item')

    /* reset background color for old active-item */
    $('.scroll-area').find('.active-item').each(function(i){
        $(this)[i].className = 'list_item';
    });
    /*set new active-item*/
    event.target.className = event.target.className + ' active-item';
    if (event.target.hasAttribute('gid')){
        var gid = event.target.getAttribute('gid');
        var mailnode = event.target.getAttribute('mailnode');
        var action = event.target.getAttribute('action');

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
                /*if (activeTab == null){
                console.log($('#MainNavBar :first-child'));
                console.log('tp', activeTab);
                }*/

                //console.log($('div.tab-pane.active').find('div.main_area').html(_text))
                $('div.tab-pane.active').find('div.main_area').html(_text)

                //$(activeTab).get("div.main_area").html(_text)
                //$("div.main_area").html(_text)
            }
        );
    }
    update_log();
}



(function($, undefined){
    //console.log('ov', $(".scroll-1").css('overflow'))
    //console.log($(this))
    //var a = $(document.getElementsByClassName("scalix_menu"))
    //console.log(a);
    //console.log(this)
    generate_contextmenu();
})(jQuery);


$(document).ready(function(){
/*    $(document).on( 'shown.bs.tab', 'a[data-toggle="tab"]', function (e) {
       var activatedTab = e.target; // activated tab
       console.log('ss', activatedTab);
    })
  */

  $('a[data-toggle="tab"]').on('shown.bs.tab', function(e){
  update_log();
    //Получить название активной вкладки
    activeTab = $(e.target);
    change_list_content(activeTab.text());
    //console.log('ss',$('div.tab-pane.active'))
    //console.log('ss', activeTab.text())
  });
});
