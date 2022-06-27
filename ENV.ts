const isDev = process.env.NODE_ENV !== 'production';

const removeLastBar = (url) => url[url.length - 1] === '/' ? url.slice(0, -1) : url;

const throwError = (name) => {
  throw new Error(`Env ${name} must be set!`);
};

/** Default values for DEV */
let clerkioKey = 'CEhYajX1WwY3uAClBKte5UC6qAC6d7W1';
let cookieBotKey = 'd2da6edf-44b1-4063-a6ef-fe4f37edeb0c';
let gtagKey = 'G-YYZ9TG2MS2';
let gtmKey = 'GTM-K9V7Q37';
let klaviyoKey = 'NzYWAu';
let nodeLocale = 'en-EN';
let baseURL = 'https://web-dev.greenmind.space/';
let siteUrl = 'http://localhost:3000';
let odooBaseUrl = 'https://web-dev.greenmind.space/';
let rebuildRefreshToken = '0ead60c3-d118-40be-9519-d531462ddc60';
let baseDomain = 'vue-dev.greenmind.space';
let sitemapCacheTime = 6000;

/** ENV Vars for production */
if (!isDev) {
  clerkioKey = process.env.CLERK_PUBLIC_KEY || throwError('CLERK_PUBLIC_KEY');
  cookieBotKey = process.env.COOKIEBOT_KEY || throwError('COOKIEBOT_KEY');
  gtagKey = process.env.GTAG_KEY || throwError('GTAG_KEY');
  gtmKey = process.env.GTM_KEY || throwError('GTM_KEY');
  klaviyoKey = process.env.KLAVIYO_KEY || throwError('KLAVIYO_KEY');
  nodeLocale = process.env.NODE_LOCALE || throwError('NODE_LOCALE');
  // baseURL for images | differente when using CDN
  baseURL = process.env.PUBLIC_PATH || process.env.BASE_URL || throwError('PUBLIC_PATH or BASE_URL');
  siteUrl = removeLastBar(process.env.SITE_URL || throwError('SITE_URL'));
  rebuildRefreshToken = process.env.INVALIDATION_KEY || throwError('INVALIDATION_KEY');
  sitemapCacheTime = Number(process.env.SITEMAP_CACHE) || throwError('SITEMAP_CACHE');
  odooBaseUrl = process.env.BACKEND_BASE_URL || throwError('BACKEND_BASE_URL');
  baseDomain = process.env.BASE_DOMAIN || throwError('BASE_DOMAIN');
}

export {
  clerkioKey,
  cookieBotKey,
  gtagKey,
  gtmKey,
  klaviyoKey,
  nodeLocale,
  baseURL,
  siteUrl,
  rebuildRefreshToken,
  sitemapCacheTime,
  odooBaseUrl,
  baseDomain
};

