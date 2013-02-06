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
        console.log("len: " + objective.length);
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

        dia.show();

        addCancelListener(dia);

        $('input[type="submit"]').on('click', function(e) {
            e.preventDefault();

            var submit = true;

            if(isTitleEmpty()) {
                submit = false;
            }

            if(isTagsEmpty()) {
                submit = false;
            }

            if(isObjectiveEmpty()) {
                submit = false;
            }

            if(submit) {
                $('form', dia).submit();
            }
            else {
                return false;
            }
        });
    }

    $.fn.editTopicDialog = function(url) {

        mask();

        var needUpdate = this;

        var dia = $('#topicEditForm').clone();
        positionDialog(dia, 650);
        CKEDITOR.replace("editor");

        $('#tags', dia).val(this.children(':nth-child(2)').text());
        $('textarea', dia).val(this.children(':nth-child(3)').html());

        //CKEDITOR.replace('editor');

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

})(jQuery);
