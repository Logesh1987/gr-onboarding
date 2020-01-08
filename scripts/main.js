var init = function () {
    var sMain = new Swiper('.mainBlock', {
        direction: 'vertical',
        // initialSlide: 1,
        cssMode: true,
        parallax: true,
        mousewheel: {
            sensitivity: 1
        },
    });
    var sSetup = new Swiper('.setupBlock', {
        direction: 'vertical',
        effect: 'slide',
        parallax: true
    });

    document.querySelector('.setupBlock').addEventListener('click', function(e) {
        if(e.target.hasAttribute('data-slide')) {
            e.preventDefault()
            sSetup.slideTo(e.target.getAttribute('data-slide'))
        }
    })

}

window.addEventListener('load', init)