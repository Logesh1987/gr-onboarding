var guideInit = function () {
    var step = 1;
    var increaseStep = function () {
        if (step < 3) {
            step += 1
            sectionSetup.setAttribute('data-step', step)
        }
        return step;
    }
    var decreaseStep = function () {
        if (step > 1) {
            step -= 1
            sectionSetup.setAttribute('data-step', step)
        }
        return step;
    }
    var stepNext = function (e) {
        e.preventDefault()
        if (step == 3) {
            fullpage_api.moveSectionDown();
        } else increaseStep()
    }
    var stepPrev = function (e) {
        e.preventDefault()
        if (step == 1) {
            fullpage_api.moveSectionUp();
        } else decreaseStep()
    }
    var guidePageWrapper = document.querySelector('.guidePageWrapper')
    var mainBlk = document.querySelector('.mainBlock')
    var sectionSetup = document.querySelector('.sectionSetup')
    new fullpage('.mainBlock', {
        autoScrolling: true,
        fadingEffect: 'slides',
        afterRender: function () {
            // fullpage_api.moveTo(2);
            guidePageWrapper.setAttribute('data-active', fullpage_api.getActiveSection().index + 1);
            guidePageWrapper.querySelector('.sectionWelcome').classList.add('play');
        },
        onLeave: function (origin, destination, direction) {
            if (origin.index == 1) {
                if (direction == "down") {
                    if (step == 3) {
                        guidePageWrapper.setAttribute('data-active', destination.index + 1)
                        destination.item.classList.add('play')
                        return true
                    }
                    else {
                        increaseStep()
                        return false
                    }
                } else {
                    if (step == 1) {
                        guidePageWrapper.setAttribute('data-active', destination.index + 1)
                        destination.item.classList.add('play')
                        return true
                    }
                    else {
                        decreaseStep()
                        return false
                    }
                }
            } else {
                guidePageWrapper.setAttribute('data-active', destination.index + 1)

            }
        }
    });
    document.querySelector('.ctaPrev').addEventListener('click', stepPrev)
    document.querySelector('.ctaNext').addEventListener('click', stepNext)
    mainBlk.addEventListener('click', function (e) {
        if (e.target.hasAttribute('data-slide')) {
            e.preventDefault()
            fullpage_api.silentMoveTo(parseInt(e.target.getAttribute('data-slide')))
        }
    })

    var previewSwitch = document.querySelectorAll('.previewSwitch');
    previewSwitch.forEach(function (ele) {
        ele.addEventListener('click', function () {
            fullpage_api.silentMoveTo(parseInt(ele.getAttribute('data-slide')))
        })
    })
    var stepsNav = document.querySelector('.stepsNav');
    stepsNav.addEventListener('click', function (e) {
        if (e.target.tagName == "A") {
            e.preventDefault();
            step = parseInt(e.target.getAttribute('data-step'))
            sectionSetup.setAttribute('data-step', e.target.getAttribute('data-step'))
        }
    })

}

var setupInit = function () {
    $('[data-rangeslider]').rangeslider();
    $('#setupAccordion').on('hidden.bs.collapse', function (e) {
        $(e.target).parent('.card').removeClass('active')
    })
    $('#setupAccordion').on('show.bs.collapse', function (e) {
        $('#setupPaginate li').removeClass('current')
        $(`#setupPaginate li[data-paginate="${e.target.id}"]`).addClass('current')
        $(e.target).parent('.card').addClass('active')
    })
    var mySwiper = new Swiper('.setupSwiper', {
        observer: true,
        observeParents: true,
        allowTouchMove: false,
        // initialSlide: 5,
        autoHeight: true,
        pagination: {
            el: '.setupSwiper-pagination',
        },
        navigation: {
            nextEl: '.setupSwiper-button-next',
            prevEl: '.setupSwiper-button-prev',
        }
    })
    mySwiper.on('slideNextTransitionEnd', function() {
        $('.setupSwiper-pagination .swiper-pagination-bullet-active').prev('.swiper-pagination-bullet').addClass('swiper-pagination-bullet-completed')
    })
    $('label.switch input').change(function () {
        if (this.checked)
            $(this).parents('.setupSteps').removeClass('disabled')
        else
            $(this).parents('.setupSteps').addClass('disabled')
    })
    $('.colorpicker-component').colorpicker();

    $('input[name="loyaltyPoints"]').change(function(e) {
        $('.loyaltyPtForm').hide()
        $(`#input_${e.target.id}`).show()
    })

    $('input[name="cType"]').change(function(e) {
        if(e.target.id === "freeship") 
            $('.maxCouponValue').hide()
        else
            $('.maxCouponValue').show()
    })

    $('#limitReferral').change(function(e) {
        this.checked ? $('#limitReferralForm').show() : $('#limitReferralForm').hide() 
    })

    // bOUNCER VALIDATIONS
    mySwiper.on('slideChange', function() {
        console.log(validatePointsProgram.validateAll('form.form-points-program'))

    })
    var validatePointsProgram = new Bouncer('form.form-points-program');
}

var congratsInit = () => {
    $('#programSwitch').change(e => {
        if(e.target.checked) {
            $('.congratsPage').removeClass('paused')
        } else {
            $('.congratsPage').addClass('paused')
        }
    })

    $('.rating input').change(e => {
        if(e.target.value < 5) {
            $(`.popupRate input[value="${e.target.value}"]`).prop('checked', true)
            setTimeout(e => {
                $('#feedbackModal').modal('show')
            }, 1000)
        }
    })
}

window.addEventListener('load', function () {
    if (document.querySelector('.guidePageWrapper')) {
        guideInit()
    }
    else if (document.querySelector('.setupPage')) {
        setupInit()
    }
    else if (document.querySelector('.congratsPage')) {
        congratsInit()
    }
})