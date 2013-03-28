$(document).ready(function() {
    $(document).on('click', 'a.delete', function(e) {
        e.preventDefault();
        $(this).deleteDialog();
    });
});

(function($) {
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

    $.fn.createDialog = function(formSelector) {
        var url = $(this).data("action");
        var dia = $(formSelector).clone();
        $.positionDialog(dia, 650);
        $.addCancelListener(dia);
        CKEDITOR.replace('content');
        $.mask();
        dia.show();

        $(dia).submit(function(e) {
            $(this).attr("action", url);
        });
    }

    $.fn.updateDialog = function(formSelector) {
        var url = $(this).data("action");
        dia = $(formSelector).clone();

        var targetSelector = $(this).data("target");
        var content = $.trim($(targetSelector).html());
        $('#content', dia).val(content);

        $.positionDialog(dia, 650);
        $.addCancelListener(dia);
        CKEDITOR.replace('content');
        $.mask();
        dia.show();

        $(dia).submit(function(e) {
            $(this).attr("action", url);
        });
    }
 
    $.fn.deleteDialog = function() {
        var url = this.data("action");

        var dia = $('#deleteConfirmForm').clone();
        $.positionDialog(dia, 650);
        $.addCancelListener(dia);
        $.mask();
        dia.show();

        $(dia).submit(function(e) {
            $(this).attr("action", url);
        });
    }
})(jQuery);


