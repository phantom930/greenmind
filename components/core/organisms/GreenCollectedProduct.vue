<template>
  <SfCollectedProduct
    :key="cartGetters.getItemSku(orderLine)"
    data-cy="collected-product-cart-sidebar"
    :image="$image(cartGetters.getItemImage(orderLine), 140, 200, cartGetters.getItemName(orderLine))"
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
    @click:remove="handleRemoveItemAndAccessories(orderLine)"
  >
    <template #title>
      <span class="custom-product-title"> {{ cartGetters.getItemTitle(orderLine) }} </span>
      <span class="custom-subtitle"> {{ cartGetters.getItemWebsiteTitle(orderLine) }} </span>
      <span class="custom-stand"> Stand: Meget flat </span>
    </template>
    <template #configuration>
      <div />
    </template>

    <template #price>
      <span class="green-collected-product__price">
        {{ $n(getPrice(orderLine), 'currency') }}
      </span>

      <div class="mt-3">
        <span class="green-collected-product__checkbox-title mb-1">
          {{ $t('Acquisition') }}
        </span>

        <GreenCheckbox
          v-for="acessoryProduct in accessoryProducts"
          :key="acessoryProduct.id"
          :disabled="loading"
          :title="acessoryProduct.name"
          :price="$n(acessoryProduct.price, 'currency')"
          :is-checked="accessoryIsInCart(acessoryProduct.id)"
          @change="handleAddOrRemoveAccessory(orderLine.product.id, acessoryProduct.id)"
        />
      </div>
    </template>
  </SfCollectedProduct>
</template>

<script lang="ts">
import { SfCollectedProduct } from '@storefront-ui/vue';
import { cartGetters, useCollectedProduct } from '~/composables';
import { defineComponent, computed, PropType } from '@nuxtjs/composition-api';
import { GreenOrderLine } from '~/green-api/types';

export default defineComponent({
  components: {
    SfCollectedProduct
  },
  props: {
    orderLine: {
      type: Object as PropType<GreenOrderLine>,
      default: () => ({})
    }
  },
  setup(props) {
    const {
      handleRemoveItemAndAccessories,
      handleAddOrRemoveAccessory,
      handleUpdateItem,
      accessoryIsInCart,
      getPrice,
      loading
    } = useCollectedProduct();

    const accessoryProducts = computed(() => props.orderLine?.product?.accessoryProducts);

    return {
      loading,
      accessoryIsInCart,
      handleAddOrRemoveAccessory,
      accessoryProducts,
      cartGetters,
      getPrice,
      handleRemoveItemAndAccessories,
      handleUpdateItem
    };
  }
});
</script>

<style scoped>
@import '~/assets/css/collectedPoduct.scss';
</style>
