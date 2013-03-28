$(document).ready(function() {

    $(document).on('click', 'a.create-message', function(e) {
        e.preventDefault();
        $(this).createDialog("#messageForm");
    });

    $(document).on('click', 'a.update-message', function(e) {
        e.preventDefault();
        $(this).updateDialog("#messageForm");
    });

    $(document).on('click', 'a.create-reply', function(e) {
        e.preventDefault();
        $(this).createDialog("#replyForm");
    });

    $(document).on('click', 'a.update-reply', function(e) {
        e.preventDefault();
        $(this).updateDialog("#replyForm");
    });

});

