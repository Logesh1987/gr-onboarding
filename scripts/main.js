// var grApp = angular.module('grOnboarding', []);
// grApp.controller('onBoardController', function ($scope) {
//     $scope.clientCount = 11256;
//     $scope.activeSetupStep = 1;


//     $scope.clientCount = 11256;
//     $scope.clientCount = 11256;


// });


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
    $('[data-toggle="popover"]').popover()
    $('#setupAccordion').on('shown.bs.collapse', function (e) {
        $('.card').removeClass('active')
        $(e.target).parent('.card').addClass('active')
    })
    $('#setupAccordion').on('show.bs.collapse', function (e) {
        $('#setupPaginate li').removeClass('current')
        $(`#setupPaginate li[data-paginate="${e.target.id}"]`).addClass('current')
        $(e.target).parent('.card').addClass('active')
    })
    var mySwiper = new Swiper('.setupSwiper', {
        observer: true,
        observeParents: true,
        autoHeight: true,
        allowTouchMove: false,
        // initialSlide: 5,
        autoHeight: true,
        pagination: {
            el: '.setupSwiper-pagination',
        }
    })
    $('.colorpicker-component').colorpicker();

    $('#limitReferral').change(function (e) {
        this.checked ? $('#limitReferralForm').show() : $('#limitReferralForm').hide()
    })

    $('.sampleModalTrigger').click(function(e) {
        e.preventDefault()
        $('#sampleModal img').attr('src', $(this).data('img'))
        $('#sampleModal img').on('load', function() {
            $('#sampleModal').modal('show')
        })
    })

    $('.addReward').click(function(e) {
        e.preventDefault();
        e.stopPropagation();
        $('#rewardsModal').modal('show')
    })

    // bOUNCER VALIDATIONS
    mySwiper.on('slideChangeTransitionEnd', e => {
        if (mySwiper.isEnd) {
            $('.setupSwiper-button-next').addClass('disabled');
            $('.saveBar').show()
        }
        else {
            $('.setupSwiper-button-next').removeClass('disabled')
            $('.saveBar').hide()
        }

        if (mySwiper.isBeginning)
            $('.setupSwiper-button-prev').addClass('disabled')
        else
            $('.setupSwiper-button-prev').removeClass('disabled')
    })
    $('.setupSwiper-button-next').click(e => {
        if ($('.swiper-slide-active input[name="mainSwitch"]').is(':checked')) {
            if ($('.swiper-slide-active form ').valid()) {
                $('.setupSwiper-pagination .swiper-pagination-bullet-active').addClass('swiper-pagination-bullet-completed')
                mySwiper.slideNext();
            }
            mySwiper.updateAutoHeight(500);
        } else {
            $('.setupSwiper-pagination .swiper-pagination-bullet-active').addClass('swiper-pagination-bullet-pending')
            mySwiper.slideNext()
        }
    })
    $('.setupSwiper-button-prev').click(e => {
        mySwiper.slidePrev()
    })

    $('#saveProcess').click(e => {
        var ongoingSetup = $('.card.active').attr('id')
        
        if (ongoingSetup === 'setupBlock') {
            //SAVE SETUP FORMS
            // THEN
            $('#rewards').collapse('show');
            $(`.card-header[aria-controls="rewards"`).removeClass('disabled');
        } else if (ongoingSetup === "rewardsBlock") {
            $('#themes').collapse('show');
            $(`.card-header[aria-controls="themes"`).removeClass('disabled');
            $('#saveProcess').hide();
            $('#publishProcess').show()
        } 
    })
    $('#publishProcess').click(e => {
        e.preventDefault();
        //SAVE OTHER FORMS
        window.location = '/congrats.html';
    })

    // FORM VALIDATION RULES
    $('#form-points-program').validate({
        errorElement: "em",
        rules: {
            purchaseFor: {
                required: "#fixed:checked",
                min: 1
            },
            rewardPoint: {
                required: "#fixed:checked",
                min: 1
            },
            purchasePercent: {
                required: "#percentage:checked",
                min: 1
            }
        }
    })
    $('#form-signup-bonus').validate({
        errorElement: "em",
        rules: {
            welcomeBonus: {
                required: true,
                min: 1
            },
            welcomeNote: {
                required: "#welcomeNoteMandate:checked",
                minlength: 25
            }
        }
    })
    $('#form-payby-points').validate({
        rules: {
            pbpRewardpoints: {
                required: true,
                min: 1
            }
        }
    })
    $('#form-referral-program').validate({
        errorElement: "em",
        rules: {
            rpRewardpoints: {
                required: true,
                min: 1
            },
            rpTotalGoals: {
                required: true,
                min: 1
            },
            rpMaxrewards: {
                required: "#limitReferral:checked",
                min: 1
            },
            rpMcv: {
                required: function (e) {
                    return (!$('#freeship').is(':checked'))
                },
                min: 1
            },
            rpMsv: {
                required: true,
                min: 1
            }
        }
    })
    $('#form-fb-share').validate({
        errorElement: "em",
        rules: {
            fbRewardPoint: {
                required: true,
                min: 1
            },
            fbSharetxt: {
                required: true,
                minlength: 10
            },
            fbConnectUrl: {
                required: true,
                url: true
            },
        }
    })
    $('#form-tw-share').validate({
        errorElement: "em",
        rules: {
            twRewardPoint: {
                required: true,
                min: 1
            },
            twSharetxt: {
                required: true,
                minlength: 10
            },
            twConnectUrl: {
                required: true,
                url: true
            },
        }
    })
    $('#form-birthday-rewards').validate({
        rules: {
            bRewards: {
                min: 1
            },
            obRewards: {
                min: 1
            }
        }
    })
    $('#form-woo-rewards').validate({
        errorElement: "em",
        rules: {
            wooRewards: {
                required: true,
                url: true
            }
        }
    })
    $('#form-subscribe').validate({
        errorElement: "em",
        rules: {
            subscribeRewards: {
                required: true,
                min: 1
            }
        }
    })
}

var congratsInit = () => {
    // $('#programSwitch').change(e => {
    //     if (e.target.checked) {
    //         $('.congratsPage').removeClass('paused')
    //     } else {
    //         $('.congratsPage').addClass('paused')
    //     }
    // })

    $('.feedbackRating input').change(e => {
        if (e.target.value < 5) {
            $(`.popupRate input[value="${e.target.value}"]`).prop('checked', true)
            setTimeout(e => {
                $('#feedbackModal').modal('show')
            }, 1000)
        } else {
            $('.rateContainer p').text($('.rateContainer p').data('reply'))
        }
    })

    $('.popupRate input').change(e => {
        $(`.feedbackRating input[value="${e.target.value}"]`).prop('checked', true)
        if (e.target.value < 5) {
            $('.lowRatingFeedback').show();
        } else {
            $('.lowRatingFeedback').hide();
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
});