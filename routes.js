const path = require('path');

export function getRoutes(themeDir = __dirname) {
  return [
    {
      name: 'home',
      path: '/',
      component: path.resolve(themeDir, 'pages/Home.vue')
    },
    {
      name: 'cart',
      path: '/cart',
      component: path.resolve(themeDir, 'pages/Cart/Cart.vue')
    },
    {
      name: 'category',
      path: '/category/:slug_1+',
      component: path.resolve(themeDir, 'pages/Category.vue'),
      alias: ['/iphones', '/smartphones', '/computers', '/consoles', '/acessories'].map(alias => `${alias}/:slug_1+`)
    },
    {
      name: 'product',
      path: '/product/:slug_2',
      component: path.resolve(themeDir, 'pages/Product.vue')
    },
    {
      name: 'checkout',
      path: '/checkout',
      component: path.resolve(themeDir, 'pages/Checkout.vue'),
      children: [
        {
          path: 'personaldetails',
          name: 'personaldetails',
          component: path.resolve(themeDir, 'pages/Checkout/Personaldetails.vue')
        },
        {
          path: 'shipping',
          name: 'shipping',
          component: path.resolve(themeDir, 'pages/Checkout/Shipping.vue')
        },
        {
          path: 'billing',
          name: 'billing',
          component: path.resolve(themeDir, 'pages/Checkout/Billing.vue')
        },
        {
          path: 'revieworder',
          name: 'revieworder',
          component: path.resolve(themeDir, 'pages/Checkout/Revieworder.vue')
        },
        {
          path: 'payment',
          name: 'payment',
          component: path.resolve(themeDir, 'pages/Checkout/Payment.vue')
        }
      ]
    },
    /* Static Pages */
    {
      /* Miljø */
      name: 'environment',
      path: '/environment',
      component: path.resolve(themeDir, 'pages/Environment.vue')
    },
    /* Blogs */
    {
      /* Sådan undgår du din mobil fryser på skiferien */
      path: '/blog/winter-holiday-advice',
      name: 'winter-holiday-advice',
      component: path.resolve(themeDir, 'pages/Blog/BlogPost1.vue')
    },
    {
      /* Sådan vælger du den rette iPad ud fra dine ønsker */
      path: '/blog/how-to-choose-the-right-ipad',
      name: 'how-to-choose-the-right-ipad',
      component: path.resolve(themeDir, 'pages/Blog/BlogPost2.vue')
    },
    {
      /* Prisgaranti */
      name: 'price-guarantee',
      path: '/price-guarantee',
      component: path.resolve(themeDir, 'pages/PriceGuarantee.vue')
    },
    {
      /* Om os */
      name: 'about-us',
      path: '/about-us',
      component: path.resolve(themeDir, 'pages/AboutUs.vue')
    },
    {
      /* Standbeskrivelser */
      name: 'stand-descriptions',
      path: '/stand-descriptions',
      component: path.resolve(themeDir, 'pages/StandDescriptions.vue')
    },
    {
      /* Reparation */
      name: 'reparation',
      path: '/reparation',
      component: path.resolve(themeDir, 'pages/Reparation/Reparation.vue')
    },
    {
      /* iPhone reparation */
      path: '/iphone-reparation',
      name: 'iphone-reparation',
      component: path.resolve(themeDir, 'pages/Reparation/IphoneReparation.vue')
    },
    {
      /* Android reparation */
      path: '/android-reparation',
      name: 'android-reparation',
      component: path.resolve(themeDir, 'pages/Reparation/AndroidReparation.vue')
    },
    {
      /* Tablet reparation */
      path: '/tablet-reparation',
      name: 'tablet-reparation',
      component: path.resolve(themeDir, 'pages/Reparation/TabletReparation.vue')
    },
    {
      /* Computer reparation */
      path: '/computer-reparation',
      name: 'computer-reparation',
      component: path.resolve(themeDir, 'pages/Reparation/ComputerReparation.vue')
    },
    {
      /* Hvad er cirkulær økonomi for mobiltelefoner */
      path: '/what-is-circular-economy-for-mobilephones',
      name: 'what-is-circular-economy-for-mobilephones',
      component: path.resolve(themeDir, 'pages/WhatIsCircularEconomy.vue')
    },
    {
      /* Hvorfor GreenMind? */
      path: '/why-greenmind',
      name: 'why-greenmind',
      component: path.resolve(themeDir, 'pages/WhyGreenmind.vue')
    },
    {
      /* Sådan sælger du */
      path: '/sell-to-us',
      name: 'how-to-sell',
      component: path.resolve(themeDir, 'pages/HowToSell.vue')
    },
    {
      /* Sådan køber du */
      path: '/how-to-buy',
      name: 'how-to-buy',
      component: path.resolve(themeDir, 'pages/HowToBuy.vue')
    },
    {
      /* Kundeservice */
      path: '/customer-service',
      name: 'customer-service',
      component: path.resolve(themeDir, 'pages/CustomerService.vue')
    },
    {
      /* Fragt og retur */
      path: '/freight-return',
      name: 'freight-return',
      component: path.resolve(themeDir, 'pages/ShippingReturns.vue')
    },
    {
      /* Handelsbetingelser */
      path: '/terms-of-trade',
      name: 'terms-of-trade',
      component: path.resolve(themeDir, 'pages/Terms.vue')
    },
    {
      /* FAQ */
      path: '/faq',
      name: 'faq',
      component: path.resolve(themeDir, 'pages/Faq.vue')
    },
    {
      /* Butikker */
      path: '/shops',
      name: 'shops',
      component: path.resolve(themeDir, 'pages/Shops.vue')
    }
  ];
}
