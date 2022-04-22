<template>
  <div id="detailed-cart">
    <SfBreadcrumbs
      class="breadcrumbs desktop-only"
      :breadcrumbs="breadcrumbs"
    />
    <div class="detailed-cart">
      <div v-if="totalItems" class="detailed-cart__aside">
        <SfOrderSummary
          :products="orderLines"
          order-title="Totals"
          :total-items="totalItems"
          class="oderSummary"
        >
          <template #summary>
            <div
              v-for="item in summary"
              :key="item.name"
              class="mb-3"
            >
              <SfProperty
                :name="item.name"
                class="
                  sf-property--full-width sf-property--large
                  my-cart__total-price
                "
              >
                <template #value>
                  <span v-if="item.name === 'Products'" class="card__text">
                    {{ item.value.value }}</span>
                  <span
                    v-else-if="item.name === 'Sub Total'"
                    class="card__text"
                  >
                    {{ $currency(item.value.value.subtotal) }}</span>
                  <span v-else class="card__text"> {{ item.value }}</span>
                </template>
              </SfProperty>
            </div>

            <div class="my-7">
              <hr>
            </div>
            <div class="mb-5">
              <SfProperty class="sf-property--full-width sf-property--large">
                <template #name>
                  <span class="cart-total">Total price:</span>
                </template>
                <template #value>
                  <span class="card__text"> {{ $currency(totals.total) }}</span>
                </template>
              </SfProperty>
            </div>
          </template>
          <template #promo>
            <div>
              <div>
                <nuxt-link to="/checkout/personaldetails">
                  <SfButton class="custom__width detailed_cart-checkout_button">
                    {{ $t("CHECKOUT") }}
                  </SfButton>
                </nuxt-link>
              </div>
              <div class="my-5">
                <SfButton
                  class="custom__width detailed_cart-shopping_button"
                  @click="$router.go(-1)"
                >
                  {{ $t("BACK TO SHOPPING") }}
                </SfButton>
              </div>
              <div class="custom__con">
                <div class="bottom__text">
                  Helpful information: <br>
                  <span class="text-primary">•</span> Questions? Chat with us or
                  call 1.888.282.6060. <br>
                  <span class="text-primary">•</span> Shipping internationally?
                  Choose your destination & currency. <br>
                  <span class="text-primary">•</span> Shipping methods & charges
                </div>
              </div>
            </div>
          </template>
        </SfOrderSummary>
      </div>
      <div class="detailed-cart__main">
        <transition name="sf-fade" mode="out-in">
          <div
            v-if="totalItems"
            key="detailed-cart"
            class="collected-product-list"
          >
            <transition-group name="sf-fade" tag="div">
              <LazyGreenDetailedCollectedProduct
                v-for="orderLine in orderLines"
                :key="orderLine.id"
                :order-line="orderLine"
                :checkbox_title="$t('Purchases')"
                class="sf-collected-product--detailed mb-8"
              />
            </transition-group>
          </div>
          <div
            v-else
            key="empty-cart"
            class="empty-cart"
          >
            <SfImage
              :src="require('@storefront-ui/shared/icons/empty_cart.svg')"
              alt="Empty cart"
              class="empty-cart__image"
              :width="$device.isMobile ? 210 : 531"
              :height="$device.isMobile ? 142 : 361"
            />
            <SfHeading
              title="Your cart is empty"
              :level="2"
              description="Looks like you haven’t added any items to the cart yet. Start shopping to fill it in."
            />
            <SfButton
              class="sf-button--full-width empty-cart__button"
              @click="$router.go(-2)"
            >
              {{ $t("go back to shopping") }}
            </SfButton>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
import {
  SfButton,
  SfImage,
  SfProperty,
  SfHeading,
  SfBreadcrumbs,
  SfOrderSummary
} from '@storefront-ui/vue';
import { ref } from '@nuxtjs/composition-api';
import { computed } from '@nuxtjs/composition-api';
import { useCart, useUser } from '@vue-storefront/odoo';
import { useUiState, cartGetters } from '~/composables';

export default {
  name: 'Cart',
  components: {
    SfBreadcrumbs,
    SfImage,
    SfButton,
    SfHeading,
    SfProperty,
    SfOrderSummary
  },
  setup() {
    const { isAuthenticated } = useUser();
    const { cart, removeItem, updateItemQty } = useCart();
    const { isCartSidebarOpen, toggleCartSidebar } = useUiState();

    const orderLines = computed(() => cartGetters.getItems(cart.value));
    const totals = computed(() => cartGetters.getTotals(cart.value));
    const totalItems = computed(() => cartGetters.getTotalItems(cart.value));
    const summary = ref([
      { name: 'Products', value: totalItems },
      { name: 'Sub Total', value: totals },
      { name: 'Shipping:', value: 'Free' }
    ]);
    const breadcrumbs = [
      { text: 'Home', link: '/' },
      { text: 'Cart', link: '#' }
    ];

    return {
      isAuthenticated,
      orderLines,
      updateItemQty,
      isCartSidebarOpen,
      toggleCartSidebar,
      removeItem,
      breadcrumbs,
      totals,
      totalItems,
      summary,
      cartGetters
    };
  }
};
</script>
<style lang="scss" scoped>
@import '~/assets/css/cart.scss';

</style>

