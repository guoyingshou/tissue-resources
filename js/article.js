/**
 * controller
 */
$(document).ready(function() {

    $(document).on('click', 'a.delete', function(e) {
        e.preventDefault();
        $(this).deleteDialog();
    });
 
    $(document).on('click', 'a.update-article', function(e) {
        e.preventDefault();
        $(this).updateArticleDialog();
    });

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
 * plugin
 */
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
 
    $.fn.updateArticleDialog = function() {
        var url = this.data("action");
        var dia = $('#updateArticleForm').clone();

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


