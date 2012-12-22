(function($) {
    var result;
    var dia;

    function mask() {
        var mask = $('<div id="mask"></div>');
        mask.width($(window).width());
        mask.height($(window).height());
        mask.css("opacity", 0.6);
        $('body').prepend(mask);
        return this;
    }

    function saveOneItem(url) {
        var content = CKEDITOR.instances.editor.getData();
        $.ajax({
            type: "POST",
            url: url,
            headers: {"Accept": "text/html"},
            data: {content: content}
        }).done(function(res) {
            if(result.is("ul")) {
                result.append(res);
            }
            else {
                result.html(res);
            }
            clean();
        });
    }

    function savePost(url, data) {
        //var content = CKEDITOR.instances.editor.getData();
        $.ajax({
            type: "POST",
            url: url,
            headers: {"Accept": "text/html"},
            data: data 
        }).done(function(res) {
            result.html(res);
            clean();
        });
    }

    function clean() {
        dia.remove();
        $('#mask').remove();
        result = null;
        dia = null;
    }
 
    $.fn.oneItemDialog = function(action) {
        mask();

        dia = $('#dia').clone();
        result = this;
        if(!this.is('ul')) {
            $('textarea', dia).html(this.html());
        }

        var w = ($(window).width() - 650) /2;
        dia.css('left', w);
        
        $('body').prepend(dia);
        CKEDITOR.replace('editor');
        dia.show();

        $('a.cancel', dia).on('click', function() {
            clean();
        });

        $('form', dia).submit(function(e) {
            e.preventDefault();
            saveOneItem(action);
        });

        return this;
    }

    $.fn.newPostDialog = function(action) {
        mask();

        dia = $('#postDia').clone();
        result = this;

        var w = ($(window).width() - 650) /2;
        dia.css('left', w);
        
        $('body').prepend(dia);
        CKEDITOR.replace('editor');
        dia.show();

        $('a.cancel', dia).on('click', function() {
            clean();
        });

        $('form', dia).submit(function(e) {
            $(this).attr("action", action);
        });

        return this;
    }

    $.fn.editPostDialog = function(action) {
        mask();

        //the selected jquery object is the one to place the updated content
        result = this;

        //construct the dialog object from template
        dia = $('#postDia').clone();

        //preset data for editing
        var title = $('.article-title', this).html();
        var content = $('.article-content', this).html();
        $('fieldset', dia).first().remove();

        $('#title', dia).val(title);
        $('#editor', dia).val(content);

        //style the dialog. missing styles come from css with element id of "#postDia" 
        var w = ($(window).width() - 650) /2;
        dia.css('left', w);
        
        //display the dialog
        $('body').prepend(dia);
        CKEDITOR.replace('editor');
        dia.show();

        $('a.cancel', dia).on('click', function() {
            clean();
        });

        $('form', dia).submit(function(e) {
            e.preventDefault();
            
            var data = {
                title: $('#title', dia).val(), 
                content: CKEDITOR.instances.editor.getData()
            };
            savePost(action, data);
        });

        return this;
    }

    $.fn.planFormDialog = function(action) {
        mask();

        url = action;

        dia = $('#planFormDia').clone();
        result = this;
        if(!this.is('ul')) {
            $('textarea', dia).html(this.html());
        }

        var w = ($(window).width() - 650) /2;
        dia.css('left', w);
        
        $('body').prepend(dia);
        CKEDITOR.replace('editor');
        dia.show();

        $('a.cancel', dia).on('click', function() {
            clean();
        });

        $('form', dia).submit(function(e) {
            e.preventDefault();
            saveOneItem();
        });
        return this;
    }

})(jQuery);
