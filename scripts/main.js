var Portfolio = (function($) {

    var ANIMATE_SCROLL_BUTTON_DURATION = 1500;

    function initEventHandlers() {
        $('.image-grid').magnificPopup({
            delegate: '.image',
            gallery: {
                enabled: true
            },
            callbacks: {
                elementParse: function(item) {
                    if (_.contains(item.src, 'vimeo')) {
                        item.type = 'iframe';
                    } else {
                        item.type = 'image';
                    }
                }
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
        return $.get('api/medias.json').done(function(response) {
            _.each(response, function(media) {
                var html = '<a class="image opacity-hover" href="' + media.url + '">';
                html += '<div class="img-border"><img';
                html += ' src="' + media.thumbnail + '"></div>';
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

        }, ANIMATE_SCROLL_BUTTON_DURATION);
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
        }, ANIMATE_SCROLL_BUTTON_DURATION);
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

        setTimeout(function() {
            $('#portfolio .author').addClass('animated flipInY');
        }, 400);
    }

    return {
        init: init
    };

})($);


// On load
$(function() {
    Portfolio.init();
});
