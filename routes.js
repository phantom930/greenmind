const path = require('path');
const fsExtra = require('fs-extra');
import i18nRoutes from './i18nRoutes';

export function getRoutes(localeIndex, themeDir = __dirname) {
  const productPrefixes = fsExtra.readJsonSync('./customRoutes/products.json');
  const productRoutes = productPrefixes.map(item => ({
    name: item.name,
    path: item.path,
    component: path.resolve(themeDir, 'pages/Product.vue')
  }));

  let categoriesPrefixes = fsExtra.readJsonSync('./customRoutes/categories.json');
  categoriesPrefixes = categoriesPrefixes.filter(item => item !== '/category');
  const categoryRoutes = categoriesPrefixes.map(item => ({
    name: item,
    path: item,
    component: path.resolve(themeDir, 'pages/Category.vue')
  }));

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
    ...productRoutes,
    ...categoryRoutes,
    // {
    //   name: 'product',
    //   path: '/product/:slug_2+',
    //   component: path.resolve(themeDir, 'pages/Product.vue'),
    //   alias: productPrefixes.map(alias => `${alias}/:slug_2+`)
    // },
    // {
    //   name: 'category',
    //   path: '/category',
    //   component: path.resolve(themeDir, 'pages/Category.vue'),
    //   alias: categoriesPrefixes.map(alias => `${alias}`)
    // },

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
    {
      name: 'paymentResponse',
      path: `/checkout${i18nRoutes.paymentResponse[localeIndex]}`,
      component: path.resolve(themeDir, 'pages/Checkout/PaymentResponse.vue')
    },

    /* Static Pages */
    {

      name: 'environment',
      path: `${i18nRoutes.environment[localeIndex]}`,
      component: path.resolve(themeDir, 'pages/Environment.vue')
    },
    {
      name: 'winter-holiday-advice',
      path: `${i18nRoutes.winter[localeIndex]}`,
      component: path.resolve(themeDir, 'pages/Blog/BlogPost1.vue')
    },
    {
      name: 'how-to-choose-the-right-ipad',
      path: `${i18nRoutes.howToChooseRightIpad[localeIndex]}`,
      component: path.resolve(themeDir, 'pages/Blog/BlogPost2.vue')
    },
    {
      name: 'price-guarantee',
      path: `${i18nRoutes.price[localeIndex]}`,
      component: path.resolve(themeDir, 'pages/PriceGuarantee.vue')
    },
    {
      name: 'readyAndroidDelivery',
      path: `${i18nRoutes.readyAndroidDelivery[localeIndex]}`,
      component: path.resolve(themeDir, 'pages/ReadyAndroidForDelivery.vue')
    },
    {
      name: 'disableFindMinIphone',
      path: `${i18nRoutes.disableFindMinIphone[localeIndex]}`,
      component: path.resolve(themeDir, 'pages/DisableFindMinIphone.vue')
    },
    {
      name: 'sendDeviceRepair',
      path: `${i18nRoutes.sendDeviceRepair[localeIndex]}`,
      component: path.resolve(themeDir, 'pages/SendDinEnhedTilReparation.vue')
    },
    {
      name: 'about-us',
      path: `${i18nRoutes.aboutUs[localeIndex]}`,
      component: path.resolve(themeDir, 'pages/AboutUs.vue')
    },
    {
      name: 'stand-descriptions',
      path: `${i18nRoutes.standDescriptions[localeIndex]}`,
      component: path.resolve(themeDir, 'pages/StandDescriptions.vue')
    },
    {
      name: 'reparation',
      path: `${i18nRoutes.reparation[localeIndex]}`,
      component: path.resolve(themeDir, 'pages/Reparation/Reparation.vue')
    },
    {
      name: 'iphone-reparation',
      path: `${i18nRoutes.iphoneReparation[localeIndex]}`,
      component: path.resolve(themeDir, 'pages/Reparation/IphoneReparation.vue')
    },
    {
      name: 'android-reparation',
      path: `${i18nRoutes.androidReparation[localeIndex]}`,
      component: path.resolve(themeDir, 'pages/Reparation/AndroidReparation.vue')
    },
    {
      name: 'tablet-reparation',
      path: `${i18nRoutes.tabletReparation[localeIndex]}`,
      component: path.resolve(themeDir, 'pages/Reparation/TabletReparation.vue')
    },
    {
      name: 'computer-reparation',
      path: `${i18nRoutes.computerReparation[localeIndex]}`,
      component: path.resolve(themeDir, 'pages/Reparation/ComputerReparation.vue')
    },
    {
      name: 'what-is-circular-economy-for-mobilephones',
      path: `${i18nRoutes.circular[localeIndex]}`,
      component: path.resolve(themeDir, 'pages/WhatIsCircularEconomy.vue')
    },
    {
      name: 'why-greenmind',
      path: `${i18nRoutes.why[localeIndex]}`,
      component: path.resolve(themeDir, 'pages/WhyGreenmind.vue')
    },
    {
      name: 'how-to-sell',
      path: `${i18nRoutes.howToSell[localeIndex]}`,
      component: path.resolve(themeDir, 'pages/HowToSell.vue')
    },
    {
      name: 'how-to-buy',
      path: `${i18nRoutes.howToBuy[localeIndex]}`,
      component: path.resolve(themeDir, 'pages/HowToBuy.vue')
    },
    {
      name: 'customer-service',
      path: `${i18nRoutes.customerService[localeIndex]}`,
      component: path.resolve(themeDir, 'pages/CustomerService.vue')
    },
    {
      name: 'freight-return',
      path: `${i18nRoutes.freight[localeIndex]}`,
      component: path.resolve(themeDir, 'pages/ShippingReturns.vue')
    },
    {
      name: 'terms-of-trade',
      path: `${i18nRoutes.termsOfTrade[localeIndex]}`,
      component: path.resolve(themeDir, 'pages/Terms.vue')
    },
    {
      name: 'faq',
      path: `${i18nRoutes.faq[localeIndex]}`,
      component: path.resolve(themeDir, 'pages/Faq.vue')
    },
    {
      name: 'shops',
      path: `${i18nRoutes.shops[localeIndex]}`,
      component: path.resolve(themeDir, 'pages/Shops.vue')
    },
    {
      name: 'gdpr',
      path: `${i18nRoutes.gdpr[localeIndex]}`,
      component: path.resolve(themeDir, 'pages/GDPR.vue')
    },
    {
      name: 'cookies',
      path: `${i18nRoutes.cookies[localeIndex]}`,
      component: path.resolve(themeDir, 'pages/Cookies.vue')
    },
    {
      name: 'recruitment',
      path: `${i18nRoutes.recruitment[localeIndex]}`,
      component: path.resolve(themeDir, 'pages/Recruitment.vue')
    }
  ];
}
