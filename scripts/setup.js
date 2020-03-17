Vue.component('radio-grp', {
    props: ['name', 'value', 'options'],
    template: `<div class="btn-group btn-group-toggle btnGrpToggle">
    <label v-for="optionName, optionValue in options" class="btn btn-outline-dark" :class="{active: value == optionValue}">
      <input type="radio" :name="name" :value="optionValue" :checked="value == optionValue" @change="$emit('input', $event.target.value)"> {{ optionName }}
    </label>
  </div>`
})

var setup = new Vue({
    el: '.setupPage',
    data: {
        quickStep: 1,
        setup: {
            points_program: {
                enabled: true,
                lPoints: 'fixed',
                priceValue: 10,
                percentageValue: 10,
                rewardPoint: 10
            },
            signup_bonus: {
                enabled: true,
                welcome_points: 100
            },
            payby_points: {
                enabled: true,
                rewardPoint: 100
            },
            referral_program: {
                enabled: true,
                rpType: 'fixed',
                rpCouponType: 'fixed',
            },
            facebook_share: {
                enabled: true
            },
            twitter_share: {
                enabled: true
            },
            birthday_rewards: {
                enabled: true
            },
            woo_rewards: {
                enabled: true
            },
            news_letter: {
                enabled: true
            },
            limit_referral_rewards: true,
            reward_as_coupon: true,
            themes: {
                active_popup: 'mobile',
                active_widget: 'mobile'
            }
        }

    }
})
