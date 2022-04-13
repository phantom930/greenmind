/* eslint-disable no-prototype-builtins */
import { ssrRef, ref, computed } from '@nuxtjs/composition-api';
import { useShipping, useUserShipping } from '@vue-storefront/odoo';

const useCheckoutShipping = (): any => {

  const { load: loadShipping, shipping, save, loading } = useShipping();
  const {
    shipping: userShipping,
    load: loadUserShipping,
    setDefaultAddress: setDefaultShippingAddress,
    loading: loadingUserShipping
  } = useUserShipping();

  const defaultShippingAddress = ref(false);
  const canAddNewAddress = ref(false);
  const newCurrentShippingAddressId = ref(null);

  const hasSavedShippingAddress = computed(() => {
    return Boolean(shipping.value);
  });

  const currentAddressId = computed(() => shipping.value?.id);

  const showShippingAddresses = computed(
    () => hasSavedShippingAddress.value && !canAddNewAddress.value
  );

  const loadingShipping = computed(() => loading.value || loadingUserShipping.value);

  const handleAddNewAddress = async (form) => {
    await save({
      params: {
        ...form,
        name: `${form.firstName} ${form.lastName}`,
        countryId: parseInt(form.country.id),
        type: 'Shipping'
      },
      shippingDetails: null,
      customQuery: { shippingAddAdress: 'greenAddAddress' }
    });

    await loadShipping();
    await loadUserShipping();
    canAddNewAddress.value = false;
  };

  const handleSetCurrentShippingAddress = (address) => {
    newCurrentShippingAddressId.value = address.id;
  };
  return {
    newCurrentShippingAddressId,
    handleSetCurrentShippingAddress,
    defaultShippingAddress,
    canAddNewAddress,
    hasSavedShippingAddress,
    showShippingAddresses,
    currentAddressId,
    handleAddNewAddress,
    setDefaultShippingAddress,
    loadShipping,
    loadUserShipping,
    loadingShipping,
    userShipping
  };
};

export default useCheckoutShipping;
