
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

    function viewButtons() {
        $landing = $('#landing');
        $portfolio = $('#portfolio');

        $('body').click(function() {
            $portfolio.removeClass('hidden');
            $('body').animate(
                {scrollTop: $(window).height()},
                1000,
                'swing',
                function() {
                    $landing.addClass('hidden');
                }
            );
        });
    }

    function initPanelSnap() {
        var options = {
            $menu: false,
            menuSelector: 'a',
            panelSelector: 'section',
            namespace: '.panelSnap',
            onSnapStart: function(){},
            onSnapFinish: function(){},
            onActivate: function(){},
            directionThreshold: 50,
            slideSpeed: 200,
            keyboardNavigation: {
                enabled: trye,
                nextPanelKey: 40,
                previousPanelKey: 38,
                wrapAround: false
            }
        };

        $('.sections').panelSnap(options);
    }

    function init() {
        //setTimeout(animateBlurBackground, 500);
        viewButtons();
        initPanelSnap();
    }

    return {
        init: init
    };

})($);


// On load
$(function() {
    Portfolio.init();
});
