<template>
  <div id="cart">
    <SfSidebar
      :visible="isCartSidebarOpen"
      :title="$t('My Cart')"
      position="right"
      @close="toggleCartSidebar"
    >
      <template #content-top>
        <SfProperty
          v-show="totalItems"
          class="sf-property--large cart-summary desktop-only"
          :name="$t('Total items')"
          :value="totalItems"
        />
      </template>
      <transition
        type="transition"
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
              type="transition"
              tag="div"
            >
              <LazyGreenCollectedProduct
                v-for="item in items"
                :key="item.id"
                :order-line="item"
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
              :src="require(`/assets/images/cart/${!$device.isMobile ? 'empty_cart_big.svg' : 'empty_cart.svg'}`)"
              :width="373"
              :height="253"
            />
            <SfHeading
              :title="$t('Your cart is empty')"
              :level="2"
              class="empty-cart__heading"
              :description="$t('Looks like you haven’t added any items to the bag yet. Start shopping to fill it in.')"
            />
          </div>
        </div>
      </transition>
      <template #content-bottom>
        <transition name="sf-fade" type="transition">
          <div v-if="totalItems">
            <SfProperty
              :name="$t('Total price')"
              class="
                sf-property--full-width sf-property--large
                my-cart__total-price
              "
            >
              <template #value>
                <SfPrice :regular="$currency(totals)" />
              </template>
            </SfProperty>
            <nuxt-link to="/checkout/personaldetails" :title="$t('Personal details')">
              <SfButton
                class="sf-button--full-width checkout_button mb-4"
                @click="toggleCartSidebar"
              >
                {{ $t("checkout") }}
              </SfButton>
            </nuxt-link>
            <GreenButton
              style-type="Tertiary"
              color="Grey"
              shape="Round"
              size="Max"
              @click="toggleCartSidebar"
            >
              {{ $t("Go back shopping") }}
            </GreenButton>
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
<script lang="ts">
import {
  SfSidebar,
  SfHeading,
  SfButton,
  SfProperty,
  SfPrice,
  SfImage
} from '@storefront-ui/vue';
import { computed, defineComponent, watch } from '@nuxtjs/composition-api';
import { useCart, useUser } from '@vue-storefront/odoo';
import { useUiState, cartGetters } from '~/composables';
import { setTrackViewCart } from "~/resources/tracking";

export default defineComponent({
  name: 'CartSidebar',
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

    const items = computed(() => cartGetters.getItems(cart.value));
    const totals = computed(() => cartGetters.getTotals(cart.value).total);
    const totalItems = computed(() => cartGetters.getTotalItems(cart.value));
    const accessories = computed(() => cartGetters.getAccessories(cart.value));

    watch(isCartSidebarOpen, () => {
      const products = items.value.map((item) => item.product);
      if(products.length > 0 && isCartSidebarOpen.value) {
        setTrackViewCart(totals.value,  products);
      }
    })


    return {
      isAuthenticated,
      items,
      removeItem,
      updateItemQty,
      isCartSidebarOpen,
      toggleCartSidebar,
      accessories,
      totals,
      totalItems,
      cartGetters
    };
  }
});
</script>

<style lang="scss" scoped>
@import '~/assets/css/cartSidebar.scss';
</style>
