const path = require('path');

export function getRoutes(themeDir = __dirname) {
  return [
    {
      name: 'home',
      path: '/',
      component: path.resolve(themeDir, 'pages/Home.vue')
    },
    {
      name: 'product',
      path: '/p/:id/:slug?',
      component: path.resolve(themeDir, 'pages/Product.vue')
    },
    {
      name: 'cart',
      path: '/cart',
      component: path.resolve(themeDir, 'pages/Cart/DetailedCart.vue')
    },
    {
      name: 'category',
      path: '/c/:slug_1/:slug_2?/:slug_3?/:slug_4?/:slug_5?',
      component: path.resolve(themeDir, 'pages/Category.vue')
    },
    {
      name: 'checkout',
      path: '/checkout',
      component: path.resolve(themeDir, 'pages/Checkout.vue'),
      children: [
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
          path: 'payment',
          name: 'payment',
          component: path.resolve(themeDir, 'pages/Checkout/Payment.vue')
        },
        {
          path: 'thank-you',
          name: 'thank-you',
          component: path.resolve(themeDir, 'pages/Checkout/ThankYou.vue')
        }
      ]
    },
    {
      name: 'reparation',
      path: '/reparation',
      component: path.resolve(themeDir, 'pages/Reparation/Reparation.vue')
    },
    {
      path: '/reparation/iphone-reparation',
      name: 'iphone-reparation',
      component: path.resolve(themeDir, 'pages/Reparation/IphoneReparation.vue')
    },
    {
      path: '/reparation/android-reparation',
      name: 'android-reparation',
      component: path.resolve(themeDir, 'pages/Reparation/AndroidReparation.vue')
    },
    {
      path: '/reparation/computer-reparation',
      name: 'computer-reparation',
      component: path.resolve(themeDir, 'pages/Reparation/ComputerReparation.vue')
    },
    {
      path: '/reparation/tablet-reparation',
      name: 'tablet-reparation',
      component: path.resolve(themeDir, 'pages/Reparation/TabletReparation.vue')
    },
    {
      path: '/about-us',
      name: 'about-us',
      component: path.resolve(themeDir, 'pages/AboutUs.vue')
    },
    {
      path: '/blog/winter-holiday-advice',
      name: 'winter-holiday-advice',
      component: path.resolve(themeDir, 'pages/Blog/BlogPost1.vue')
    },
    {
      path: '/blog/how-to-choose-the-right-ipad',
      name: 'how-to-choose-the-right-ipad',
      component: path.resolve(themeDir, 'pages/Blog/BlogPost2.vue')
    }
  ];
}
