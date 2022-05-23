import { useVSFContext } from '@vue-storefront/core';
import { Context } from '@vue-storefront/core';
import { ssrRef } from '@nuxtjs/composition-api';

const usePayment = (newKey: string): any => {
  const context: Context = useVSFContext();
  const key = 'providerList' || newKey;
  const providerList = ssrRef([], key);

  const getPaymentProviderList = async () => {

    const { data } = await context.$odoo.api.getPaymentAcquirerList();

    providerList.value = data?.paymentAcquirers || [];

    return providerList.value;
  };

  return {
    getPaymentProviderList, providerList
  };
};

export default usePayment;
