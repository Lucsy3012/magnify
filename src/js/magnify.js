$(document).ready(function () {

    var $body = $('body'),
        activeClass = 'magnified';

    adaptHeight();

    $(window).on('scroll', function() {
        adaptHeight();
    });

    $(window).on('resize', function() {
        adaptHeight();

        $('.magnify--js.magnified').each(function() {
            changePosition($(this), $(this).find('img'), 40);
        });
    });

    // Add backdrop to every magnifiable image
    $body.find('.magnify--js').append('<div class="backdrop"></div>');

    // Reset with click on backdrop
    $body.on('click', '.magnify--js .backdrop', function() {
        reset();
    });

    // Magnify
    $body.on('click', '.magnify--js img', function(e) {
        magnify($(this));
    });

    function getRatio($el) {
        return 100 / $el.width() * $el.height();
    }

    function adaptHeight() {
        $('.magnify--js').each(function() {
            var $holder = $(this),
                $img = $holder.find('img');

            // get necessary height
            var ratio = getRatio($img),
                ratioHeight = $holder.width() / 100 * ratio;

            $holder.css('height', ratioHeight);
        });
    }

    function magnify($el) {
        var $parent = $el.parents('.magnify--js'),
            spaceAround = parseFloat($el.attr('data-space-around')),
            _magnified = $parent.hasClass(activeClass);

        reset();

        // is currently not magnified
        if (!_magnified) {
            $parent.addClass(activeClass);
            changePosition($parent, $el, spaceAround);
        } else {
            reset();
        }
    }

    function changePosition($holder, $img, spaceAround) {
        if ($img.attr('data-space-around') !== undefined) {
            spaceAround = parseFloat($img.attr('data-space-around'));
        } else {
            spaceAround = 40;
        }

        console.log(spaceAround);

        var top, left;

        // get window dimensions
        var $window = $(window),
            windowWidth = $window.width() - (spaceAround * 2),
            windowHeight = $window.height() - (spaceAround * 2);

        // get necessary height
        var ratio = getRatio($img),
            ratioWidth = windowHeight / ratio * 100,
            ratioHeight = windowWidth / 100 * ratio;

        // if portrait mode image
        if (ratio > 100 || windowHeight + (spaceAround * 2) < ratioHeight + (spaceAround * 2)) {
            top = 0 - $holder.offset().top + $window.scrollTop() + spaceAround;
            left = ($window.width() / 2) - (ratioWidth / 2) - $holder.offset().left;

            $img.css({
                'top': top,
                'left': left,
                'width': ratioWidth
            });

        } else {
            top = $window.scrollTop() + ($window.height() / 2) - (ratioHeight / 2) - $holder.offset().top;
            left = 0 - $holder.offset().left + spaceAround;

            $img.css({
                'top': top,
                'left': left,
                'width': windowWidth
            });
        }
    }

    function reset() {
        $('.magnify--js img').css({
            'top': 0,
            'left': 0,
            'width': '100%'
        });
        $('.magnify--js').removeClass(activeClass);
    }

});