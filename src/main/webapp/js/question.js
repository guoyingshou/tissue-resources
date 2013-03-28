$(document).ready(function() {

    $(document).on('click', 'a.create-answer', function(e) {
        console.log("fjaf");
        e.preventDefault();
        $(this).createDialog("#answerForm");
    });

    $(document).on('click', 'a.update-answer', function(e) {
        e.preventDefault();
        $(this).updateDialog("#answerForm");
    });

    $(document).on('click', 'a.create-answerComment', function(e) {
        e.preventDefault();
        $(this).createDialog("#answerCommentForm");
    });

    $(document).on('click', 'a.update-answerComment', function(e) {
        e.preventDefault();
        $(this).updateDialog("#answerCommentForm");
    });

    $(document).on('click', 'a.create-questionComment', function(e) {
        e.preventDefault();
        $(this).createDialog("#questionCommentForm");
    });

    $(document).on('click', 'a.update-questionComment', function(e) {
        e.preventDefault();
        $(this).updateDialog("#questionCommentForm");
    });

});

