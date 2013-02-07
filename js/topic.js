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
            e.preventDefault();

            if(isTitleEmpty()) {
                return false;
            }
            if(isTagsEmpty()) {
                return false;
            }
            if(isObjectiveEmpty()) {
                return false;
            }
        });
    }

    $.fn.editTopicDialog = function(url) {

        mask();

        var dia = $('#topicEditForm').clone();
        positionDialog(dia, 650);
        CKEDITOR.replace("editor");

        $('#tags', dia).val($.trim($('div.tags').text()));
        $('textarea', dia).val($.trim($('div.content').html()));

        addCancelListener(dia);
        dia.show();

        $('form', dia).submit(function(e) {
            e.preventDefault();

            var content = CKEDITOR.instances.editor.getData();
            var tags = $('#tags', dia).val();

            if(isObjectiveEmpty()) {
                return false;    
            }
            if(isTagsEmpty()) {
                return false;    
            }

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
