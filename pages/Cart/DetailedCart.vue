<template>
  <div id="detailed-cart">
    <SfBreadcrumbs
      class="breadcrumbs desktop-only"
      :breadcrumbs="breadcrumbs"
    />
    <div class="detailed-cart">
      <div
        v-if="totalItems"
        class="detailed-cart__aside"
      >
        <SfOrderSummary
          :products="products"
          order-title="Totals"
          :total-items="totalItems"
        >
          <template #summary>
            <div
              v-for="item in summary"
              :key="item.name"
              class="mb-3"
            >
              <SfProperty
                :name="item.name"
                class="sf-property--full-width sf-property--large my-cart__total-price"
              >
                <template #value>
                  <span
                    v-if="item.name === 'Products'"
                    class="card__text"
                  >
                    {{ item.value.value }}</span>
                  <span
                    v-else-if="item.name === 'Sub Total'"
                    class="card__text"
                  >
                    ${{ item.value.value.subtotal }}</span>
                  <span
                    v-else
                    class="card__text"
                  > {{ item.value }}</span>
                </template>
              </SfProperty>
            </div>

            <div class="my-7">
              <hr>
            </div>
            <div class="mb-5">
              <SfProperty class="sf-property--full-width sf-property--large">
                <template #name>
                  <span class="card__text">Total Price:</span>
                </template>
                <template #value>
                  <span class="card__text"> ${{ totals.total }}</span>
                </template>
              </SfProperty>
            </div>
          </template>
          <template #promo>
            <div>
              <div>
                <nuxt-link to="/checkout/personaldetails">
                  <SfButton class="custom__width detailed_cart-checkout_button">
                    {{
                      $t("CHECKOUT")
                    }}
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
                  Choose your destination  & currency. <br>
                  <span class="text-primary">•</span> Shipping methods & charges
                </div>
              </div>
            </div>
          </template>
        </SfOrderSummary>
      </div>
      <div class="detailed-cart__main">
        <transition
          name="sf-fade"
          mode="out-in"
        >
          <div
            v-if="totalItems"
            key="detailed-cart"
            class="collected-product-list"
          >
            <transition-group
              name="sf-fade"
              tag="div"
            >
              <LazyGreenDetailedCollectedProduct
                v-for="product in products"
                :key="product.id"
                :product="product"
                :checkbox_title="$t('Purchases')"
                class="sf-collected-product--detailed"
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
              :width="531"
              :height="361"
              style="margin-left: 25%; margin-top: 0%"
            />
            <SfHeading
              title="Your cart is empty"
              :level="2"
              description="Looks like you haven’t added any items to the cart yet. Start
                shopping to fill it in."
              style="
                --heading-title-color: var(--_c-greenmind-fern-primary-medium-green);
                --heading-title-font-size: 46px;
                --heading-title-font-weight: 700;
                --heading-title-font-line-height: 48px;
                --heading-description-font-family: var(--font-family--primary);
                --heading-description-font-weight: 400;
                --heading-description-font-size: 16px;
                --heading-description-color: var(--_c-greenmind-secondary-black);
                "
            />
            <SfButton
              class="sf-button--full-width empty-cart__button"
              @click="$router.go(-2)"
            >
              {{ $t('go back to shopping') }}
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
import { useCart, useUser, cartGetters } from '@vue-storefront/odoo';
import { useUiState } from '~/composables';
import { onSSR } from '@vue-storefront/core';

export default {
  name: 'DetailedCart',
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

    const products = computed(() => cartGetters.getItems(cart.value));
    const totals = computed(() => cartGetters.getTotals(cart.value));
    const totalItems = computed(() => cartGetters.getTotalItems(cart.value));
    onSSR(async () => {
      // await loadCart();
    });
    const summary = ref([
      {
        name: 'Products',
        value: totalItems
      },
      {
        name: 'Sub Total',
        value: totals
      },

      {
        name: 'Shipping:',
        value: 'Free'
      }
    ]);
    const breadcrumbs = [
      {
        text: 'Home',
        link: '/'
      },
      {
        text: 'Cart',
        link: '#'
      }
    ];

    return {
      isAuthenticated,
      products,
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
@import "~@storefront-ui/vue/styles";
#detailed-cart {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1272px;
    margin: 0 auto;
    padding: 0 var(--spacer-sm);
  }
}
.breadcrumbs {
  padding: var(--spacer-base) 0;
}
.sf-order-summary {
  &__heading {
    --heading-title-margin: 0 0 var(--spacer-xl) 0;
    --heading-title-font-weight: var(--font-weight--bold);
    --heading-padding: 0;
    --heading-title-margin: 0 0 var(--spacer-xl) 0;
    --heading-title-font-size: var(--h3-font-size);
    @include for-desktop {
      --heading-title-font-weight: var(--font-weight--semibold);
    }
  }
  &__property {
    margin: var(--spacer-base) 0;
    --property-name-font-weight: var(--font-weight--medium);
    --property-value-font-weight: var(--font-weight--bold);
    &:last-of-type {
      margin: var(--spacer-base) 0 var(--spacer-xl);
      --property-name-color: var(--c-text);
    }
  }
  &__divider {
    --divider-border-color: var(--c-white);
    --divider-margin: var(--spacer-xl) 0 0 0;
  }
  &__promo-code {
    &-input {
      --input-background: var(--c-white);
      --input-label-font-size: var(--font-size--base);
      flex: 1;
    }
    &-button {
      --button-height: 1.875rem;
    }
  }
  &__characteristics {
    &-item {
      margin: var(--spacer-base) 0;
      &:last-of-type {
        margin: 0;
      }
    }
  }
}
.detailed-cart {
  &__main {
    padding: 0 var(--spacer-sm);
    @include for-desktop {
      padding: 0;
    }
  }
  &__aside {
    box-sizing: border-box;
    width: 100%;
    background: var(--c-light);
    padding: var(--spacer-base) var(--spacer-sm);
  }
  @include for-desktop {
    display: flex;
    &__main {
      flex: 1;
    }
    &__aside {
      flex: 0 0 26.8125rem;
      order: 1;
      margin: 0 0 0 var(--spacer-xl);
      padding: var(--spacer-xl);
    }
  }
}
.collected-product {
  --collected-product-padding: var(--spacer-sm) 0;
  --collected-product-actions-display: flex;
  border: 1px solid var(--c-light);
  border-width: 1px 0 0 0;
  &:first-of-type {
    border-top: none;
  }
  &__properties {
    --property-value-font-weight: var(--font-weight--normal);
    margin: var(--spacer-sm) 0 0 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    flex: 2;
  }
  @include for-mobile {
    --collected-product-remove-bottom: var(--spacer-sm);
  }
  @include for-desktop {
    --collected-product-padding: var(--spacer-lg) 0;
  }
}
.actions {
  &__button {
    display: block;
    margin: 0 0 var(--spacer-xs) 0;
    color: var(--c-text);
    &:hover {
      color: var(--c-text-muted);
    }
  }
  &__description {
    font-family: var(--font-family--primary);
    font-size: var(--font-size--sm);
    font-weight: var(--font-weight--light);
    color: var(--c-text-muted);
    position: absolute;
    bottom: 0;
    padding-bottom: var(--spacer-lg);
  }
}

