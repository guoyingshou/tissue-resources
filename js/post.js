(function($) {

    function confirm() {
        var dia = $('#confirmForm').clone();
        positionDialog(dia, 320);
        addCancelListener(dia);
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
        mask();

        var that = this;

        var dia = $('#postEditForm').clone();
        positionDialog(dia, 650);
        CKEDITOR.replace('editor');

        var titleOld = $.trim($('.title').text());
        var contentOld = $.trim($('.content').html());

        $('#title', dia).val(titleOld);
        $('#editor', dia).val(contentOld);

        addCancelListener(dia);
        dia.show();

        $('form', dia).submit(function(e) {
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
                $('div.title').html(title);
                $('div.content').html(content);
                dia.remove();
                $('#mask').remove();
            }).fail(function(res) {
                $('span.op-error-info').show();   
            });
        });

        return this;
    }

    $.fn.delDialog = function() {

        mask();

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
