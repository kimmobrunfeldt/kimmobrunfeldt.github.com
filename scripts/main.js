
var Portfolio = (function($) {

    function animateBlurBackground() {
        $('.background').animate({blurRadius: 5}, {
            duration: 500,
            easing: 'swing',
            step: function() {
                $('.background').css({
                    "-webkit-filter": "blur("+this.blurRadius+"px)",
                    "filter": "blur("+this.blurRadius+"px)"
                });
            }
        });
    }

    function initPanelSnap() {
        var options = {
            keyboardNavigation: {
                enabled: true,
                nextPanelKey: 40,
                previousPanelKey: 38,
                wrapAround: false
            }
        };

        $('body').panelSnap(options);
    }

    function initEventHandlers() {
        $('.image-grid').magnificPopup({
            delegate: '.image',
            type: 'image',
            gallery: {
                enabled: true
            }
        });
    }

    function renderThumbnails() {
        var imageHtmls = [];
        return $.get('/api/pictures.json').done(function(response) {
            _.each(response, function(picture) {
                var html = '<a class="image" href="' + picture.picture + '">';
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

    function init() {
        initPanelSnap();
        renderThumbnails().then(initEventHandlers);
    }

    return {
        init: init
    };

})($);


// On load
$(function() {
    Portfolio.init();
});
