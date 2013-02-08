(function($) {

    function isUsernameEmpty() {
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
            that.prev().children('span').show();
            taken = true;
        }).done(function(res) {
            that.prev().children('span').hide();
        });

        return taken;
    }

    function isPasswordInvalid() {
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

    function isConfirmMismatch() {
        var misMatch = $('#password').val() != $('#confirm').val();
        console.log("misMatch: " + misMatch);
        if(misMatch) {
            $('#confirm').prev().children('span').show();
        }
        else {
            $('#confirm').prev().children('span').hide();
        }
        return misMatch;
    }

    function isEmailInvalid() {
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
            that.prev().children('span').show();
            taken = true;
        }).done(function(res) {
            that.prev().children('span').hide();
        });

        return taken;
    }

    function isEmailOwned() {
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

    function isDisplayNameEmpty() {
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

    function isHeadlineEmpty() {
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

    $.fn.isUsernameTaken = function() {
        isUsernameTaken();
    }

    $.fn.isEmailTaken = function() {
        isEmailTaken();
    }

    $.fn.validate = function() {
        if(isUsernameEmpty() || isDisplayNameEmpty() || isHeadlineEmpty() || isEmailInvalid() || isPasswordInvalid() || isConfirmMismatch() || isUsernameTaken() || isEmailTaken()) {
            return false;
        }
    }

    $.fn.changeContactDialog = function() {
        mask();
        var dia = $('#contactEditForm').clone();
        positionDialog(dia, 420);
        dia.show();
        addCancelListener(dia);

        $('form', dia).submit(function(e) {
            if(isEmailInvalid() || isEmailOwned()) { 
                return false;
            }
        });
        return this;
    }


    $.fn.changeProfileDialog = function() {
        mask();
        var dia = $('#profileEditForm').clone();
        positionDialog(dia, 420);
        dia.show();
        addCancelListener(dia);

        $('form', dia).submit(function(e) {
            if(isDisplayNameEmpty() || isHeadlineEmpty()) {
                return false;
            }
            
            //todo: validate data
        });
        return this;
    }

    $.fn.changePassDialog = function() {
        mask();
        var dia = $('#passChangeForm').clone();
        positionDialog(dia, 420);
        dia.show();
        addCancelListener(dia);

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
