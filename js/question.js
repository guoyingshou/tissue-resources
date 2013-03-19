/**
 * controller
 */
$(document).ready(function() {

    $(document).on('click', 'a.delete', function(e) {
        e.preventDefault();
        $(this).deleteDialog();
    });
 
    $(document).on('click', 'a.update-question', function(e) {
        e.preventDefault();
        $(this).updateQuestionDialog();
    });

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

/**
 * plugin
 */
(function($) {

    $.fn.createDialog = function(formSelector) {
        console.log("xxx");
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

    $.fn.updateQuestionDialog = function() {
        var url = this.data("action");
        var dia = $('#updateQuestionForm').clone();

        var titleOld = $.trim($('.item-title').text());
        var contentOld = $.trim($('.item-content').html());
        $('#title', dia).val(titleOld);
        $('#content', dia).val(contentOld);

        $.positionDialog(dia, 650);
        $.addCancelListener(dia);
        $.mask();
        dia.show();
        CKEDITOR.replace('content');

        $(dia).submit(function(e) {
            var titleEmpty = $.isTitleEmpty();
            var contentEmpty = $.isContentEmpty();
            if(titleEmpty || contentEmpty) {
                return false;
            }
            dia.attr("action", url);
        });
    }

})(jQuery);

/**
 * serivce
 */
(function($) {
    $.isTitleEmpty = function() {
        var title = $('#title');
        if(title.val().length == 0) {
            $('label[for="title"] span').show();
            return true;
        }
        else {
            $('label[for="title"] span').hide();
            return false;
        }
    }

    $.isContentEmpty = function() {
        var content = CKEDITOR.instances.content.getData();
        if($.trim(content).length == 0) {
            $('label[for="content"] span').show();
            return true;
        }
        else {
            $('label[for="content"] span').hide();
            return false;
        }
    }

})(jQuery);


