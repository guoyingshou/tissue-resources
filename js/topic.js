/**
 * controller
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

    $(document).on('submit', '#post-form', function(e) {
        return $(this).creaatePost();
    });

    $(document).on('click', 'a.update-post', function(e) {
        e.preventDefault();
        $(this).updatePostDialog();
    });

    $(document).on('click', 'a.delete-post', function(e) {
        e.preventDefault();
        $(this).deletePostDialog();
    });

    $(document).on('click', 'a.create-item', function(e) {
        e.preventDefault();
        $(this).oneItemDialog();
    });
 
    $(document).on('click', 'a.delete-item', function(e) {
        e.preventDefault();
        $(this).deleteDialog();
    });

    $(document).on('click', 'a.update-item', function(e) {
        e.preventDefault();
        $(this).oneItemDialog(true);
    });

});

/**
 * serivce
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

    function confirm() {
        var dia = $('#confirmForm').clone();
        $.positionDialog(dia, 320);
        $.addCancelListener(dia);
        dia.show();
        return dia;
    }

    function isTypeNotSelected() {
        if($('input[name="type"]').is(':checked')) {
            $('legend span').hide();
            return false;
        }
        else {
            $('legend span').show();
            return true;
        }
    }

    function isTitleEmpty() {
        if($.trim($('#title').val()).length == 0) {
            $('label[for="title"] span').show();
            return true;
        }
        else {
            $('label[for="title"] span').hide();
            return false;
        }
    }

    function isContentEmpty() {
        var content = CKEDITOR.instances.editor.getData();
        if($.trim(content).length == 0) {
            $('label[for="editor"] span').show();
            return true;
        }
        else {
            $('label[for="editor"] span').hide();
            return false;
        }
    }

})(jQuery);

/**
 * plugin
 */
(function($) {

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

    $.fn.createPost = function() {
        var typeNotSelected = isTypeNotSelected();
        var titleEmpty = isTitleEmpty();
        var contentEmpty = isContentEmpty();

        if( typeNotSelected || titleEmpty || contentEmpty) {
            return false;
        }
        return true;
    }

    $.fn.updatePostDialog = function() {

        var that = this;
        var dia = $('#updatePostForm').clone();

        var titleOld = $.trim($('.item-title').text());
        var contentOld = $.trim($('.item-content').html());
        $('#title', dia).val(titleOld);
        $('#editor', dia).val(contentOld);

        $.positionDialog(dia, 650);
        $.addCancelListener(dia);
        $.mask();
        dia.show();
        CKEDITOR.replace('editor');

        $(dia).submit(function(e) {
            e.preventDefault();
            
            var titleEmpty = isTitleEmpty();
            var contentEmpty = isContentEmpty();

            if(titleEmpty || contentEmpty) {
                return false;
            }

            var title = $('#title', dia).val();
            var content = CKEDITOR.instances.editor.getData();

            var data = {
                //type: that.data("type"),
                title: title,
                content: content
            };

            $.ajax({
                type: "POST",
                url: that.data("action"),
                headers: {"Accept": "text/html"},
                data: data 
            }).done(function(res) {
                dia.remove();
                $('#mask').remove();
                $('h3.item-title').html(title);
                $('div.item-content').html(content);
            }).fail(function(res) {
                //$('span.op-error-info').show();   
            });
        });
    }

    $.fn.deletePostDialog = function() {
        var url = this.data("action");
            console.log(url);

        var dia = $('#deletePostForm').clone();
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
            console.log(url);
        });
    }

    $.fn.deleteDialog = function() {
        $.mask();

        var target = this;
        var dia = confirm();
        $('input[name="ok"]', dia).one('click', function(e) {
            e.preventDefault();

            $.ajax({
                type: "POST",
                url: target.data('action'),
            }).done(function() {
                target.closest('li').remove();
                dia.remove();
                $('#mask').remove();
            });
        });
    }

})(jQuery);
