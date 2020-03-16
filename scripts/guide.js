var guide = new Vue({
    el: '#guide',
    data: {
        head: {
            skip_button: "Skip Guide"
        },
        landing: {
            head: 'Welcome to Gratisfaction',
            button: 'view Quick setup guide',
            link: 'Skip guide and start setup',
            happy_customers: 'Happy Customers'
        },
        setup: {
            head: 'How to setup',
            desc: 'During onboarding we will take these <span>three quick and simple steps</span>',
            heading_1: 'Start with basic <br>settings',
            desc_1: 'You can pause or edit the <br>program at anytime. Even if the <br>program is live. You are in <br>control of your program',
            heading_2: 'Setup your <br>Loyalty Rewards',
            desc_2:'You can pause or edit the <br>program at anytime. Even if the <br>program is live. You are in <br>control of your program',
            heading_3: `Customize <br>plugin's UI`,
            desc_3: `Customize the plugin's UI, <br>placement of the plugins <br><br>You can change the theme <br>to align with your websites.`,
        },
        end: {
            head: 'You are ready! <br> Get started.',
            desc_1: 'You can pause and <br> edit any of these <br> features at any time',
            desc_2: 'More features are <br>available after the <br>initial setup'
        }
    }
})