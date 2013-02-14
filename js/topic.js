(function($) {
    $(document).on('click', 'a.topic-create', function(e) {
        e.preventDefault();
        $(this).newTopicDialog();
    });

    $(document).on('click', 'a.topic-edit', function(e) {
        e.preventDefault();
        $(this).editTopicDialog();
    });
 
    $(document).on('click', 'a.plan-create', function(e) {
        e.preventDefault();
        $('#planDia').newPlanDialog();
    });

    function isTitleEmpty() {
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

    function isTagsEmpty() {
        var tags = $('#tags');
        if(tags.val().length == 0) {
            $('label[for="tags"] span').show();
            return true;
        }
        else {
            $('label[for="tags"] span').hide();
            return false;
        }
    }

    function isObjectiveEmpty() {
        var objective = CKEDITOR.instances.editor.getData();
        if(objective.length == 0) {
            $('label[for="editor"] span').show();
            return true;
        }
        else {
            $('label[for="editor"] span').hide();
            return false;
        }
    }

    $.fn.newTopicDialog = function() {
        var url = this.data("action");

        var dia = $('#topicForm').clone();
        $.positionDialog(dia, 650);
        $.addCancelListener(dia);

        CKEDITOR.replace('editor', {
            filebrowserUploadUrl: '/media/images',
            filebrowserBrowseUrl: '/media/browseImages'
        });

        $.mask();
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
        var dia = $('#topicForm').clone();

        var title = $('h1 a').text();
        var tags = $('div.tags').text();
        var content = $('div.content').html();

        $('#title', dia).val($.trim(title));
        $('#tags', dia).val($.trim(tags).replace(/\s+/g, ' '));
        $('textarea', dia).val($.trim(content));

        $.positionDialog(dia, 650);
        $.addCancelListener(dia);
        CKEDITOR.replace("editor");

        $.mask();
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
        var dia = $('#planForm').clone();
        $.positionDialog(dia, 650);
        $.addCancelListener(dia);

        $.mask();
        dia.show();

        $('form', dia).submit(function(e) {
            //todo: validate input
        });
    }

})(jQuery);
