import { Context, sharedRef, useVSFContext } from '@vue-storefront/core';
import type { Ref } from '@vue/composition-api';
import { ref } from '@vue/composition-api';
import { Partner } from '@vue-storefront/odoo-api';
import { CreateUpdatePartnerInput } from '~/green-api/types';

const usePartner = () => {
  const context: Context = useVSFContext();

  const isLoading = ref(false);

  const error = ref(null);

  const partner: Ref<Partner> = sharedRef(null, 'partner');

  const createUpdatePartner = async (params: CreateUpdatePartnerInput) => {
    isLoading.value = true;

    try {
      const { data } = await context.$odoo.api.createUpdatePartner(params);

      return data;
    } catch (err) {
      error.value = err.response?.data?.graphQLErrors?.[0]?.message;
    } finally {
      isLoading.value = false;
    }

  };

  return {
    isLoading,
    error,
    partner,
    createUpdatePartner
  };
};

export default usePartner;
