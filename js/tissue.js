(function($) {

    function mask() {
        var mask = $('<div id="mask"></div>');
        mask.width($(window).width());
        mask.height($(window).height());
        mask.css("opacity", 0.6);
        $('body').prepend(mask);
        return this;
    }

    function confirm() {
        var dia = $('#confirmForm');
        positionDialog(dia, 650);
        dia.show();
        return dia;
    }

    function positionDialog(dialog, w) {
        dialog.css('left', ($(window).width() - w)/2);
        $('body').prepend(dialog);
    }

    function addCancelListener(dialog) {
        $('a.cancel', dialog).on('click', function() {
            dialog.remove();
            $('#mask').remove();
        });
    }

    $.fn.editProfileDialog = function() {
        mask();
        var dia = $('#editProfileForm').clone();
        positionDialog(dia, 420);
        dia.show();
        addCancelListener(dia);

        $('form', dia).submit(function(e) {
            //todo: validate data
        });
        return this;
    }

    $.fn.changePassDialog = function() {
        mask();
        var dia = $('#changePassForm').clone();
        positionDialog(dia, 420);
        dia.show();
        addCancelListener(dia);

        $('form', dia).submit(function(e) {
            //todo: validate data
        });
        return this;
    }

    $.fn.inviteDialog = function() {
        mask();

        var ele = this;

        var dia = $('#inviteForm').clone();
        positionDialog(dia, 650);
        dia.show();
        addCancelListener(dia);

        $('form', dia).submit(function(e) {
            e.preventDefault();
            $.ajax({
                type: "POST",
                url: ele.attr('href'),
                headers: {"Accept": "text/html"},
                data: {content: $('textarea', dia).val()}
            }).done(function(res) {
                ele.remove();
                dia.remove();
                $('#mask').remove();
            });
        });
        return this;
    }

    $.fn.newTopicDialog = function() {

        mask();

        var dia = $('#topicForm').clone();
        positionDialog(dia, 650);

        CKEDITOR.replace('editor', {
            filebrowserUploadUrl: '/media/images',
            filebrowserBrowseUrl: '/media/browseImages'
        });

        dia.show();

        addCancelListener(dia);

        $('form', dia).submit(function(e) {
            //todo: validate data
        });

        return this;

    }

    $.fn.editTopicDialog = function(url) {

        mask();

        var needUpdate = this;

        var dia = $('#topicEditForm').clone();
        positionDialog(dia, 650);

        $('#tags', dia).val(this.children(':nth-child(2)').text());
        $('textarea', dia).val(this.children(':nth-child(3)').html());

        CKEDITOR.replace('editor');

        dia.show();

        addCancelListener(dia);

        $('form', dia).submit(function(e) {
            e.preventDefault();

            var content = CKEDITOR.instances.editor.getData();
            var tags = $('#tags', dia).val();

            var data = {
                content: content,
                tags: tags
            };

            $.ajax({
                type: "POST",
                url: url,
                headers: {"Accept": "text/html"},
                data: data 
            }).done(function(res) {
                needUpdate.children(':nth-child(1)').html(content);
                needUpdate.children(':nth-child(2)').html(tags);
                dia.remove();
                $('#mask').remove();
            });
        });
        return this;
    }

    $.fn.newPlanDialog = function() {

        mask();

        var dia = $('#planForm').clone();
        positionDialog(dia, 650);
        dia.show();

        addCancelListener(dia);

        $('form', dia).submit(function(e) {
            //todo: validate input
        });

        return this;
    }

    $.fn.newPostDialog = function() {
        mask();

        var dia = $('#postForm').clone();
        positionDialog(dia, 650);

        CKEDITOR.replace('editor');

        dia.show();

        addCancelListener(dia);

        $('form', dia).submit(function(e) {
            //todo: validate input
        });

        return this;
    }

    $.fn.editPostDialog = function(options) {
        mask();

        var needUpdate = this;

        var dia = $('#postEditForm').clone();
        positionDialog(dia, 650);

        $('#title', dia).val(this.children(':nth-child(2)').text());
        $('#editor', dia).val(this.children(':nth-child(3)').html());

        CKEDITOR.replace('editor');

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
            });
        });

        return this;
    }

    $.fn.oneItemDialog = function(url) {
        mask();

        var needUpdate = this;

        var dia = $('#oneItemForm').clone();
        positionDialog(dia, 650);

        if(!this.is('ul')) {
            $('textarea', dia).html(this.html());
        }

        CKEDITOR.replace('editor');

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
                dia.hide();
                $('#mask').remove();
            });
        });

        $('input[name="cancel"]', dia).one('click', function(e) {
            e.preventDefault();
            console.log(url);

            dia.hide();
            $('#mask').remove();
        });
    }

})(jQuery);
