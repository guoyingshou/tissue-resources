/**
 * post CRUD event handlers.
 */

$(document).ready(function() {

    $(document).on('click', 'a.del', function(e) {
        e.preventDefault();
        $(this).delDialog();
    });

    $('#post-form').on('submit', function(e) {
        return $(this).post();
    });

    $(document).on('click', 'a.post-edit', function(e) {
        e.preventDefault();
        $(this).editPostDialog();
    });
 
    $(document).on('click', 'a.item-add', function(e) {
        e.preventDefault();
        $(this).oneItemDialog();
    });

    $(document).on('click', 'a.item-edit', function(e) {
        e.preventDefault();
        $(this).oneItemDialog(true);
    });

});


/**
 * real logic.
 */
(function($) {

    function confirm() {
        var dia = $('#confirmForm').clone();
        $.positionDialog(dia, 320);
        $.addCancelListener(dia);
        dia.show();
        return dia;
    }

    function isTypeNotSelected() {
        if($('input[name="type"]').is(':checked')) {
            $('legend span').hide();
            return false;
        }
        else {
            $('legend span').show();
            return true;
        }
    }

    function isTitleEmpty() {
        if($.trim($('#title').val()).length == 0) {
            $('label[for="title"] span').show();
            return true;
        }
        else {
            $('label[for="title"] span').hide();
            return false;
        }
    }

    function isContentEmpty() {
        var content = CKEDITOR.instances.editor.getData();
        if($.trim(content).length == 0) {
            $('label[for="editor"] span').show();
            return true;
        }
        else {
            $('label[for="editor"] span').hide();
            return false;
        }
    }

    $.fn.post = function() {
        var typeNotSelected = isTypeNotSelected();
        var titleEmpty = isTitleEmpty();
        var contentEmpty = isContentEmpty();

        if( typeNotSelected || titleEmpty || contentEmpty) {
            return false;
        }
        return true;
    }

    $.fn.editPostDialog = function() {

        var that = this;
        var dia = $('#postEditForm').clone();

        var titleOld = $.trim($('.title').text());
        var contentOld = $.trim($('.content').html());
        $('#title', dia).val(titleOld);
        $('#editor', dia).val(contentOld);

        $.positionDialog(dia, 650);
        $.addCancelListener(dia);
        $.mask();
        dia.show();
        CKEDITOR.replace('editor');

        $(dia).submit(function(e) {
            e.preventDefault();
            
            var titleEmpty = isTitleEmpty();
            var contentEmpty = isContentEmpty();

            if(titleEmpty || contentEmpty) {
                return false;
            }

            var title = $('#title', dia).val();
            var content = CKEDITOR.instances.editor.getData();

            var data = {
                type: that.data("type"),
                title: title,
                content: content
            };

            $.ajax({
                type: "POST",
                url: that.data("action"),
                headers: {"Accept": "text/html"},
                data: data 
            }).done(function(res) {
                dia.remove();
                $('#mask').remove();
                $('h3.title').html(title);
                $('div.content').html(content);
            }).fail(function(res) {
                $('span.op-error-info').show();   
            });
        });
    }

    $.fn.delDialog = function() {
        $.mask();

        var target = this;
        var dia = confirm();
        $('input[name="ok"]', dia).one('click', function(e) {
            e.preventDefault();

            $.ajax({
                type: "POST",
                url: target.data('action'),
            }).done(function() {
                target.closest('li').remove();
                dia.remove();
                $('#mask').remove();
            });
        });
    }
})(jQuery);
