
import { useCart, useMultipleProduct } from '@vue-storefront/odoo';
import { cartGetters } from '~/composables';
import { computed, Ref } from '@nuxtjs/composition-api';
import { GreenOrderLine } from '~/green-api/types';

const useCollectedProduct = (orderLine: Ref<GreenOrderLine>): any => {

  const { updateItemQty, cart, loading } = useCart();
  const { addMultipleProductsToCart, removeMultipleProductsFromCart, loading: multipleLoading } = useMultipleProduct();

  const orderLineHasAccessory = (accessoryProductId: number) => {
    return orderLine.value?.accessories?.map(item => item.product.id)?.includes(accessoryProductId) || false;
  };

  const anyLoading = computed(() => loading.value || multipleLoading.value);

  const getPrice = (orderLine: GreenOrderLine) => cartGetters.getPrice(cart.value, orderLine);

  const handleRemoveItemAndAccessories = async (orderLine: GreenOrderLine) => {
    if (anyLoading.value) {
      return;
    }

    await removeMultipleProductsFromCart({ lineIds: [orderLine.id], customQuery: { cartRemoveMultipleItems: 'greenCartRemoveMultipleItem'} });
  };

  const handleUpdateItem = async (orderLine: GreenOrderLine, quantity: number) => {
    if (anyLoading.value) {
      return;
    }
    await updateItemQty({ product: orderLine, quantity: Number(quantity), customQuery: { cartUpdateItemQty: 'greenCartUpdateItemQty'} });
  };

  const buildParamsToMultipleAdd = (accessoryToIds: Array<number>) => ({
    products: [{
      id: orderLine.value.product?.id,
      quantity: 1,
      accessoryToIds
    }],
    customQuery: { cartAddMultipleItems: 'greenCartAddMultipleItem'}
  });

  const handleRemoveAccessory = async (accessoryProductId: number) => {
    const accessoryToIds = orderLine.value?.accessories
      ?.filter(acessoryLine => acessoryLine.product.id !== accessoryProductId)
      .map(acessoryLine => acessoryLine.product.id);

    await addMultipleProductsToCart(buildParamsToMultipleAdd(accessoryToIds));

  };

  const handleAddAccessory = async (accessoryProductId: number) => {
    const accessoriesAlreadyInOrderLine = orderLine?.value.accessories?.map(accessory => accessory?.product?.id) || [];

    const accessoryToIds = [accessoryProductId, ...accessoriesAlreadyInOrderLine];

    await addMultipleProductsToCart(buildParamsToMultipleAdd(accessoryToIds));
  };

  const handleAddOrRemoveAccessory = async (accessoryProductId: number) => {
    if (anyLoading.value) {
      return;
    }

    if (orderLineHasAccessory(accessoryProductId)) {
      return handleRemoveAccessory(accessoryProductId);
    }

    return handleAddAccessory(accessoryProductId);

  };

  return {
    loading: anyLoading,
    handleRemoveItemAndAccessories,
    handleAddOrRemoveAccessory,
    handleUpdateItem,
    orderLineHasAccessory,
    getPrice
  };
};

export default useCollectedProduct;