.custom__text {
  color: #72757e;
}
.custom__text:hover {
  color: #5ece7b;
}
hr {
  height: 1px;
  background-color: white;
  border: none;
}
.card__text {
  color: black;
  font-size: 20px;

  font-family: Raleway;
  font-style: normal;
  font-weight: bold;
}

.custom__width {
  width: 100%;
}

.bottom__text {
  width: 400px;
  height: 146px;
  font-family: var(--font-family--primary);
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  color: var(--_c-greenmind-secondary-black);
  margin-top: 10%;
}

.custom__col {
  display: flex;
  align-items: flex-start;
}

.custom__row {
  display: flex;
  justify-content: center;
  align-items: center;
}

.empty-cart {
  --heading-title-color: var(--c-primary);
  --heading-title-margin: 0 0 var(--spacer-base) 0;
  --heading-description-margin: 0 0 var(--spacer-xl) 0;
  --heading-title-font-weight: var(--font-weight--semibold);
  display: flex;
  flex: 1;
  align-items: center;
  flex-direction: column;
  &__image {
    --image-width: 13.1875rem;
    margin: var(--spacer-2xl) 0;
  }
  @include for-desktop {
    &__image {
      --image-width: 22rem;
    }
    &__button {
      --button-width: 20.9375rem;
    }
  }
}
.detailed_cart-checkout_button {
    border-radius: 100px;
    --button-background: var(--_c-greenmind-pine-primary-dark-green);
}
.detailed_cart-checkout_button:hover {
  --button-background: var(--_c-greenmind-fern-secondary-medium-green);
}
.detailed_cart-checkout_button:active {
  --button-box-shadow: none;
  --button-background: var(--_c-greenmind-fern-secondary-medium-green)
    radial-gradient(circle, transparent 40%, var(--_c-greenmind-mint-secondary-light-green) 1%) center/15000%;
  --button-transition: background 0s;
  background-size: 100%;
}
.detailed_cart-shopping_button {
    border-radius: 100px;
    --button-background: var(--_c-greenmind-dark-grey-accent);
    --button-color: var(--_c-greenmind-primary-grey);
}
.detailed_cart-shopping_button:hover {
  --button-background: var(--_c-greenmind-dark-grey-accent);
}
.detailed_cart-shopping_button:active {
  --button-box-shadow: none;
  --button-background: var(--_c-greenmind-dark-grey-accent)
    radial-gradient(circle, transparent 40%, var(--_c-greenmind-light-grey-accent) 1%) center/15000%;
  --button-transition: background 0s;
  background-size: 100%;
}
::v-deep .detailed-cart__aside{
    margin-bottom: 5%;
    border-radius: 14px;
}
::v-deep .sf-collected-product__title {
    font-family: var(--font-family--primary);
}
.empty-cart__button {
    margin-top: 5%;
    margin-bottom: 10%;
    border-radius: 100px;
    --button-background: var(--_c-greenmind-pine-primary-dark-green);
    text-decoration: none;
}
.empty-cart__button:hover {
  --button-background: var(--_c-greenmind-fern-secondary-medium-green);
}
.empty-cart__button:active {
  --button-box-shadow: none;
  --button-background: var(--_c-greenmind-fern-secondary-medium-green)
    radial-gradient(circle, transparent 40%, var(--_c-greenmind-mint-secondary-light-green) 1%) center/15000%;
  --button-transition: background 0s;
  background-size: 100%;
}
</style>
