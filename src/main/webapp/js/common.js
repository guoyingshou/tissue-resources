$(document).ready(function() {
    $(document).on('click', 'a.pop', function(e) {
        e.preventDefault();
        $(this).dialog();
    });
});

(function($) {
    mask = function() {
        var mask = $('<div id="mask"></div>');
        mask.width($(window).width());
        mask.height($(window).height());
        mask.css("opacity", 0.6);
        $('body').prepend(mask);
        return this;
    }

    $.fn.dialog = function() {

        var formselector = this.data("form-selector");
        var url = this.data("action");
        var editorname = this.data("editor-name");
        //var targetselector = this.data("target-selector");
        var width = this.data("dialog-width");
        if(typeof width == 'undefined') {
            width = 650;
        }

        if(typeof editorname != 'undefined') {
            /**
           if(typeof targetselector != 'undefined') {
                var content = $.trim($(targetselector).html());
                $("#"+editorname).val(content);
            }
            */

            var editor = CKEDITOR.instances[editorname];
            if(editor) {
                editor.destroy();
                editor = null;
            }
            CKEDITOR.replace(editorname);
        }

        var dia = $(formselector);
        dia.css('left', ($(window).width() - width) / 2);
        $('body').prepend(dia);
 
        $('a.cancel', dia).one('click', function() {
            dia.hide();
            $('#mask').remove();
        });

        mask();
        dia.show();

        $(dia).submit(function(e) {
            $(this).attr("action", url);
        });
    }

})(jQuery);


