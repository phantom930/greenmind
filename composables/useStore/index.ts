import { useVSFContext, sharedRef } from '@vue-storefront/core';
import { Context } from '@vue-storefront/core';
import { ref, computed } from '@nuxtjs/composition-api';
import { GetStockInput } from '~/green-api/types';

const useStore = (): any => {
  const context: Context = useVSFContext();
  const stockList = sharedRef(null, 'useStore-stockList');
  const loading = ref(false);
  const error = ref({
    getStock: null
  });

  const getStock = async (params: GetStockInput): Promise<any> => {
    loading.value = true;

    try {
      const { data } = await context.$odoo.api.getStock(params);
      stockList.value = data?.stores?.stores || [];
    } catch (err) {
      error.value.getStock = err.response?.data?.graphQLErrors?.[0];
    } finally {
      loading.value = false;
    }
  };

  return {
    loading: computed(() => loading.value),
    error: computed(() => error.value),
    stockList: computed(() => stockList.value),
    getStock
  };
};

export default useStore;
