var Portfolio = (function($) {

    function initEventHandlers() {
        $('.image-grid').magnificPopup({
            delegate: '.image',
            type: 'image',
            gallery: {
                enabled: true
            }
        });

        $('#portfolio .scroll').on('click', function() {
            $('html, body').animate({
                scrollTop: $(window).height()
            }, 800);
        });
    }

    function renderThumbnails() {
        var imageHtmls = [];
        return $.get('api/pictures.json').done(function(response) {
            _.each(response, function(picture) {
                var html = '<a class="image opacity-hover" href="' + picture.picture + '">';
                html += '<img';
                html += ' src="' + picture.thumbnail + '">';
                html += '</a>';

                imageHtmls.push(html);
            });

            $('.image-grid').html(imageHtmls.join('\n'));

        }).fail(function() {
            $('.image-grid').html('<p>No images</p>');
        });
    }

    function animateScrollButton() {

        move.defaults = {
            duration: 600
        };

        // Initial animation for "scroll down" - button
        setTimeout(function() {

            move('#portfolio .scroll')
                .rotate(360)
                .set('bottom', 0)
                .set('right', 0)
                .set('opacity', 0.75)
                .then()
                    .set('opacity', 1)
                    .pop()
                .end(function() {
                    $('#portfolio .scroll')
                        .removeAttr('style')
                        .addClass('opacity-hover')
                        .css('z-index', 2)
                        .css('bottom', 0)
                        .css('right', 0);
                });
        }, 500);
    }

    function init() {
        renderThumbnails().then(initEventHandlers);
        animateScrollButton();
    }

    return {
        init: init
    };

})($);


// On load
$(function() {
    Portfolio.init();
});
