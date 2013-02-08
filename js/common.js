function isEmailValid() {
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

function mask() {
        var mask = $('<div id="mask"></div>');
        mask.width($(window).width());
        mask.height($(window).height());
        mask.css("opacity", 0.6);
        $('body').prepend(mask);
        return this;
}

function positionDialog(dialog, w) {
        dialog.css('left', ($(window).width() - w)/2);
        $('body').prepend(dialog);
}

function addCancelListener(dialog) {
        $('a.cancel', dialog).one('click', function() {
            dialog.remove();
            $('#mask').remove();
        });
}

(function($) {
    $.fn.oneItemDialog = function(url) {
        mask();

        var needUpdate = this;

        var dia = $('#oneItemForm').clone();
        positionDialog(dia, 650);
        CKEDITOR.replace("editor");

        if(!this.is('ul')) {
            $('textarea', dia).html(this.html());
        }

        dia.show();

        addCancelListener(dia);

        $('form', dia).submit(function(e) {
            e.preventDefault();

            var content = CKEDITOR.instances.editor.getData();

            $.ajax({
                type: "POST",
                url: url,
                headers: {"Accept": "text/html"},
                data: {content: content}
            }).done(function(res) {
                if(needUpdate.is("ul")) {
                    needUpdate.append(res);
                }
                else {
                    needUpdate.html(content);
                }
                dia.remove();
                $('#mask').remove();
            });
        });
        return this;
    }
})(jQuery);
