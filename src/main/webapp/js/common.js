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

