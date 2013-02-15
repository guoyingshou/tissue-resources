(function($) {
    $.isEmailValid = function() {
        var email = $('#email');
        
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        if(!emailReg.test(email.val()) || email.val().length < 6) {
            email.prev().children('span').show();
            return false;
        }
        else {
            email.prev().children('span').hide();
            return true;
        }
    };

    $.mask = function() {
        var mask = $('<div id="mask"></div>');
        mask.width($(window).width());
        mask.height($(window).height());
        mask.css("opacity", 0.6);
        $('body').prepend(mask);
        return this;
    }

    $.positionDialog = function(dialog, w) {
        dialog.css('left', ($(window).width() - w)/2);
        $('body').prepend(dialog);
    }

    $.addCancelListener = function(dialog) {
        $('a.cancel', dialog).one('click', function() {
            dialog.remove();
            $('#mask').remove();
        });
    }
})(jQuery);

(function($) {

    $.fn.oneItemDialog = function(edit) {

        var that = this;
        var url = this.data("action");
        var target = $(this.data("target"));

        var dia = $('#oneItemForm').clone();
        $.positionDialog(dia, 650);
        $.addCancelListener(dia);
        $.mask();

        if(edit) {
            $('#editor').val(target.html());
        }
        CKEDITOR.replace("editor");
        dia.show();

        $('form', dia).on('submit', function(e) {
            e.preventDefault();

            var content = CKEDITOR.instances.editor.getData();

            $.ajax({
                type: "POST",
                url: url,
                headers: {"Accept": "text/html"},
                data: {content: content}
            }).done(function(res) {
                if(target.is("ul")) {
                    target.append(res);
                }
                else {
                    target.html(content);
                }
                dia.remove();
                $('#mask').remove();
            });
        });
    }
})(jQuery);

/**
 * dropdown effect
 */
$(function() {
    $("ul.nav-item li:has(ul)").hover(function() {
       $(this).addClass("hover");
       $('ul.dropdown-menu').show();
    }, function() {
       $(this).removeClass("hover");
       $('ul.dropdown-menu').hide();
    });

    //$('ul.userbox li ul li:has(ul)').find('a:first').append(" &raquo; ");
});


