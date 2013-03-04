/**
 * controller
 */
$(document).ready(function() {

    $(document).on('click', 'a.delete', function(e) {
        e.preventDefault();
        $(this).deleteDialog();
    });
 
    $(document).on('click', 'a.create-topic', function(e) {
        e.preventDefault();
        $(this).createTopicDialog();
    });

    $(document).on('click', 'a.update-topic', function(e) {
        e.preventDefault();
        $(this).updateTopicDialog();
    });
 
    $(document).on('click', 'a.create-plan', function(e) {
        e.preventDefault();
        $(this).createPlanDialog();
    });

    $(document).on('submit', '#createPostForm', function(e) {
        var typeNotSelected = $.isTypeNotSelected();
        var titleEmpty = $.isTitleEmpty();
        var contentEmpty = $.isContentEmpty();

        if( typeNotSelected || titleEmpty || contentEmpty) {
            return false;
        }
    });

    $(document).on('click', 'a.update-post', function(e) {
        e.preventDefault();
        $(this).updatePostDialog();
    });

    $(document).on('click', 'a.create-postMessage', function(e) {
        e.preventDefault();
        $(this).createPostMessageDialog();
    });

    $(document).on('click', 'a.update-postMessage', function(e) {
        e.preventDefault();
        $(this).updatePostMessageDialog();
    });

    $(document).on('click', 'a.create-postMessageComment', function(e) {
        e.preventDefault();
        $(this).createPostMessageCommentDialog();
    });

    $(document).on('click', 'a.update-postMessageComment', function(e) {
        e.preventDefault();
        $(this).updatePostMessageCommentDialog();
    });

    $(document).on('click', 'a.create-answer', function(e) {
        e.preventDefault();
        $(this).createAnswerDialog();
    });


});

/**
 * plugin
 */
(function($) {

    $.fn.deleteDialog = function() {
        var url = this.data("action");

        var dia = $('#deleteConfirmForm').clone();
        $.positionDialog(dia, 650);
        $.addCancelListener(dia);
        $.mask();
        dia.show();

        $(dia).submit(function(e) {
            $(this).attr("action", url);
        });
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
            var titleEmpty = $.isTitleEmpty();
            var objectiveEmpty = $.isObjectiveEmpty();
            var tagsEmpty = $.isTagsEmpty();

            if(titleEmpty || tagsEmpty || objectiveEmpty) {
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
            var titleEmpty = $.isTitleEmpty();
            var objectiveEmpty = $.isObjectiveEmpty();
            var tagsEmpty = $.isTagsEmpty();

            if(titleEmpty || objectiveEmpty || tagsEmpty) {
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

    $.fn.updatePostDialog = function() {
        var url = this.data("action");
        var dia = $('#updatePostForm').clone();

        var titleOld = $.trim($('.item-title').text());
        var contentOld = $.trim($('.item-content').html());
        $('#title', dia).val(titleOld);
        $('#content', dia).val(contentOld);

        $.positionDialog(dia, 650);
        $.addCancelListener(dia);
        $.mask();
        dia.show();
        CKEDITOR.replace('content');

        $(dia).submit(function(e) {
            var titleEmpty = $.isTitleEmpty();
            var contentEmpty = $.isContentEmpty();
            if(titleEmpty || contentEmpty) {
                return false;
            }
            dia.attr("action", url);
        });
    }

    $.fn.createPostMessageDialog = function() {
        var url = $(this).data("action");
        var dia = $('#postMessageForm').clone();
        $.positionDialog(dia, 650);
        $.addCancelListener(dia);
        CKEDITOR.replace('content');
        $.mask();
        dia.show();

        $(dia).submit(function(e) {
            $(this).attr("action", url);
        });
    }

    $.fn.updatePostMessageDialog = function() {
        var url = $(this).data("action");
        var dia = $('#postMessageForm').clone();

        var targetSelector = $(this).data("target");
        var content = $.trim($(targetSelector).html());
        $('#content', dia).val(content);

        $.positionDialog(dia, 650);
        $.addCancelListener(dia);
        CKEDITOR.replace('content');
        $.mask();
        dia.show();

        $(dia).submit(function(e) {
            $(this).attr("action", url);
        });
    }

    $.fn.createPostMessageCommentDialog = function() {
        var url = $(this).data("action");
        var dia = $('#postMessageCommentForm').clone();
        $.positionDialog(dia, 650);
        $.addCancelListener(dia);
        CKEDITOR.replace('content');
        $.mask();
        dia.show();

        $(dia).submit(function(e) {
            $(this).attr("action", url);
        });
    }

    $.fn.updatePostMessageCommentDialog = function() {
        var url = $(this).data("action");
        var dia = $('#postMessageCommentForm').clone();

        var targetSelector = $(this).data("target");
        var content = $.trim($(targetSelector).html());
        $('#content', dia).val(content);

        $.positionDialog(dia, 650);
        $.addCancelListener(dia);
        CKEDITOR.replace('content');
        $.mask();
        dia.show();

        $(dia).submit(function(e) {
            $(this).attr("action", url);
        });
    }

    $.fn.createAnswerDialog = function() {
        var url = $(this).data("action");
        var dia = $('#answerForm').clone();
        $.positionDialog(dia, 650);
        $.addCancelListener(dia);
        CKEDITOR.replace('content');
        $.mask();
        dia.show();

        $(dia).submit(function(e) {
            $(this).attr("action", url);
        });
    }


})(jQuery);

/**
 * serivce
 */
(function($) {
    $.isTitleEmpty = function() {
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

    $.isTagsEmpty = function() {
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

    $.isObjectiveEmpty = function() {
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

    $.isTypeNotSelected = function() {
        if($('input[name="type"]').is(':checked')) {
            $('div.error span').hide();
            return false;
        }
        else {
            $('div.error span').show();
            return true;
        }
    }

    $.isContentEmpty = function() {
        var content = CKEDITOR.instances.content.getData();
        if($.trim(content).length == 0) {
            $('label[for="content"] span').show();
            return true;
        }
        else {
            $('label[for="content"] span').hide();
            return false;
        }
    }

})(jQuery);


