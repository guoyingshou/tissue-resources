$(document).ready(function() {
    $(document).on('click', 'a.delete', function(e) {
        e.preventDefault();
        $(this).deleteDialog();
    });
});

/**
 * article specific
 */
$(document).ready(function() {

    $(document).on('click', 'a.create-message', function(e) {
        e.preventDefault();
        $(this).createDialog("#messageForm");
    });

    $(document).on('click', 'a.update-message', function(e) {
        e.preventDefault();
        $(this).updateDialog("#messageForm");
    });

    $(document).on('click', 'a.create-reply', function(e) {
        e.preventDefault();
        $(this).createDialog("#replyForm");
    });

    $(document).on('click', 'a.update-reply', function(e) {
        e.preventDefault();
        $(this).updateDialog("#replyForm");
    });

});

/**
 * question specific
 */
$(document).ready(function() {

    $(document).on('click', 'a.create-answer', function(e) {
        e.preventDefault();
        $(this).createDialog("#answerForm");
    });

    $(document).on('click', 'a.update-answer', function(e) {
        e.preventDefault();
        $(this).updateDialog("#answerForm");
    });

    $(document).on('click', 'a.create-answerComment', function(e) {
        e.preventDefault();
        $(this).createDialog("#answerCommentForm");
    });

    $(document).on('click', 'a.update-answerComment', function(e) {
        e.preventDefault();
        $(this).updateDialog("#answerCommentForm");
    });

    $(document).on('click', 'a.create-questionComment', function(e) {
        e.preventDefault();
        $(this).createDialog("#questionCommentForm");
    });

    $(document).on('click', 'a.update-questionComment', function(e) {
        e.preventDefault();
        $(this).updateDialog("#questionCommentForm");
    });

});

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


