/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import webpack from 'webpack';
import theme from './themeConfig';
import { getRoutes } from './routes';
import { resolve } from 'path';
import hooks from './hooks';
import getAppRoutes from './sitemap';
import redirect from './customRoutes/redirects.json';
import Config from '@odoogap/nuxt-config';

import {
  cookieBotKey,
  gtagKey,
  gtmKey,
  klaviyoKey,
  nodeLocale,
  baseURL,
  siteUrl,
  rebuildRefreshToken,
  sitemapCacheTime
} from './ENV';

const { makeBuild, makeModules } = Config();
const isDev = process.env.NODE_ENV !== 'production';

const localesMap = {
  'en-EN': 'en',
  'de-DE': 'de',
  'da-DK': 'da',
  'sv-SV': 'sv'
};

const localeIndex = localesMap[nodeLocale];

export default {
  // hooks,
  dir: {
    // using to ignore auto-generated routes
    pages: 'routes'
  },
  alias: {
    'green-api': resolve(__dirname, './green-api')
  },
  components: [
    '~/components/',
    '~/components/blocks',
    '~/components/core/atoms',
    '~/components/core/organisms',
    '~/components/core/molecules'
  ],
  head: {
    title: 'GreenMind',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      },
      {
        hid: 'Facebook-domain-verification',
        name: 'facebook-domain-verification',
        content: 'ef18vp0ug7n4ctpw1qkopdjz8a90qy'
      },
      {
        hid: 'Google-site-verification',
        name: 'google-site-verification',
        content: 'AIYIV7nc1Lm3ntUPUE02Z-4a6VTJAc3udymwuqcXSPY'
      }
    ],
    script: [
      {
        id: 'Cookiebot',
        hid: 'Cookiebot',
        type: 'text/javascript',
        'data-cbid': cookieBotKey,
        src: 'https://consent.cookiebot.com/uc.js',
        async: true
      },
      {
        id: 'gTag',
        hid: 'gTag',
        type: 'text/javascript',
        src: `https://www.googletagmanager.com/gtag/js?id=${gtagKey}"`,
        async: true
      },
      {
        id: 'Klaviyo',
        hid: 'Klaviyo',
        type: 'text/javascript',
        src: `https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=${klaviyoKey}`,
        async: true
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      }
    ]
  },
  router: {
    extendRoutes(routes) {
      getRoutes(localeIndex, `${__dirname}`)
        .forEach((route) => routes.unshift(route));
    },
    middleware: ['checkout', 'redirects']
  },

  pwa: {
    meta: {
      name: 'Greenmind',
      theme_color: '#32463D',
      description: 'Greenmind Description',
      lang: localeIndex
    },
    icon: {
      source: '/logo.png',
      fileName: 'logo.png'
    },
    manifest: {
      name: 'Greenmind',
      theme_color: '#32463D',
      short_name: 'Greenmind',
      description: 'Greenmind Description',
      lang: localeIndex,
      background_color: '#fff'
    }
  },
  googleFonts: {
    families: {
      'Josefin+Sans': {
        wght: [300, 400, 500, 600, 700]
      },
      Lato: [100, 300]
    },
    display: 'swap'
  },
  loading: { color: '#fff' },
  plugins: [
    '~/plugins/getImage.ts',
    '~/plugins/vee-validate.ts',
    '~/plugins/dkkCustomCurrency.ts',
    '~/plugins/clerkIo.client.ts',
    '~/plugins/googleTag.client.js'
  ],
  device: {
    refreshOnResize: true
  },
  buildModules: [
    '@nuxtjs/composition-api/module',
    '@nuxtjs/pwa',
    '@nuxt/image',
    '@nuxtjs/device',
    '@nuxtjs/web-vitals',
    '@nuxtjs/tailwindcss',
    '@nuxt/typescript-build',
    ['@nuxtjs/google-fonts'],
    '@nuxtjs/style-resources',
    [
      '@vue-storefront/nuxt',
      {
        performance: {
          httpPush: true
        },
        i18nExtension: false,
        // @core-development-only-start
        // @core-development-only-end
        useRawSource: {
          dev: ['@vue-storefront/odoo', '@vue-storefront/core', '@vue-storefront/storyblok'],
          prod: ['@vue-storefront/odoo', '@vue-storefront/core', '@vue-storefront/storyblok']
        }
      }
    ],
    // @core-development-only-start
    [
      '@vue-storefront/nuxt-theme',
      {
        routes: false
      }
    ],
    // @core-development-only-end
    /* project-only-start
    ['@vue-storefront/nuxt-theme'],
    project-only-end */
    ['@vue-storefront/odoo/nuxt', { }]
  ],
  publicRuntimeConfig: {
    baseURL,
    siteUrl,
    rebuildRefreshToken,
    cookieBotKey,
    gtagKey,
    localeIndex,
    theme
  },
  modules: makeModules([
    '@nuxtjs/sitemap',
    [
      '@vue-storefront/storyblok/nuxt',
      {
        jsBridge: 'https://app.storyblok.com/f/storyblok-v2-latest.js'
      }
    ],
    [
      'storyblok-nuxt',
      {
        accessToken: '0vS0uwQC7Ym1Wuf2siDT6gtt',
        cacheProvider: 'memory'
      }
    ],
    '@nuxtjs/i18n',
    '@nuxtjs/gtm',
    ['@nuxtjs/redirect-module', { statusCode: 301 }],
    ['nuxt-breakpoints', {
      breakpoints: {
        sm: 640,
        md: 768,
        lg: 1024,
        xl: 1280,
        '2xl': 1536
      }
    }]
  ]),
  redirect,
  gtm: {
    id: gtmKey,
    debug: false,
    enabled: !isDev,
    pageTracking: true
  },
  nuxtPrecompress: {
    enabled: !isDev,
    report: false,
    test: /\.(js|css|html|txt|xml|svg)$/,
    // Serving options
    middleware: {
      // You can disable middleware if you serve static files using nginx...
      enabled: true,
      // Enable if you have .gz or .br files in /static/ folder
      enabledStatic: true,
      // Priority of content-encodings, first matched with request Accept-Encoding will me served
      encodingsPriority: ['br', 'gzip']
    },

    // build time compression settings
    gzip: {
      // should compress to gzip?
      enabled: true,
      // compression config
      // https://www.npmjs.com/package/compression-webpack-plugin
      filename: '[path].gz[query]',
      threshold: 10240,
      minRatio: 0.8,
      compressionOptions: { level: 9 }
    },
    brotli: {
      // should compress to brotli?
      enabled: true,
      // compression config
      // https://www.npmjs.com/package/compression-webpack-plugin
      filename: '[path].br[query]',
      compressionOptions: { level: 11 },
      threshold: 10240,
      minRatio: 0.8
    }
  },
  i18n: {
    baseUrl: siteUrl,
    strategy: 'no_prefix',
    countries: [
      { name: 'US', label: 'United States' },
      { name: 'DE', label: 'Germany' }
    ],
    currencies: [
      { name: 'DKK', label: 'Kroner' },
      { name: 'EUR', label: 'Euro' },
      { name: 'USD', label: 'Dollar' }
    ],
    locales: [
      {
        code: 'da',
        label: 'Danish',
        file: 'da.json',
        iso: 'da-DK'
      },
      {
        code: 'sv',
        label: 'Swedish',
        file: 'sv.json',
        iso: 'sv-SV'
      },
      {
        code: 'de',
        label: 'German',
        file: 'de.json',
        iso: 'de-DE'
      },
      {
        code: 'en',
        label: 'English',
        file: 'en.json',
        iso: 'en-US'
      }
    ],
    fallbackLocale: localeIndex,
    defaultLocale: localeIndex,
    seo: true,
    locale: localeIndex,
    langDir: 'lang',
    detectBrowserLanguage: false
  },
  sitemap: {
    exclude: ['/checkout/**', '/checkout', '/dashboard/**', '/dashboard'],
    hostname: siteUrl,
    i18n: false,
    cacheTime: sitemapCacheTime,
    gzip: true,
    defaults: {
      changefreq: 'daily',
      priority: 1,
      lastmod: new Date()
    },
    routes: getAppRoutes
  },

  styleResources: {
    scss: [require.resolve('@storefront-ui/shared/styles/_helpers.scss', { paths: [process.cwd()] })]
  },
  build: makeBuild({
    // watch: ['.nuxt/routes.json'],
    babel: {
      compact: true,
      plugins: [
        ['@babel/plugin-proposal-private-property-in-object', { loose: true }]
      ]
    },
    transpile: ['vee-validate/dist/rules', '/^@storefront-ui/'],
    plugins: [
      new webpack.DefinePlugin({
        'process.VERSION': JSON.stringify({
          // eslint-disable-next-line global-require
          version: require('./package.json').version,
          lastCommit: process.env.LAST_COMMIT || ''
        })
      })
    ]
  })
};
