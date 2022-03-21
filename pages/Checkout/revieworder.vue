<template>
  <div class="review-order">
    <h3 class="title">Order Details</h3>
    <div class="orders">
      <a v-for="(product, index) in products" :key="index" class="order">
        <div class="img-info-wrap">
          <div class="image-container">
            <img :src="$image(cartGetters.getItemImage(product))" />
          </div>
          <div class="product-info">
            <div class="product-title">
              {{ cartGetters.getItemName(product) }}
            </div>
            <div class="gadget">+ Screenprotection</div>
            <div class="gadget">+ Forsikring All Risk</div>
            <div class="code">MSD23-345-324</div>
          </div>
        </div>
        <div class="costs">
          <div class="price">
            {{ $n(cartGetters.getItemPrice(product).regular) + ",-" }}
          </div>
          <p>149,-</p>
          <p>599,-</p>
        </div>
      </a>
    </div>
    <div class="total-price-wrap">
      <div class="subtotal">
        <p>Subtotal:</p>
        <div class="price">
          {{ totals.subtotal + ",-" }}
        </div>
      </div>
      <div class="shipping">
        <p>Shipping:</p>
        <p class="price">Free</p>
      </div>
      <div class="total-price">
        <p class="total">Total price:</p>
        <p class="price">
          {{ totals.total + ",-" }}
        </p>
      </div>
    </div>
    <div class="checkbox-button-wrap">
      <div class="checkbox-wrap">
        <GreenCheckbox :has-general-wrapper="false" />
        <p class="label">I agree to <a href="#">Terms and Conditions</a></p>
      </div>
      <div class="submit-button">
        <SfButton
          class="color-primary sf-button payment-btn"
          @click="$router.push('/checkout/payment')"
        >
          {{ $t("GO TO PAYMENT") }}
        </SfButton>
        <SfButton
          class="color-primary sf-button payment-btn mt-4 smartphone-only"
          @click="$router.push('/checkout/shipping')"
        >
          {{ $t("GO BACK") }}
        </SfButton>
      </div>
    </div>
  </div>
</template>

<script>
import { SfButton } from '@storefront-ui/vue';
import { computed, watch } from '@vue/composition-api';
import { useCart, cartGetters } from '@vue-storefront/odoo';

export default {
  components: {
    SfButton
  },
  setup(props, { root }) {
    const { cart } = useCart();

    const products = computed(() => cartGetters.getItems(cart.value));
    const totals = computed(() => cartGetters.getTotals(cart.value));
    const totalItems = computed(() => cartGetters.getTotalItems(cart.value));
    if (totalItems.value === 0) root.$router.push('/cart');
    watch(
      () => totalItems.value,
      () => {
        if (totalItems.value === 0) root.$router.push('/cart');
      }
    );
    return {
      cartGetters,
      totals,
      products
    };
  }
};
</script>

<style lang="scss" scoped>
.review-order {
  margin-bottom: 447px;
  @include for-mobile {
    margin-bottom: 47px;
  }
}

.review-order .title {
  font-size: 34px;
  font-weight: 700;
  color: #1d1f22;
  padding-top: 40px;
  padding-bottom: 24px;
  border-bottom: 2px solid #7ba393;
}

.orders .order {
  display: flex;
  align-items: flex-start;
  width: 100%;
  justify-content: space-between;
  padding-top: 17px;
  padding-bottom: 7px;
  border-bottom: 1px solid #f1f2f3;
}

.orders .order:hover {
  box-shadow: 0px 4px 11px rgba(29, 31, 34, 0.1);
}

.orders .img-info-wrap {
  display: flex;
  align-items: flex-start;
}

.order .image-container {
  max-width: 82px;
  width: 100%;
  margin-right: 42px;
}

.image-container img {
  width: 100%;
}

.product-info .product-title {
  font-size: 18px;
  font-weight: 400;
  color: #1d1f22;
}

.product-info .gadget {
  color: #43464e;
  font-weight: 400;
  font-size: 16px;
}

.product-info .code {
  color: #72757e;
  font-size: 16px;
  font-weight: 400;
  padding-top: 4px;
}

.order .costs .price {
  color: #1d1f22;
  font-size: 18px;
  font-weight: 400;
}

.order .costs p {
  color: #43464e;
  font-size: 16px;
  font-weight: 400;
}

.order .costs {
  text-align: end;
  padding-right: 8px;
}

.subtotal p {
  font-size: 18px;
  font-weight: 400;
  color: #43464e;
}

.shipping p {
  font-size: 18px;
  font-weight: 400;
  color: #43464e;
}

.total-price-wrap .price {
  color: #1d1f22;
  font-size: 20px;
  font-weight: 700;
}

.total-price .total {
  color: #1d1f22;
  font-size: 20px;
  font-weight: 700;
}

.subtotal,
.shipping,
.total-price {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.subtotal {
  padding-top: 26px;
  padding-bottom: 28px;
}

.shipping {
  padding-bottom: 18px;
  border-bottom: 2px solid #7ba393;
}

.total-price {
  padding-top: 16px;
  padding-bottom: 40px;
}

.checkbox-wrap {
  display: flex;
  align-items: center;
  margin-bottom: 40px;
}

.checkbox-wrap .label {
  padding-left: 8px;
}

.checkbox-wrap a {
  text-decoration: underline;
}

.payment-btn {
  font-size: 14px;
  background: #32463d;
  color: #fff;
  font-weight: 500;
  border-radius: 100px;
  font-family: "Josefin Sans";
  width: 100%;
  padding-top: 20px;
  @include for-desktop {
    max-width: 224px;
  }
}
.submit-button {
  @include for-mobile {
    position: absolute;
    bottom: 0;
    width: calc(100% - 48px);
    padding-bottom: 20px;
  }
}
</style>
