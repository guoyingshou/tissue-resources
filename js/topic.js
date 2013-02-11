(function($) {

    function isTitleEmpty() {
        var title = $('#title');
        if(title.val().length == 0) {
            title.prev().children('span.error-empty').show();
            return true;
        }
        else {
            title.prev().children('span.error-empty').hide();
            return false;
        }
    }

    function isTagsEmpty() {
        var tags = $('#tags');
        if(tags.val().length == 0) {
            tags.prev().children('span.error-empty').show();
            return true;
        }
        else {
            tags.prev().children('span.error-empty').hide();
            return false;
        }
    }

    function isObjectiveEmpty() {
        var objective = CKEDITOR.instances.editor.getData();
        if(objective.length == 0) {
            $('#editor').prev().children('span.error-empty').show();
            return true;
        }
        else {
            $('#editor').prev().children('span.error-empty').hide();
            return false;
        }
    }

    $.fn.newTopicDialog = function() {
        var url = this.data("action");

        mask();
        var dia = $('#topicForm').clone();
        positionDialog(dia, 650);

        CKEDITOR.replace('editor', {
            filebrowserUploadUrl: '/media/images',
            filebrowserBrowseUrl: '/media/browseImages'
        });
        addCancelListener(dia);
        dia.show();

        $('form', dia).submit(function(e) {
            if(isTitleEmpty() || isTagsEmpty() || isObjectiveEmpty()) {
                return false;
            }
            $(this).attr("action", url);
        });
    }

    $.fn.editTopicDialog = function() {

        var url = this.data("action");

        mask();

        var dia = $('#topicForm').clone();
        positionDialog(dia, 650);
        CKEDITOR.replace("editor");

        $('#title', dia).val($.trim($('h1 a').text()));
        $('textarea', dia).val($.trim($('div.content').html()));
        $('#tags').val($.trim($('div.tags').text()).replace(/\s+/g, ' '));

        addCancelListener(dia);
        dia.show();

        $('form', dia).submit(function(e) {
            e.preventDefault();

            var title = $('#title', dia).val();
            var content = CKEDITOR.instances.editor.getData();
            var tags = $('#tags', dia).val();

            if(isTitleEmpty() || isObjectiveEmpty() || isTagsEmpty()) {
                return false;    
            }

            var data = {
                title: title,
                content: content,
                tags: tags
            };

            $.ajax({
                type: "POST",
                url: url,
                headers: {"Accept": "text/html"},
                data: data 
            }).done(function(res) {
                $('#logo h1 a').html(title);
                $('div.content').html(content);
                $('div.tags').html(tags);
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

})(jQuery);
