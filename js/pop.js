(function($) {

    function mask() {
        var mask = $('<div id="mask"></div>');
        mask.width($(window).width());
        mask.height($(window).height());
        mask.css("opacity", 0.6);
        $('body').prepend(mask);
        return this;
    }

    $.fn.newTopicDialog = function() {
        mask();

        var dia = $('#topicForm').clone();

        var w = ($(window).width() - 650) /2;
        dia.css('left', w);
        
        $('body').prepend(dia);
        CKEDITOR.replace('editor', {
            filebrowserUploadUrl: '/media/images',
            filebrowserBrowseUrl: '/media/browseImages'
        });
        dia.show();

        $('a.cancel', dia).on('click', function() {
            dia.remove();
            $('#mask').remove();
        });

        $('form', dia).submit(function(e) {
            //todo: validate data
        });

        return this;

    }

    $.fn.editTopicDialog = function(url) {
        mask();

        var dia = $('#topicEditForm').clone();
        var needUpdate = this;

        var w = ($(window).width() - 650) /2;
        dia.css('left', w);
        $('textarea', dia).val($('.topic-content', this).html());
        $('#tags', dia).val($('.topic-tags', this).text());
        
        $('body').prepend(dia);
        CKEDITOR.replace('editor');
        dia.show();

        $('a.cancel', dia).on('click', function() {
            dia.remove();
            $('#mask').remove();
        });

        $('form', dia).submit(function(e) {
            e.preventDefault();

            var data = {
                content: CKEDITOR.instances.editor.getData(),
                tags: $('#tags', dia).val()
            };

            $.ajax({
                type: "POST",
                url: url,
                headers: {"Accept": "text/html"},
                data: data 
            }).done(function(res) {
                needUpdate.html(res);
                dia.remove();
                $('#mask').remove();
            });
        });

        return this;

    }

    $.fn.newPlanDialog = function() {
        mask();

        var dia = $('#planForm').clone();

        var w = ($(window).width() - 650) /2;
        dia.css('left', w);
        
        $('body').prepend(dia);
        dia.show();

        $('a.cancel', dia).on('click', function() {
            dia.remove();
            $('#mask').remove();
        });

        $('form', dia).submit(function(e) {

        });

        return this;
    }


    $.fn.oneItemDialog = function(url) {
        mask();

        var dia = $('#oneItemForm').clone();
        console.log(dia);

        var needUpdate = this;
        if(!this.is('ul')) {
            $('textarea', dia).html(this.html());
        }

        var w = ($(window).width() - 650) /2;
        dia.css('left', w);
        
        $('body').prepend(dia);
        CKEDITOR.replace('editor');
        dia.show();

        $('a.cancel', dia).on('click', function() {
            dia.remove();
            $('#mask').remove();
        });

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
                    needUpdate.html(res);
                }
                dia.remove();
                $('#mask').remove();
            });
        });
        return this;
    }

    $.fn.newPostDialog = function() {
        mask();

        var dia = $('#postForm').clone();

        var w = ($(window).width() - 650) /2;
        dia.css('left', w);
        
        $('body').prepend(dia);
        CKEDITOR.replace('editor');
        dia.show();

        $('a.cancel', dia).on('click', function() {
            dia.remove();
            $('#mask').remove();
        });

        $('form', dia).submit(function(e) {
        });

        return this;
    }

    $.fn.editPostDialog = function(options) {
        mask();

        var needUpdate = this;
        var dia = $('#postEditForm').clone();

        var title = $('.post-title', this).html();
        var content = $('.post-content', this).html();

        $('#title', dia).val(title);
        $('#editor', dia).val(content);

        var w = ($(window).width() - 650) /2;
        dia.css('left', w);
        
        $('body').prepend(dia);
        CKEDITOR.replace('editor');
        dia.show();

        $('a.cancel', dia).on('click', function() {
            dia.remove();
            $('#mask').remove();
        });

        $('form', dia).submit(function(e) {
            e.preventDefault();
            
            var data = {
                type: options.type,
                title: $('#title', dia).val(), 
                content: CKEDITOR.instances.editor.getData()
            };

            $.ajax({
                type: "POST",
                url: options.url,
                headers: {"Accept": "text/html"},
                data: data 
            }).done(function(res) {
                needUpdate.html(res);
                dia.remove();
                $('#mask').remove();
            });
        });

        return this;
    }

})(jQuery);
