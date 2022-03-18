import webpack from 'webpack';
import theme from './themeConfig';
import { getRoutes } from './routes';

const isDev = process.env.NODE_ENV !== 'production';

const localesMap = {
  'en-EN': 'en',
  'de-DE': 'de',
  'da-DA': 'da',
  'sv-SV': 'sv'
};

const localeIndex = localesMap[process.env.NODE_LOCALE] || 'en';

export default {
  css: ['@/assets/styles.scss'],
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
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: 'crossorigin'
      },
      {
        rel: 'preload',
        href:
          'https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;400;600;700&family=Raleway:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap',
        as: 'style'
      },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;400;600;700&family=Raleway:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap',
        media: 'print',
        onload: 'this.media=\'all\''
      }
    ]
  },
  router: {
    extendRoutes(routes) {
      getRoutes(`${__dirname}`)
        .forEach((route) => routes.unshift(route));
    },
    middleware: ['checkout']
  },
  pwa: {
    manifest: {
      name: 'VSF Odoo ',
      lang: 'en',
      useWebmanifestExtension: false
    }
  },
  loading: { color: '#fff' },
  plugins: ['~/plugins/getImage.ts'],
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
    '@vueuse/nuxt',
    '@nuxtjs/style-resources',
    [
      '@vue-storefront/nuxt',
      {
        performance: {
          httpPush: true,
          purgeCSS: {
            enabled: false,
            paths: [
              '**/*.vue'
            ]
          }
        },
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
    ['@vue-storefront/odoo/nuxt', {}]
  ],
  publicRuntimeConfig: {
    baseURL: process.env.PUBLIC_PATH || process.env.BASE_URL || 'https://web-dev.greenmind.space/',
    theme
  },
  modules: [
    '@nuxtjs/pwa',
    'nuxt-precompress',
    '@vue-storefront/middleware/nuxt',
    'nuxt-i18n',
    'cookie-universal-nuxt',
    'vue-scrollto/nuxt',
    [
      '~/helpers/cache/nuxt',
      {
        invalidation: {
          endpoint: '/cache-invalidate',
          key: '0ead60c3-d118-40be-9519-d531462ddc60',
          handlers: ['./helpers/cache/defaultHandler']
        },
        driver: [
          './helpers/cache.js',
          {
            isDev,
            redis: {
              host: process.env.REDIS_HOST,
              port: process.env.REDIS_PORT,
              password: process.env.REDIS_PASSWORD,
              defaultTimeout: 86400
            }
          }
        ]
      }
    ]
  ],
  extractCSS: true,
  nuxtPrecompress: {
    enabled: true,
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
    currency: 'USD',
    country: 'US',
    countries: [
      { name: 'US', label: 'United States' },
      { name: 'DE', label: 'Germany' }
    ],
    currencies: [
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
        iso: 'sv-SE'
      },
      {
        code: 'en',
        label: 'English',
        file: 'en.json',
        iso: 'en-EN'
      }
    ],
    fallbackLocale: localeIndex,
    defaultLocale: localeIndex,
    lazy: true,
    seo: true,
    langDir: 'lang',

    detectBrowserLanguage: {
      cookieKey: 'vsf-locale'
    }
  },
  styleResources: {
    scss: [
      require.resolve('@storefront-ui/shared/styles/_helpers.scss', {
        paths: [process.cwd()]
      })
    ]
  },
  build: {
    babel: {
      plugins: [
        ['@babel/plugin-proposal-private-property-in-object', { loose: true }]
      ]
    },
    postcss: {
      plugins: {
        'postcss-custom-properties': false
      }
    },
    transpile: ['vee-validate/dist/rules'],
    extend(config, ctx) {
      if (ctx.isDev) {
        config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map';
      }
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.VERSION': JSON.stringify({
          // eslint-disable-next-line global-require
          version: require('./package.json').version,
          lastCommit: process.env.LAST_COMMIT || ''
        })
      })
    ]
  }
};
