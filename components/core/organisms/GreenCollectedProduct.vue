<template>
  <SfCollectedProduct
    :key="cartGetters.getItemSku(orderLine)"
    data-cy="collected-product-cart-sidebar"
    :image="$image(cartGetters.getItemImage(orderLine), 140, 236, cartGetters.getItemImageFilename(orderLine))"
    :title="cartGetters.getItemTitle(orderLine)"
    :regular-price="$currency(cartGetters.getItemPrice(orderLine).regular)"
    :image-width="140"
    :image-height="236"
    :special-price="
      cartGetters.getItemPrice(orderLine).special &&
        $currency(cartGetters.getItemPrice(orderLine).special)
    "
    :max-qty="quantityInStock"
    :qty="cartGetters.getItemQty(orderLine)"
    class="collected-product"
    @input="handleUpdateItem(orderLine, $event)"
    @click:remove="handleRemoveItemAndAccessories(orderLine)"
  >
    <template #title>
      <span class="custom-product-title"> {{ cartGetters.getItemTitle(orderLine) }} </span>
      <span class="custom-subtitle"> {{ cartGetters.getItemWebsiteTitle(orderLine) }} </span>
      <span class="custom-stand"> {{ cartGetters.getStandGradeName(orderLine) }} </span>
    </template>
    <template #configuration>
      <div />
    </template>
    <template #more-actions>
      <div />
    </template>

    <template #price>
      <span class="green-collected-product__price">
        {{ $currency(getPrice(orderLine)) }}
      </span>

      <div class="mt-3">
        <span v-if="accessoryProducts.length >0" class="green-collected-product__checkbox-title mb-1">
          {{ $t('Acquisition') }}
        </span>

        <GreenCheckbox
          v-for="acessoryProduct in accessoryProducts"
          :key="acessoryProduct.id"
          :value="acessoryProduct.id"
          :disabled="loading"
          :title="acessoryProduct.name"
          :price="$currency(acessoryProduct.price)"
          :is-checked="orderLineHasAccessory(acessoryProduct.id)"
          @change="handleAddOrRemoveAccessory(acessoryProduct.id)"
        />
      </div>
    </template>
  </SfCollectedProduct>
</template>

<script lang="ts">
import { SfCollectedProduct } from '@storefront-ui/vue';
import { cartGetters, useCollectedProduct } from '~/composables';
import { defineComponent, computed, PropType, toRefs } from '@nuxtjs/composition-api';
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
    const { orderLine } = toRefs(props);
    const {
      handleRemoveItemAndAccessories,
      handleAddOrRemoveAccessory,
      handleUpdateItem,
      orderLineHasAccessory,
      getPrice,
      loading
    } = useCollectedProduct(orderLine);

    const accessoryProducts = computed(() => props.orderLine?.product?.accessoryProducts || []);

    const quantityInStock = computed(() => props.orderLine?.product?.qty || 0);

    return {
      quantityInStock,
      loading,
      orderLineHasAccessory,
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

<style scoped lang="scss">
@import '~/assets/css/collectedPoduct.scss';
</style>
