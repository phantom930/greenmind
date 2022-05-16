/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import webpack from 'webpack';
import theme from './themeConfig';
import { getRoutes } from './routes';
import { resolve } from 'path';
import hooks from './hooks';
import getAppRoutes from './sitemap';
import Config from '@odoogap/nuxt-config';

const { makeBuild, makeModules } = Config();
const isDev = process.env.NODE_ENV !== 'production';
const cookieBotKey = process.env.COOKIEBOT_KEY || 'd2da6edf-44b1-4063-a6ef-fe4f37edeb0c';

const localesMap = {
  'en-EN': 'en',
  'de-DE': 'de',
  'da-DK': 'da',
  'sv-SV': 'sv'
};

const localeIndex = localesMap[process.env.NODE_LOCALE] || 'en';

export default {
  hooks,
  dir: {
    // using to ignore auto-generated routes
    pages: 'routes'
  },
  alias: {
    'green-api': resolve(__dirname, './green-api')
  },
  components: [
    '~/components/',
    '~/components/core/atoms',
    '~/components/core/organisms',
    '~/components/core/molecules'
  ],
  head: {
    title: 'Vue Storefront',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    script: [
      { 'data-blockingmode': 'auto',
        id: 'CookieDeclaration',
        type: 'text/javascript',
        src: `https://consent.cookiebot.com/${cookieBotKey}/cd.js`
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
    middleware: ['checkout']
  },
  pwa: {
    manifest: {
      name: 'Greenmind',
      lang: localeIndex,
      useWebmanifestExtension: false
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
  plugins: ['~/plugins/getImage.ts', '~/plugins/vee-validate.ts', '~/plugins/dkkCustomCurrency.ts'],
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
          dev: ['@vue-storefront/odoo', '@vue-storefront/core'],
          prod: ['@vue-storefront/odoo', '@vue-storefront/core']
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
    baseURL: process.env.PUBLIC_PATH || process.env.BASE_URL || 'https://web-dev.greenmind.space/',
    cookieBotKey,
    localeIndex,
    theme
  },
  modules: makeModules(['@nuxtjs/sitemap', '@nuxtjs/i18n']),
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
    strategy: 'no_prefix',
    countries: [
      { name: 'US', label: 'United States' },
      { name: 'DE', label: 'Germany' }
    ],
    currencies: [
      { name: 'DKK', label: 'DenMark' },
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
    hostname: process.env.SITE_URL || 'https://vue-dev.greenmind.space/',
    i18n: false,
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
