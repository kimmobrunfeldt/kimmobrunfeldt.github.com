
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

    function init() {
        //setTimeout(animateBlurBackground, 500);
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
