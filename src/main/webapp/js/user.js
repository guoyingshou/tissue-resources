/**
(function($) {
 
    $(document).on('focusout', '#signupForm #username', function(e) {
        $.isUsernameTaken(); 
    });

    $(document).on('focusout', '#signupForm #email', function(e) {
        $.isEmailTaken(); 
    });

})(jQuery);

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

})(jQuery);

*/
