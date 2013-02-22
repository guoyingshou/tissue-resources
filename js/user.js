/**
 * Change displayName, headline event handlers.
 */
(function($) {
     $(document).on('click', 'a.edit-profile', function(e) {
         e.preventDefault();
         $(this).changeProfileDialog();
     });

     $.fn.changeProfileDialog = function() {
        var url = this.data("action");
        var dia = $('#profileEditForm').clone();
        $.positionDialog(dia, 420);
        $.addCancelListener(dia);
        $.mask();
        dia.show();

        $('form', dia).submit(function(e) {
            if($.isDisplayNameEmpty() || $.isHeadlineEmpty()) {
                return false;
            }
            $(this).attr("action", url);
        });
        return this;
    }
})(jQuery);

/**
 * Change password event handlers.
 */
(function($) {
    $(document).on('click', 'a.change-pass', function(e) {
        e.preventDefault();
        $(this).changePassDialog();
    });
 
    $.fn.changePassDialog = function() {
        var url = this.data("action");
        var dia = $('#passChangeForm').clone();
        $.positionDialog(dia, 420);
        $.addCancelListener(dia);
        $.mask();
        dia.show();

        $('form', dia).submit(function(e) {
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
})(jQuery);

/**
 *  Change contact event handlers
 */
(function($) {
    $(document).on('click', 'a.edit-contact', function(e) {
        e.preventDefault();
        $(this).changeContactDialog();
    });

    $.fn.changeContactDialog = function() {
        var url = this.data("action");
        var dia = $('#contactEditForm').clone();
        $.positionDialog(dia, 420);
        $.addCancelListener(dia);
        $.mask();
        dia.show();

        $('form', dia).submit(function(e) {
            if($.isEmailInvalid() || $.isEmailOwned()) { 
                return false;
            }
            $(this).attr("action", url);
        });
    }
})(jQuery);

/**
 *  Singup Event Handlers
 */
(function($) {

    $(document).on('focusout', '#username', function(e) {
        return $.isUsernameTaken(); 
    });

    $(document).on('focusout', '#email', function(e) {
        return $.isEmailTaken(); 
    });

    $(document).one('focusin', '#headline', function(e) {
        $(this).val('');
    });

    $(document).on('submit', '#signupForm', function(e) {
        return $(this).validate();
    });
 
    $.isUsernameEmpty = function() {
        var username = $('#username');
        var empty = username.val().length;
        if(empty == 0) {
            username.prev().children('span').show();
            return true;
        }
        else {
            username.prev().children('span').hide();
            return false;
        }
    }

    $.isUsernameTaken = function() {
        var taken = false;

        var that = $('#username');
        var username = that.val();
        $.ajax({
            type: "post",
            url: "/social/preAddUsername",
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

    $.isPasswordInvalid = function() {
        var password = $('#password');
        if(password.val().length < 6) {
            password.prev().children('span').show();
            return true;
        }
        else {
            password.prev().children('span').hide();
            return false;
        }
    }

    $.isConfirmMismatch = function() {
        var misMatch = $('#password').val() != $('#confirm').val();
        if(misMatch) {
            $('#confirm').prev().children('span').show();
        }
        else {
            $('#confirm').prev().children('span').hide();
        }
        return misMatch;
    }

    $.isEmailInvalid = function() {
        var email = $('#email');
        
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        if(!emailReg.test(email.val()) || email.val().length < 6) {
            email.prev().children('span').show();
            return true;
        }
        else {
            email.prev().children('span').hide();
            return false;
        }
    };

    $.isEmailTaken = function() {
        var taken = false;

        var that = $('#email');
        var email = that.val();
        $.ajax({
            type: "post",
            url: "/social/preAddEmail",
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

    $.isDisplayNameEmpty = function() {
        var displayName = $('#displayName');
        var empty = displayName.val().length;
        if(empty == 0) {
            displayName.prev().children('span').show();
            return true;
        }
        else {
            displayName.prev().children('span').hide();
            return false;
        }
    }

    $.isHeadlineEmpty = function() {
        var headline = $('#headline');
        var empty = headline.val().length;
        if(empty == 0) {
            headline.prev().children('span').show();
            return true;
        }
        else {
            headline.prev().children('span').hide();
            return false;
        }
    }

    $.fn.validate = function() {
        $.mask();
        if($.isUsernameEmpty() || $.isDisplayNameEmpty() || $.isHeadlineEmpty() || $.isEmailInvalid() || $.isPasswordInvalid() || $.isConfirmMismatch() || $.isUsernameTaken() || $.isEmailTaken()) {
            $('#mask').remove();
            return false;
        }
    }
})(jQuery);

/**
 *  Invitation Event Handlers
 */
(function($) {
    $(document).on('click', 'a.invite', function(e) {
        e.preventDefault();
        $(this).inviteDialog();
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
           console.log("fail");   
        });
    });

    $.fn.inviteDialog = function() {
        var that = this;
        url = this.data('action');

        var dia = $('#inviteForm').clone();
        $.positionDialog(dia, 650);
        $.addCancelListener(dia);
        $.mask();
        dia.show();

        $('form', dia).submit(function(e) {
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


(function($) {
    $(document).on('click', 'a.add-impression', function(e) {
        e.preventDefault();
        $(this).oneItemDialog();
    });

    $(document).on('click', 'a.edit-resume', function(e) {
        e.preventDefault();
        $(this).oneItemDialog();
    });
})(jQuery);
