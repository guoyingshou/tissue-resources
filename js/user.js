(function($) {

    function isUsernameEmpty() {
        var username = $('#username');
        var empty = username.val().length;
        if(empty == 0) {
            username.prev().children('span.error-empty').show();
            return true;
        }
        else {
            username.prev().children('span.error-empty').hide();
            return false;
        }
    }

    function isUsernameTaken() {
        var taken = false;

        var that = $('#username');
        var username = that.val();
        $.ajax({
            url: "/social/preAddUsername",
            async: false,
            data: {
                username: username
            }
        }).fail(function(res) {
            that.prev().children('span.error-username-taken').show();
            taken = true;
        }).done(function(res) {
            that.prev().children('span.error-username-taken').hide();
        });

        return taken;
    }

    $.fn.checkUsernameEmpty = function() {
        isUsernameEmpty();
    }

    $.fn.checkUsernameTaken = function() {
        isUsernameTaken();
    }

    function isPasswordValid() {
        var password = $('#password');
        if(password.val().length < 6) {
            password.prev().children('span.error-password-invalid').show();
            return false;
        }
        else {
            password.prev().children('span.error-password-invalid').hide();
            return true;
        }
    }

    function isConfirmMatch() {
        var match = $('#password').val() == $('#confirm').val();
        if(match) {
            $('#confirm').prev().children('span.error-confirm-mismatch').hide();
        }
        else {
            $('#confirm').prev().children('span.error-confirm-mismatch').show();
        }
        return match;
    }


    $.fn.checkPassword = function() {
        isPasswordValid();
        isConfirmMatch(); 
    };

    function isEmailValid() {
        var email = $('#email');
        
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        if(!emailReg.test(email.val()) || email.val().length < 6) {
            email.prev().children('span.error-email-taken').hide();
            email.prev().children('span.error-email-format').show();
            return false;
        }
        else {
            email.prev().children('span.error-email-taken').hide();
            email.prev().children('span.error-email-format').hide();
            return true;
        }
    };

    $.fn.checkEmailFormat = function() {
        isEmailValid();
    };

    function isEmailTaken() {
        var taken = false;

        var that = $('#email');
        var email = that.val();
        $.ajax({
            url: "/social/preAddEmail",
            async: false,
            data: {
                email: email
            }
        }).fail(function(res) {
            that.prev().children('span.error-email-taken').show();
            taken = true;
        }).done(function(res) {
            that.prev().children('span.error-email-taken').hide();
        });

        return taken;
    }

    $.fn.checkEmailTaken = function() {
        if(isEmailValid()) {
            isEmailTaken();
        }
    };

    function isDisplayNameEmpty() {
        var displayName = $('#displayName');
        var empty = displayName.val().length;
        if(empty == 0) {
            displayName.prev().children('span.error-empty').show();
            return true;
        }
        else {
            displayName.prev().children('span.error-empty').hide();
            return false;
        }
    }


    $.fn.checkDisplayNameEmpty = function() {
        isDisplayNameEmpty();
    }

    function isHeadlineEmpty() {
        var headline = $('#headline');
        var empty = headline.val().length;
        if(empty == 0) {
            headline.prev().children('span.error-empty').show();
            return true;
        }
        else {
            headline.prev().children('span.error-empty').hide();
            return false;
        }
    }

    $.fn.checkHeadlineEmpty = function() {
        isHeadlineEmpty();
    }

    $.fn.validate = function() {

        if(isUsernameEmpty()) {
            return false;
        }

        if(isDisplayNameEmpty()) {
            return false;
        }

        if(isHeadlineEmpty()) {
            return false;
        }

        if(!isEmailValid()) {
            return false;
        }

        if(!isPasswordValid()) {
            return false;
        }

        if(!isConfirmMatch()) {
            return false;
        }

        if(isUsernameTaken()) {
            return false;
        }

        if(isEmailTaken()) {
            return false;
        }

        $('#signupForm').submit();
    }

    $.fn.editProfileDialog = function() {
        mask();
        var dia = $('#editProfileForm').clone();
        positionDialog(dia, 420);

        dia.show();
        addCancelListener(dia);

        $('form', dia).submit(function(e) {
            //todo: validate data
        });
        return this;
    }

    $.fn.changePassDialog = function() {
        mask();
        var dia = $('#changePassForm').clone();
        positionDialog(dia, 420);
        dia.show();
        addCancelListener(dia);

        $('form', dia).submit(function(e) {
            //todo: validate data
        });
        return this;
    }

    $.fn.inviteDialog = function() {
        mask();

        var ele = this;

        var dia = $('#inviteForm').clone();
        positionDialog(dia, 650);
        dia.show();
        addCancelListener(dia);

        $('form', dia).submit(function(e) {
            e.preventDefault();
            $.ajax({
                type: "POST",
                url: ele.attr('href'),
                headers: {"Accept": "text/html"},
                data: {content: $('textarea', dia).val()}
            }).done(function(res) {
                ele.remove();
                dia.remove();
                $('#mask').remove();
            });
        });
        return this;
    }

})(jQuery);
