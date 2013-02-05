(function($) {

    function isEmpty() {
        var empty = false;
        $('.sum').each(function() {
            if($(this).val() == '') {
                if($(this).is('#password')) {
                   $(this).prev().children('span.error-password-invalid').show();
                }
                else if($(this).is('#confirm')) {
                   $(this).prev().children('span.error-confirm-mismatch').show();
                }
                else {
                    $(this).prev().children('span.error-empty').show();
                }
                empty = true;
            }
            else {
                if($(this).is('#password')) {
                   $(this).prev().children('span.error-password-invalid').hide();
                }
                else if($(this).is('#confirm')) {
                   $(this).prev().children('span.error-confirm-mismatch').hide();
                }
                else {
                    $(this).prev().children('span.error-empty').hide();
                }
            }
        });

        return empty;
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
        console.log($('#password').val());
        console.log($('#confirm').val());

        var match = $('#password').val() == $('#confirm').val();
        if(match) {
            $('#confirm').prev().children('span.error-confirm-mismatch').hide();
        }
        else {
            $('#confirm').prev().children('span.error-confirm-mismatch').show();
        }
        return match;
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

    function isValidEmail() {
        var email = $('#email');
        
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        if(!emailReg.test(email.val())) {
            email.prev().children('span.error-email-format').show();
            return false;
        }
        else {
            email.prev().children('span.error-email-format').hide();
            return true;
        }
    }

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

    $.fn.validate = function() {
        var submit = true;

        if(isEmpty()) {
            submit = false;
        }

        if(!isPasswordValid()) {
            submit = false;
        }
       
        if(!isConfirmMatch()) {
            submit = false;
        }
 
        if(isUsernameTaken()) {
            submit = false;
        }

        if(!isValidEmail()) {
            submit = false;
        }

        if(isEmailTaken()) {
            submit = false;
        }

        if(submit) {
            $('#signupForm').submit();
        }
    }

})(jQuery);
