
import { useCart, useMultipleProduct } from '@vue-storefront/odoo';
import { cartGetters } from '~/composables';
import { computed } from '@nuxtjs/composition-api';
import { GreenCart, GreenOrderLine } from '~/green-api/types';

const useCollectedProduct = (): any => {
  const { removeItem, updateItemQty, cart, loading } = useCart();
  const { addMultipleProductsToCart, removeMultipleProductsFromCart, loading: multipleLoading } = useMultipleProduct();

  const accessoryIsInCart = (accessoryId) => cartGetters.accessoryIsInCart(cart.value, accessoryId);

  const anyLoading = computed(() => loading.value || multipleLoading.value);

  const getPrice = (orderLine) => cartGetters.getPrice(cart.value, orderLine);

  const handleRemoveItemAndAccessories = async (orderLine: GreenOrderLine) => {
    const greenCart = cart.value as GreenCart;

    if (anyLoading.value) {
      return;
    }

    const accessoriesInCartFromThisProduct = greenCart.order?.accessoryLines
      .filter(acessoryLine => orderLine?.product?.accessoryProducts.some(acessory => acessory.id !== acessoryLine.product.id))
      .map(acessoryLine => acessoryLine.id);

    await removeMultipleProductsFromCart({ lineIds: [orderLine.id, ...accessoriesInCartFromThisProduct], customQuery: { cartRemoveMultipleItems: 'greenCartRemoveMultipleItem'} });
  };

  const handleUpdateItem = async (orderLine, quantity) => {
    if (anyLoading.value) {
      return;
    }
    await updateItemQty({ product: orderLine, quantity, customQuery: { cartUpdateItemQty: 'greenCartUpdateItemQty'} });
  };

  const handleAddOrRemoveAccessory = async (productId: number, accessoryId: number) => {
    const greenCart = cart.value as GreenCart;

    if (anyLoading.value) {
      return;
    }

    if (cartGetters.accessoryIsInCart(greenCart, accessoryId)) {
      const acessoryOrderLine = greenCart.order?.orderLines.find(orderLine => orderLine.product?.id === accessoryId);

      await removeItem({ product: { id: acessoryOrderLine.id }, customQuery: { cartRemoveItem: 'greenCartRemoveItem'} });
      return;
    }

    const accessoriesAlreadyInCart = greenCart.order?.accessoryLines
      .filter(acessoryLine => accessoryIsInCart(acessoryLine.product.id))
      .map(acessoryLine => acessoryLine.product.id);

    const params = {
      products: [{
        id: productId,
        quantity: 0,
        accessoryToIds: [accessoryId, ...accessoriesAlreadyInCart]
      }],
      customQuery: { cartAddMultipleItems: 'greenCartAddMultipleItem'}
    };

    addMultipleProductsToCart(params);
  };

  return {
    loading: anyLoading,
    handleRemoveItemAndAccessories,
    handleAddOrRemoveAccessory,
    handleUpdateItem,
    accessoryIsInCart,
    getPrice
  };
};

export default useCollectedProduct;
