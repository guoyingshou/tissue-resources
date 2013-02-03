(function($) {

    function enable() {
        var sum = 0;
        $('form .sum').each(function() {
            sum = sum + $(this).data("v");
        });

        if(sum == 6) {
            $('input[type="submit"]').removeAttr("disabled");
        }
        else {
            $('input[type="submit"]').attr("disabled", true);
        }
    }

    function isMatch() {

        var password = $('#password');
        var confirm = $('#confirm');
        confirm.data("v", 0);

        if(password.val() != confirm.val()) {
            confirm.prev().children('span.mismatch').show();
        }
        else {
            confirm.prev().children('span.mismatch').hide();
            confirm.data("v", 1);
        }
    }

    $.fn.checkEmpty = function() {
        this.data("v", 0);

        var v = this.prev().children('span.empty');
        if(this.val() == "") {
            v.show();
        }
        else {
            v.hide();
            this.data("v", 1);
        }
        enable();
    }

    $.fn.checkUsernameTaken = function() {
        this.data("v", 0);

        var that = this;
        var username = this.val();

        $.ajax({
            url: "/social/checkUsername",
            async: false,
            data: {
                username: username
            }
        }).fail(function(res) {
            that.prev().children('span.taken').show();
        }).done(function(res) {
            that.prev().children('span.taken').hide();
            that.data("v", 1);
        });
        enable();
    }

    $.fn.checkEmailTaken = function() {
        this.data("v", 0);

        var that = this;
        var email = this.val();

        $.ajax({
            url: "/social/checkEmail",
            async: false,
            data: {
                email: email
            }
        }).fail(function(res) {
            that.prev().children('span.taken').show();
        }).done(function(res) {
            that.prev().children('span.taken').hide();
            that.data("v", 1);
        });
        enable();
    }

    $.fn.checkLength = function() {

        this.data("v", 0);

        var pass = this.val();
        if(pass.length < 6) {
            this.prev().children('span.short').show();
        }
        else {
            this.prev().children('span.short').hide();
            this.data("v", 1);
        }

        if($('#confirm').val() != "") {
            isMatch();
        }
        enable();
    }
 
    $.fn.checkMatch = function() {
        isMatch();
        enable();
    }

})(jQuery);
