<template>
  <div id="cart">
    <SfSidebar
      :visible="isCartSidebarOpen"
      title="My Cart"
      class="sf-sidebar--right"
      @close="toggleCartSidebar"
    >
      <template #content-top>
        <SfProperty
          v-if="totalItems"
          class="sf-property--large cart-summary desktop-only"
          name="Total items"
          :value="totalItems"
        />
      </template>
      <transition
        name="sf-fade"
        mode="out-in"
      >
        <div
          v-if="totalItems"
          key="my-cart"
          class="my-cart"
        >
          <div class="collected-product-list">
            <transition-group
              name="sf-fade"
              tag="div"
            >
              <LazyGreenCollectedProduct
                v-for="product in products"
                :key="product.id"
                :product="product"
                :checkbox_title="$t('Purchases')"
              />
            </transition-group>
          </div>
        </div>
        <div
          v-else
          key="empty-cart"
          class="empty-cart"
        >
          <div class="empty-cart__banner">
            <SfImage
              alt="Empty bag"
              class="empty-cart__image"
              src="/icons/empty-cart.svg"
              :width="373"
              :height="253"
            />
            <SfHeading
              title="Your cart is empty"
              :level="2"
              class="empty-cart__heading"
              description="Looks like you haven’t added any items to the bag yet. Start
              shopping to fill it in."
            />
          </div>
        </div>
      </transition>
      <template #content-bottom>
        <transition name="sf-fade">
          <div v-if="totalItems">
            <SfProperty
              name="Total price"
              class="
                sf-property--full-width sf-property--large
                my-cart__total-price
              "
            >
              <template #value>
                <SfPrice :regular="$n(totals.subtotal, 'currency')" />
              </template>
            </SfProperty>
            <nuxt-link to="/checkout/personaldetails">
              <SfButton
                class="sf-button--full-width checkout_button mb-4"
                @click="toggleCartSidebar"
              >
                {{ $t("checkout") }}
              </SfButton>
            </nuxt-link>
            <nuxt-link to="/cart">
              <SfButton
                class="sf-button--full-width details_button"
                @click="toggleCartSidebar"
              >
                {{ $t("see details") }}
              </SfButton>
            </nuxt-link>
          </div>
          <div v-else>
            <SfButton
              class="sf-button--full-width empty-cart__button"
              @click="toggleCartSidebar"
            >
              {{ $t("Go back shopping") }}
            </SfButton>
          </div>
        </transition>
      </template>
    </SfSidebar>
  </div>
</template>
<script>
import {
  SfSidebar,
  SfHeading,
  SfButton,
  SfProperty,
  SfPrice,
  SfImage
} from '@storefront-ui/vue';
import { computed } from '@vue/composition-api';
import { useCart, useUser, cartGetters } from '@vue-storefront/odoo';
import { useUiState } from '~/composables';

export default {
  name: 'Cart',
  components: {
    SfSidebar,
    SfButton,
    SfHeading,
    SfProperty,
    SfPrice,
    SfImage
  },
  setup() {
    const { isCartSidebarOpen, toggleCartSidebar } = useUiState();
    const { cart, removeItem, updateItemQty } = useCart();
    const { isAuthenticated } = useUser();
    const products = computed(() => cartGetters.getItems(cart.value));
    const totals = computed(() => cartGetters.getTotals(cart.value));
    const totalItems = computed(() => cartGetters.getTotalItems(cart.value));

    return {
      isAuthenticated,
      products,
      removeItem,
      updateItemQty,
      isCartSidebarOpen,
      toggleCartSidebar,
      totals,
      totalItems,
      cartGetters
    };
  }
};
</script>

<style lang="scss" scoped>
@import '~/assets/css/cart.scss';
</style>
