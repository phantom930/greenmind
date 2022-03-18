<template>
  <SfCollectedProduct
    :key="cartGetters.getItemSku(orderLine)"
    data-cy="collected-product-cart-sidebar"
    :image="$image(cartGetters.getItemImage(orderLine))"
    :title="cartGetters.getItemName(orderLine)"
    :regular-price="$n(cartGetters.getItemPrice(orderLine).regular)"
    :image-width="140"
    :image-height="200"
    :special-price="
      cartGetters.getItemPrice(orderLine).special &&
        $n(cartGetters.getItemPrice(orderLine).special, 'currency')
    "
    :stock="99999"
    :qty="cartGetters.getItemQty(orderLine)"
    class="collected-product"
    @input="handleUpdateItem(orderLine, $event)"
    @click:remove="handleRemoveItem(orderLine.id)"
  >
    <template #title>
      <span class="custom-product-title"> {{ cartGetters.getCartItemTitle(orderLine) }} </span>
      <span class="custom-subtitle"> {{ cartGetters.getCartItemWebsiteTitle(orderLine.product) }} </span>
      <span class="custom-stand"> Stand: Meget flat </span>
    </template>
    <template #configuration>
      <div />
    </template>

    <template #price>
      <span class="green-collected-product__price">
        {{ $n(cartGetters.getItemPrice(orderLine).regular) }}
      </span>

      <div class="mt-3">
        <span class="green-collected-product__checkbox-title mb-1">
          {{ $t('Acquisition') }}
        </span>
        <GreenCheckbox
          v-for="acessoryProduct in accessoryProducts"
          :key="acessoryProduct.id"
          :title="acessoryProduct.name"
          :price="acessoryProduct.price"
          :is-checked="accessoryIsInCart(acessoryProduct.id)"
          @change="handleAddOrRemoveAccessory"
        />
      </div>
    </template>
  </SfCollectedProduct>
</template>

<script >
import { SfCollectedProduct } from '@storefront-ui/vue';
import { useCart } from '@vue-storefront/odoo';
import { cartGetters } from '~/composables';
import { defineComponent, computed } from '@nuxtjs/composition-api';

export default defineComponent({
  components: {
    SfCollectedProduct
  },
  props: {
    orderLine: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const { removeItem, updateItemQty, addItem, cart, loading } = useCart();
    const items = computed(() => cartGetters.getItems(cart.value));

    const accessoryProducts = computed(() => props.orderLine?.product?.accessoryProducts);

    const handleAddItem = async (productId) => {
      if (loading.value) {
        return;
      }
      await addItem({
        product: { firstVariant: productId },
        quantity: 1,
        customQuery: { cartAddItem: 'greenCartAddItem'}

      });
    };

    const handleRemoveItem = async (orderLineId) => {
      if (loading.value) {
        return;
      }
      await removeItem({ product: { id: orderLineId }, customQuery: { cartRemoveItem: 'greenCartRemoveItem'} });
    };

    const accessoryIsInCart = (acessoryId) => {
      return items.value.some(item => item.product?.id === acessoryId);
    };

    const handleAddOrRemoveAccessory = async (productId) => {
      if (accessoryIsInCart(productId)) {
        const acessoryOrderLine = items.value.find(item => item.product?.id === productId);
        await handleRemoveItem(acessoryOrderLine.id);
        return;
      }

      handleAddItem(productId);
    };

    const handleUpdateItem = async (orderLine, quantity) => {
      if (loading.value) {
        return;
      }
      await updateItemQty({ product: orderLine, quantity, customQuery: { cartUpdateItemQty: 'greenCartUpdateItemQty'} });
    };

    return {
      handleAddOrRemoveAccessory,
      accessoryIsInCart,
      handleAddItem,
      accessoryProducts,
      cartGetters,
      handleRemoveItem,
      handleUpdateItem
    };
  }
});
</script>

<style scoped>
@import '~/assets/css/collectedPoduct.scss';
</style>
