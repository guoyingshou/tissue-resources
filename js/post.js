(function($) {

    function confirm() {
        var dia = $('#confirmForm').clone();
        positionDialog(dia, 320);
        addCancelListener(dia);
        dia.show();
        return dia;
    }

    $.fn.editPostDialog = function(options) {
        mask();

        var needUpdate = this;

        var dia = $('#postEditForm').clone();
        positionDialog(dia, 650);
        CKEDITOR.replace('editor');

        $('#title', dia).val(this.children(':nth-child(2)').text());
        $('#editor', dia).val(this.children(':nth-child(3)').html());


        dia.show();

        addCancelListener(dia);

        $('form', dia).submit(function(e) {
            e.preventDefault();
            
            var title = $('#title', dia).val();
            var content = CKEDITOR.instances.editor.getData();

            var data = {
                type: options.type,
                title: title,
                content: content
            };

            $.ajax({
                type: "POST",
                url: options.url,
                headers: {"Accept": "text/html"},
                data: data 
            }).done(function(res) {
                needUpdate.children(':nth-child(2)').html(title);
                needUpdate.children(':nth-child(3)').html(content);
                dia.remove();
                $('#mask').remove();
            }).fail(function(res) {
                $('span.op-error-info').show();   
            });
        });

        return this;
    }

    /**
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
    */

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
