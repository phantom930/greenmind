
import { useCart, useMultipleProduct } from '@vue-storefront/odoo';
import { cartGetters } from '~/composables';
import { GreenCart } from '~/green-api/types';

const useCollectedProduct = (): any => {
  const { removeItem, updateItemQty, cart, loading } = useCart();
  const { addMultipleProductsToCart } = useMultipleProduct();

  const handleRemoveItem = async (orderLineId) => {
    if (loading.value) {
      return;
    }
    await removeItem({ product: { id: orderLineId }, customQuery: { cartRemoveItem: 'greenCartRemoveItem'} });
  };

  const accessoryIsInCart = (accessoryId) => cartGetters.accessoryIsInCart(cart.value, accessoryId);

  const getPrice = (orderLine) => cartGetters.getPrice(cart.value, orderLine);

  const handleUpdateItem = async (orderLine, quantity) => {
    if (loading.value) {
      return;
    }
    await updateItemQty({ product: orderLine, quantity, customQuery: { cartUpdateItemQty: 'greenCartUpdateItemQty'} });
  };

  const handleAddOrRemoveAccessory = async (productId: number, accessoryId: number) => {
    const greenCart = cart.value as GreenCart;

    if (loading.value) {
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
    handleRemoveItem,
    handleAddOrRemoveAccessory,
    handleUpdateItem,
    accessoryIsInCart,
    getPrice
  };
};

export default useCollectedProduct;
