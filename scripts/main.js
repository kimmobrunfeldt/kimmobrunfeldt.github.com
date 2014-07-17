var Portfolio = (function($) {

    var ANIMATE_SCROLL_BUTTON_DURATION = 1500;

    function initEventHandlers() {
        $('.image-grid').magnificPopup({
            delegate: '.image',
            gallery: {
                enabled: true
            },
            fixedContentPos: true,
            fixedBgPos: true,
            overflowY: 'scroll',
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

        $('#landing .scroll').on('click', function() {
            $('html, body').animate({
                scrollTop: $('#images').offset().top + 5
            }, 800);
        });
    }

    function renderThumbnails() {
        return $.get('api/content.json').done(function(response) {

            _.each(response, renderAlbumThumbnails);

            // Call retina.js API for dynamically added images
            $('.image-grid img').each(function() {
                new RetinaImage(this);
            });

        }).fail(function errorHandler(jqXhr, textStatus, errorThrown) {
            $('.image-grid').html('<p>No images</p>');

            console.error(jqXhr);
            console.error(textStatus);
            throw new Error(errorThrown);
        });
    }

    function renderAlbumThumbnails(album) {
        var imageHtmls = [];

        _.each(album.content, function(media) {
            var html = '<a class="image opacity-hover" href="' + media.url + '">';
            html += '<div class="img-border"><img data-no-retina';
            html += ' src="' + media.thumbnail + '"></div>';
            html += '</a>';

            imageHtmls.push(html);
        });

        $('#album-' + album.id + ' .image-grid').html(imageHtmls.join('\n'));
    }

    function animateScrollButtonLargeScreen() {
        // Initial animation for "scroll down" - button

        $('#landing .scroll')
        .css('z-index', -1)
        .css('bottom', 10)
        .css('right', 300)
        .removeClass('hidden');

        setTimeout(function() {

            move('#landing .scroll')
                .rotate(360)
                .set('bottom', 0)
                .set('right', 0)
                .end(function() {
                    $('#landing .scroll')
                        .removeAttr('style')
                        .addClass('opacity-hover')
                        .css('z-index', 2);
                });

        }, ANIMATE_SCROLL_BUTTON_DURATION);
    }

    function animateScrollButtonNarrowScreen() {
        $('#landing .scroll')
        .removeClass('hidden');

        setTimeout(function() {
            move('#landing .scroll')
                .rotate(360)
                .end(function() {
                    $('#landing .scroll')
                        .removeAttr('style')
                        .addClass('opacity-hover')
                        .css('z-index', 2);
                });
        }, ANIMATE_SCROLL_BUTTON_DURATION);
    }

    function animate() {
        if ($(window).width() > 660) {
            animateScrollButtonLargeScreen();
        } else {
            animateScrollButtonNarrowScreen();
        }

        setTimeout(function() {
            $('#landing .author').addClass('animated flipInY');
        }, 400);
    }

    function init() {
        move.defaults = {
            duration: 600
        };

        animate();
        return renderThumbnails().then(initEventHandlers);
    }

    return {
        init: init
    };

})($);


// On load
$(function() {
    Portfolio.init();

    setTimeout(function hello() {
        console.debug('\n\nHi!\n');
        console.debug('The code is ok-ish.. Also check https://github.com/kimmobrunfeldt');
    }, 2000);

});
