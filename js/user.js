/**
 * controller
 */
(function($) {
 
    $(document).on('click', 'a.update-profile', function(e) {
         e.preventDefault();
         $(this).updateProfileDialog();
    });

    $(document).on('click', 'a.update-password', function(e) {
        e.preventDefault();
        $(this).updatePasswordDialog();
    });
 
    $(document).on('click', 'a.update-email', function(e) {
        e.preventDefault();
        $(this).updateEmailDialog();
    });

    $(document).on('click', 'a.create-invitation', function(e) {
        e.preventDefault();
        $(this).invitationDialog();
    });

    $(document).on('click', 'a.process-invitation', function(e) {
        e.preventDefault();
        var url = $(this).data("action");
        var targetSelector = $(this).data("target");
        $.post(url)
        .done(function(res) {
            $(targetSelector).remove();
        }).fail(function(res) {
            //to do
        });
    });

    $(document).on('click', 'a.add-impression', function(e) {
        e.preventDefault();
        $(this).addImpressionDialog();
    });

    $(document).on('click', 'a.add-about', function(e) {
        e.preventDefault();
        $(this).addAboutDialog();
    });

    $(document).on('focusout', '#signupForm #username', function(e) {
        $.isUsernameTaken(); 
    });

    $(document).on('focusout', '#signupForm #email', function(e) {
        $.isEmailTaken(); 
    });

})(jQuery);

/**
 * plugin 
 */
(function($) {

    $.fn.updateEmailDialog = function() {
        var url = this.data("action");
        var dia = $('#updateEmailForm').clone();
        $.positionDialog(dia, 420);
        $.addCancelListener(dia);
        $.mask();
        dia.show();

        $(dia).on('submit', function(e) {
            e.preventDefault();
            $.post(url, dia.serialize())
            .done(function() {
                $('#mask').remove();
                dia.remove();
                return true;
            }).fail(function() {
                $('#updateEmailFail').show();
                return false;
            });
        });
    }

     $.fn.updateProfileDialog = function() {
        var url = this.data("action");
        var dia = $('#updateProfileForm').clone();
        $.positionDialog(dia, 420);
        $.addCancelListener(dia);
        $.mask();
        dia.show();

        $(dia).on('submit', function(e) {
            var x = $.isDisplayNameEmpty();
            var y = $.isHeadlineEmpty();
            if(x || y) {
                return false;
            }
            $(this).attr("action", url);
        });
    }

    $.fn.updatePasswordDialog = function() {
        var url = this.data("action");
        var dia = $('#updatePasswordForm').clone();
        $.positionDialog(dia, 420);
        $.addCancelListener(dia);
        $.mask();
        dia.show();

        $(dia).on('submit', function(e) {
            e.preventDefault();
            $.post(url, dia.serialize())
            .done(function() {
                $('#mask').remove();
                dia.remove();
            }).fail(function() {
                $('#failUpdatePassword').show();
                return false;
            });
        });
        return this;
    }

    $.fn.invitationDialog = function() {
        var that = this;
        url = this.data('action');

        var dia = $('#invitationForm').clone();
        $.positionDialog(dia, 650);
        $.addCancelListener(dia);
        $.mask();
        dia.show();

        $(dia).on('submit', function(e) {
            e.preventDefault();

            $.post(url, dia.serialize())
            .done(function(res) {
                that.remove();
                dia.remove();
                $('#mask').remove();
            }).fail(function() {
                $('#failInvite').show();
                return false;
            });
        });
    }

    $.fn.addImpressionDialog = function() {

        var url = this.data("action");

        var dia = $('#impressionForm').clone();
        $.positionDialog(dia, 650);
        $.addCancelListener(dia);
        $.mask();

        CKEDITOR.replace("content");
        dia.show();

        $(dia).on('submit', function(e) {
            var content = CKEDITOR.instances.content.getData();
            if(content.length == 0) {
                return false;
            }
            $(this).attr("action", url);
        });
    }

    $.fn.addAboutDialog = function() {

        var url = this.data("action");

        var dia = $('#aboutForm').clone();
        $.positionDialog(dia, 650);
        $.addCancelListener(dia);
        $.mask();

        CKEDITOR.replace("content");
        dia.show();

        $(dia).on('submit', function(e) {
            var content = CKEDITOR.instances.content.getData();
            if(content.length == 0) {
                return false;
            }
            $(this).attr("action", url);
        });
    }

})(jQuery);

/**
 *  service
 */
(function($) {

    $.isDisplayNameEmpty = function() {
        if($('#displayName').val().length == 0) {
            $('#empty-displayName').show();
            return true;
        }
        else {
            $('#empty-displayName').hide();
            return false;
        }
    }

    $.isHeadlineEmpty = function() {
        if($('#headline').val().length == 0) {
            $('#empty-headline').show();
            return true;
        }
        else {
            $('#empty-headline').hide();
            return false;
        }
    }

    $.isUsernameTaken = function() {
        var taken = false;

        var that = $('#username');
        var username = that.val();
        $.ajax({
            type: "post",
            url: "/social/checkUsername",
            async: false,
            data: {
                username: username
            }
        }).fail(function(res) {
            that.prev().children('span').show();
            taken = true;
        }).done(function(res) {
            that.prev().children('span').hide();
        });

        return taken;
    }

    $.isEmailTaken = function() {
        var taken = false;

        var that = $('#email');
        var email = that.val();
        $.ajax({
            type: "post",
            url: "/social/checkEmail",
            async: false,
            data: {
                email: email
            }
        }).fail(function(res) {
            that.prev().children('span').show();
            taken = true;
        }).done(function(res) {
            that.prev().children('span').hide();
        });

        return taken;
    }

})(jQuery);

