var init = function () {
    // var sMain = new Swiper('.mainBlock', {
    //     direction: 'vertical',
    //     // initialSlide: 1,
    //     cssMode: true,
    //     parallax: true,
    //     mousewheel: {
    //         sensitivity: 1
    //     },
    // });
    // var sSetup = new Swiper('.setupBlock', {
    //     direction: 'vertical',
    //     effect: 'slide',
    //     parallax: true
    // });

    var between = function (x, min, max) {
        return x >= min && x <= max;
    }
    var mainBlk = document.querySelector('.mainBlock')
    new fullpage('.mainBlock', {
        autoScrolling: true,
        fadingEffect: 'slides',
        onLeave: function (origin, destination, direction) {
            if (between(origin.index, 1, 3) && between(destination.index, 1, 3)) {
                mainBlk.classList.add('noTransit')
            } else {
                mainBlk.classList.remove('noTransit')
            }
        }
    });

    mainBlk.addEventListener('click', function(e) {
        if(e.target.hasAttribute('data-slide')) {
            console.log('sadsad')
            e.preventDefault()
            fullpage_api.silentMoveTo(parseInt(e.target.getAttribute('data-slide')))
        }
    })

}

window.addEventListener('load', init)