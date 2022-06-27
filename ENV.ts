const consola = require('consola');
const chalk = require('chalk');

const isDev = process.env.NODE_ENV !== 'production';

const removeLastBar = (url) => url[url.length - 1] === '/' ? url.slice(0, -1) : url;

const notDefinedEnvs = [];

const pushToNotDefined = (name) => {
  notDefinedEnvs.push(name);
  return '';
};

/** Default values for DEV */
let clerkioKey = 'CEhYajX1WwY3uAClBKte5UC6qAC6d7W1';
let cookieBotKey = 'd2da6edf-44b1-4063-a6ef-fe4f37edeb0c';
let gtagKey = 'G-YYZ9TG2MS2';
let gtmKey = 'GTM-K9V7Q37';
let klaviyoKey = 'NzYWAu';
let nodeLocale = 'en-EN';
let baseURL = 'https://rune.greenmind.systems/';
let siteUrl = 'http://localhost:3000';
let odooBaseUrl = 'https://rune.greenmind.systems/';
let rebuildRefreshToken = '0ead60c3-d118-40be-9519-d531462ddc60';
let baseDomain = 'vue-dev.greenmind.space';
let sitemapCacheTime = 6000;

/** ENV Vars for production */
if (!isDev) {
  clerkioKey = process.env.CLERK_PUBLIC_KEY || pushToNotDefined('CLERK_PUBLIC_KEY');
  cookieBotKey = process.env.COOKIEBOT_KEY || pushToNotDefined('COOKIEBOT_KEY');
  gtagKey = process.env.GTAG_KEY || pushToNotDefined('GTAG_KEY');
  gtmKey = process.env.GTM_KEY || pushToNotDefined('GTM_KEY');
  klaviyoKey = process.env.KLAVIYO_KEY || pushToNotDefined('KLAVIYO_KEY');
  nodeLocale = process.env.NODE_LOCALE || pushToNotDefined('NODE_LOCALE');
  baseURL = process.env.PUBLIC_PATH || process.env.BASE_URL || pushToNotDefined('PUBLIC_PATH or BASE_URL');
  siteUrl = removeLastBar(process.env.SITE_URL || pushToNotDefined('SITE_URL'));
  rebuildRefreshToken = process.env.INVALIDATION_KEY || pushToNotDefined('INVALIDATION_KEY');
  sitemapCacheTime = Number(process.env.SITEMAP_CACHE || pushToNotDefined('SITEMAP_CACHE'));
  odooBaseUrl = process.env.BACKEND_BASE_URL || pushToNotDefined('BACKEND_BASE_URL');
  baseDomain = process.env.BASE_DOMAIN || pushToNotDefined('BASE_DOMAIN');
}

if (notDefinedEnvs.length > 0) {
  throw new Error(
    `${chalk.red('Some env vars are not found!')}
     ${chalk.greenBright('› ' + notDefinedEnvs.join(' \n › '))}
     `
  );
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

