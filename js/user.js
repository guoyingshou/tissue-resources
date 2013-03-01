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

    $(document).on('click', 'a.invite', function(e) {
        e.preventDefault();
        $(this).inviteDialog();
    });

    $(document).on('click', 'a.add-impression, a.add-resume', function(e) {
        e.preventDefault();
        $(this).oneItemDialog();
    });

    /**
    $(document).on('click', 'a.add-resume', function(e) {
        e.preventDefault();
        $(this).oneItemDialog();
    });
    */

})(jQuery);

/**
 * handler
 */
(function($) {

    $(document).on('focusout', '#username', function(e) {
        return $.isUsernameTaken(); 
    });

    $(document).on('focusout', '#email', function(e) {
        return $.isEmailTaken(); 
    });

    $(document).on('submit', '#signupForm', function(e) {
    });
 
    $(document).on('click', 'a.process-invite', function(e) {
        e.preventDefault();
        var url = $(this).data("action");
        $.ajax({
            type: "POST",
            url: url 
        }).done(function(res) {
            $('div.intention').remove();
        }).fail(function(res) {
            //to do
        });
    });

})(jQuery);


/**
 * plugin 
 */
(function($) {
     $.fn.updateProfileDialog = function() {
        var url = this.data("action");
        var dia = $('#updateProfileForm').clone();
        $.positionDialog(dia, 420);
        $.addCancelListener(dia);
        $.mask();
        dia.show();

        $(dia).on('submit', function(e) {
            if($.isDisplayNameEmpty() || $.isHeadlineEmpty()) {
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
            var passwordInvalid, confirmMismatch;

            var password = $('#password');
            var confirm = $('#confirm');

            if(password.val().length < 6) {
                $('label[for="password"] span').show();
                passwordInvalid = true;
            }
            else {
                $('label[for="password"] span').hide();
                passwordInvalid = false;
            }

            if(confirm.val() != password.val()) {
                $('label[for="confirm"] span').show();
                confirmMismatch = true;
            }
            else {
                $('label[for="password"] span').hide();
                confirmMismatch = false;
            }

            if(passwordInvalid || confirmMismatch) {
                return false;
            }

            $(this).attr("action", url);
        });
        return this;
    }

    $.fn.updateEmailDialog = function() {
        var url = this.data("action");
        var dia = $('#updateEmailForm').clone();
        $.positionDialog(dia, 420);
        $.addCancelListener(dia);
        $.mask();
        dia.show();

        $(dia).on('submit', function(e) {
            var email = $('#email').val();
            if($.isEmailInvalid(email)) {
                return false;
            }
            $(this).attr("action", url);
        });
    }

    $.fn.inviteDialog = function() {
        var that = this;
        url = this.data('action');

        var dia = $('#inviteForm').clone();
        $.positionDialog(dia, 650);
        $.addCancelListener(dia);
        $.mask();
        dia.show();

        $(dia).on('submit', function(e) {
            e.preventDefault();

            if($('#letter').val().length == 0) {
                $('label[for="letter"] span').show();
                return false;
            }

            $.ajax({
                type: "POST",
                url: that.data('action'),
                headers: {"Accept": "text/html"},
                data: {content: $('textarea', dia).val()}
            }).done(function(res) {
                that.remove();
                dia.remove();
                $('#mask').remove();
            });
        });
    }

})(jQuery);

/**
 *  service
 */
(function($) {

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

    $.isEmailOwned = function() {
        var owned = false;

        var that = $('#email');
        var email = that.val();
        $.ajax({
            url: "/social/preUpdateEmail",
            async: false,
            data: {
                email: email
            }
        }).fail(function(res) {
            that.prev().children('span').show();
            owned = true;
        }).done(function(res) {
            that.prev().children('span').hide();
        });

        return owned;
    }

})(jQuery);
