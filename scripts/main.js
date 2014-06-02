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

    function animateScrollButtonLargeScreen() {
        // Initial animation for "scroll down" - button

        $('#portfolio .scroll')
        .css('z-index', -1)
        .css('bottom', 10)
        .css('right', 300)
        .removeClass('hidden');

        setTimeout(function() {

            move('#portfolio .scroll')
                .rotate(360)
                .set('bottom', 0)
                .set('right', 0)
                .end(function() {
                    $('#portfolio .scroll')
                        .removeAttr('style')
                        .addClass('opacity-hover')
                        .css('z-index', 2);
                });
        }, 500);
    }

    function animateScrollButtonNarrowScreen() {
        $('#portfolio .scroll')
        .removeClass('hidden');

        setTimeout(function() {
            move('#portfolio .scroll')
                .rotate(360)
                .end(function() {
                    $('#portfolio .scroll')
                        .removeAttr('style')
                        .addClass('opacity-hover')
                        .css('z-index', 2)
                });
        }, 500);
    }

    function init() {
        move.defaults = {
            duration: 600
        };

        renderThumbnails().then(initEventHandlers);

        if ($(window).width() > 600) {
            animateScrollButtonLargeScreen();
        } else {
            animateScrollButtonNarrowScreen();
        }



    }

    return {
        init: init
    };

})($);


// On load
$(function() {
    Portfolio.init();
});
