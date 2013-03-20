/**
 * shared by all 
 */
$(document).ready(function() {
    $(document).on('click', 'a.delete', function(e) {
        e.preventDefault();
        $(this).deleteDialog();
    });
});

/**
 * topic/plan
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
 
    $(document).on('click', 'a.create-plan', function(e) {
        e.preventDefault();
        $(this).createPlanDialog();
    });
});

/**
 * shared by article, question
 */
$(document).ready(function() {
    $(document).on('submit', '#createPostForm', function(e) {
        var typeNotSelected = $.isTypeNotSelected();
        var titleEmpty = $.isTitleEmpty();
        var contentEmpty = $.isContentEmpty();

        if( typeNotSelected || titleEmpty || contentEmpty) {
            return false;
        }
    });
});

/**
 * article specific
 */
$(document).ready(function() {

    $(document).on('click', 'a.update-article', function(e) {
        e.preventDefault();
        $(this).updateArticleDialog();
    });

    $(document).on('click', 'a.create-message', function(e) {
        e.preventDefault();
        $(this).createDialog("#messageForm");
    });

    $(document).on('click', 'a.update-message', function(e) {
        e.preventDefault();
        $(this).updateDialog("#messageForm");
    });

    $(document).on('click', 'a.create-reply', function(e) {
        e.preventDefault();
        $(this).createDialog("#replyForm");
    });

    $(document).on('click', 'a.update-reply', function(e) {
        e.preventDefault();
        $(this).updateDialog("#replyForm");
    });

});

/**
 * question specific
 */
$(document).ready(function() {

    $(document).on('click', 'a.update-question', function(e) {
        e.preventDefault();
        $(this).updateQuestionDialog();
    });

    $(document).on('click', 'a.create-answer', function(e) {
        e.preventDefault();
        $(this).createDialog("#answerForm");
    });

    $(document).on('click', 'a.update-answer', function(e) {
        e.preventDefault();
        $(this).updateDialog("#answerForm");
    });

    $(document).on('click', 'a.create-answerComment', function(e) {
        e.preventDefault();
        $(this).createDialog("#answerCommentForm");
    });

    $(document).on('click', 'a.update-answerComment', function(e) {
        e.preventDefault();
        $(this).updateDialog("#answerCommentForm");
    });

    $(document).on('click', 'a.create-questionComment', function(e) {
        e.preventDefault();
        $(this).createDialog("#questionCommentForm");
    });

    $(document).on('click', 'a.update-questionComment', function(e) {
        e.preventDefault();
        $(this).updateDialog("#questionCommentForm");
    });

});

/**
 * plugins shared by all
 */
(function($) {

    $.fn.createDialog = function(formSelector) {
        var url = $(this).data("action");
        var dia = $(formSelector).clone();
        $.positionDialog(dia, 650);
        $.addCancelListener(dia);
        CKEDITOR.replace('content');
        $.mask();
        dia.show();

        $(dia).submit(function(e) {
            $(this).attr("action", url);
        });
    }

    $.fn.updateDialog = function(formSelector) {
        var url = $(this).data("action");
        dia = $(formSelector).clone();

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

})(jQuery);

/**
 * post plugins
 */
(function($) {

    $.fn.updateArticleDialog = function() {
        var url = this.data("action");
        var dia = $('#updateArticleForm').clone();

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

    $.fn.updateQuestionDialog = function() {
        var url = this.data("action");
        var dia = $('#updateQuestionForm').clone();

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

})(jQuery);


/**
 * topic plugin
 */
(function($) {

    $.fn.createTopicDialog = function() {
        var url = this.data("action");

        var dia = $('#topicForm').clone();
        $.positionDialog(dia, 650);
        $.addCancelListener(dia);

        CKEDITOR.replace('content', {
            filebrowserUploadUrl: '/media/images/_create',
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

        CKEDITOR.replace('content', {
            filebrowserUploadUrl: '/media/images/_create',
            filebrowserBrowseUrl: '/media/browseImages'
        });

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

})(jQuery);

/**
 * common serivce
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

})(jQuery);

/**
 * topic services
 */
(function($) {

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
        var objective = CKEDITOR.instances.content.getData();
        if(objective.length == 0) {
            $('label[for="content"] span').show();
            return true;
        }
        else {
            $('label[for="content"] span').hide();
            return false;
        }
    }

})(jQuery);


