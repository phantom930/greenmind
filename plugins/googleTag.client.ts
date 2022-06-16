import { Plugin } from '@nuxt/types';

declare let window: any;

const googleTag: Plugin = (context) => {
  const key = context.app.$config.gtagKey;

  window.dataLayer = window.dataLayer || [];

  const gtag = () => {
    window.dataLayer.push(arguments);
  };
  gtag('js', new Date());

  gtag('config', key);
};

export default googleTag;
