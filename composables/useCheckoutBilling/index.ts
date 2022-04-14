/* eslint-disable no-prototype-builtins */
import { ssrRef, ref, computed } from '@nuxtjs/composition-api';
import { useBilling, useUserBilling } from '@vue-storefront/odoo';

const useCheckoutBilling = (): any => {

  const { load: loadBilling, billing, save: saveBilling, loading } = useBilling();
  const { billing: userBilling, load: loadUserBilling, setDefaultAddress: setDefaultBillingAddress, loading: loadingUserBilling } = useUserBilling();

  const defaultBillingAddress = ref(false);
  const canAddNewBillingAddress = ref(false);
  const newCurrentBillingAddressId = ref(null);

  const hasSavedBillingAddress = computed(() => {
    return Boolean(billing.value);
  });

  const showBillingAdresses = computed(
    () => hasSavedBillingAddress.value && !canAddNewBillingAddress.value
  );

  const currentBillingAddressId = computed(() => billing.value?.id);

  const loadingBilling = computed(() => loading.value || loadingUserBilling.value);

  const handleAddNewBillingAddress = async (form) => {
    await saveBilling({
      params: {
        ...form,
        name: `${form.firstName} ${form.lastName}`,
        countryId: parseInt(form.country.id),
        type: 'Billing'
      },
      billingDetails: null,
      customQuery: { billingAddAddress: 'greenAddAddress' }
    });

    await loadBilling();
    await loadUserBilling();
    canAddNewBillingAddress.value = false;
  };

  const handleSetCurrentBillingAddress = (address) => {
    newCurrentBillingAddressId.value = address.id;
  };

  return {
    handleSetCurrentBillingAddress,
    defaultBillingAddress,
    canAddNewBillingAddress,
    hasSavedBillingAddress,
    showBillingAdresses,
    currentBillingAddressId,
    handleAddNewBillingAddress,
    setDefaultBillingAddress,
    loadBilling,
    loadUserBilling,
    loadingBilling,
    userBilling,
    newCurrentBillingAddressId
  };
};

export default useCheckoutBilling;
