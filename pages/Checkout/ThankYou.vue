<template>
  <div id="thank-you">
    <SfCallToAction
      v-e2e="'thank-you-banner'"
      class="banner"
      :image="{
        mobile: require('/assets/images/thankyou/bannerM2.webp'),
        desktop: require('/assets/images/thankyou/bannerD2.webp'),
      }"
    >
    <!-- <SfCallToAction
      v-e2e="'thank-you-banner'"
      class="banner"
      title="Thank you for your order!"
      :image="{
        mobile: '/thankyou/bannerM.png',
        desktop: '/thankyou/bannerD.png',
      }"
    > -->
      <!--<template #description>
        <div class="banner__order-number">
          <span>{{ $t("Order No. ") }}</span>
          <strong>{{ cartGetters.getOrderNumber(cart) }}</strong>
        </div>
        <div
          v-if="paymentRefused"
          class="banner__order-number"
        >
          <SfButton
            class="sf-button--pure sf-header__action"
            @click="redirectToPayment"
          >
            Pay
          </SfButton>
        </div>
      </template>-->
    </SfCallToAction>
    <section class="section">
      <div class="order">
        <SfHeading
          title="Your Purchase"
          class="order__heading heading sf-heading--left"
          :level="3"
        />
        <p class="order__paragraph paragraph">
          {{ $t("Successful placed order") }}
        </p>
        <div class="order__contact">
          <SfHeading
            :level="6"
            class="heading sf-heading--left sf-heading--no-underline"
            title="Primary contacts for any questions"
          />
          <div class="contact">
            <p class="contact__name">
              {{ companyDetails.name }}
            </p>
            <p class="contact__street">
              {{ companyDetails.street }}
            </p>
            <p class="contact__city">
              {{ companyDetails.city }}
            </p>
            <p class="contact__email">
              {{ companyDetails.email }}
            </p>
          </div>
        </div>
        <SfButton class="order__notifications-button button-size">
          {{
            $t("Allow order notifications")
          }}
        </SfButton>
      </div>
      <div class="additional-info">
        <div>
          <SfHeading
            title="Your Account"
            class="heading sf-heading--left"
            :level="3"
          />
          <p class="paragraph">
            {{ $t("Info after order") }}
          </p>
        </div>
        <div>
          <SfHeading
            title="What can we improve"
            class="heading sf-heading--left"
            :level="3"
          />
          <p class="paragraph">
            {{ $t("Feedback") }}
          </p>
          <SfButton
            class="
              feedback-button
              color-secondary
              sf-button--full-width
              button-size
            "
          >
            {{ $t("Send my feedback") }}
          </SfButton>
        </div>
      </div>
    </section>
    <nuxt-link to="/">
      <SfButton class="back-button color-secondary button-size">
        {{
          $t("Go back to shop")
        }}
      </SfButton>
    </nuxt-link>
  </div>
</template>

<script>
import { SfHeading, SfButton, SfCallToAction } from '@storefront-ui/vue';
import { ref, onMounted } from '@nuxtjs/composition-api';
import { usePayment, useCart, cartGetters } from '@vue-storefront/odoo';
export default {
  components: {
    SfHeading,
    SfButton,
    SfCallToAction
  },
  emits: ['changeStep'],
  setup(props, { root, emit }) {
    emit('changeStep', 4);

    const { getPaymentConfirmation } = usePayment();
    const { cart } = useCart();

    const companyDetails = ref({
      name: 'Divante Headquarter',
      street: 'St. Dmowskiego 17, 53-534',
      city: 'Wroclaw, Poland',
      email: 'demo@vuestorefront.io'
    });

    onMounted(async () => {
      await getPaymentConfirmation();
    });

    const redirectToPayment = () => {
      return root.$router.push('/checkout/payment');
    };

    return {
      cartGetters,
      cart,
      redirectToPayment,
      companyDetails
    };
  }
};
</script>
<style lang="scss" scoped>
@import '~/assets/css/thankyou.scss';
</style>
