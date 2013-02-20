/**
 * Event handlers
 */
$(document).ready(function() {

    $(document).on('click', 'a.create-topic', function(e) {
        e.preventDefault();
        $(this).createTopicDialog();
    });

    $(document).on('click', 'a.update-topic', function(e) {
        e.preventDefault();
        $(this).updateTopicDialog();
    });

    $(document).on('click', 'a.delete-topic', function(e) {
        e.preventDefault();
        $(this).deleteTopicDialog();
    });
 
    $(document).on('click', 'a.create-plan', function(e) {
        e.preventDefault();
        $(this).createPlanDialog();
    });
});

/**
 * Bussiness logic
 */
(function($) {
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

    $.fn.createTopicDialog = function() {
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

        $(dia).submit(function(e) {
            if(isTitleEmpty() || isTagsEmpty() || isObjectiveEmpty()) {
                return false;
            }
            $(this).attr("action", url);
        });
    }

    $.fn.updateTopicDialog = function() {
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

        $(dia).submit(function(e) {
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
    }

    $.fn.deleteTopicDialog = function() {
        var url = this.data("action");

        var dia = $('#deleteTopicForm').clone();
        $.positionDialog(dia, 650);
        $.addCancelListener(dia);
        $.mask();
        dia.show();

        $(dia).submit(function(e) {
            if($("#reason").val().length == 0) {
                $('label[for="reason"] span').show();
                return false;
            }
            $(this).attr("action", url);
        });
    }

    $.fn.createPlanDialog = function() {
        var dia = $('#createPlanForm').clone();
        $.positionDialog(dia, 650);
        $.addCancelListener(dia);

        $.mask();
        dia.show();

        $(dia).submit(function(e) {
            //todo: need to validate input?
        });
    }

})(jQuery);
