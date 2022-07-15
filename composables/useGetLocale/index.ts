/* eslint-disable no-prototype-builtins */
import { ssrRef } from '@nuxtjs/composition-api';
import { Context } from '@vue-storefront/core';
import { useVSFContext } from '@vue-storefront/core';

const useGetLocale = (): any => {
  const context: Context = useVSFContext();

  const localesMap = {
    'en-EN': 'en',
    'de-DE': 'de',
    'da-DK': 'da',
    'sv-SV': 'sv'
  };

  const getLocale = () => {
    return localesMap[context.$config.localeIndex];
  };
  return {
    getLocale
  };
};

export default useGetLocale;
