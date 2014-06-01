var Portfolio = (function($) {

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

    function init() {
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
