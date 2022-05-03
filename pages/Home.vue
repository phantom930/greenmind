<template>
  <div>
    <div class="layout">
      <HomeTopHero />
    </div>

    <div
      v-if="!$device.isMobileOrTablet"
      class="flex justify-center"
      style="transform: translateY(-34px) mt-1"
    >
      <SfImage
        :src="require('/assets/images/homeUspBanner/banner_1.svg')"
        alt="banner_1"
        class="mb-5"
        :width="1440"
        :height="237"
      />
    </div>
    <div v-else class="usp-mobile flex grid rounded-lg m-6 py-10 px-16">
      <div class="flex items-center gap-5">
        <SfImage
          :src="require('/assets/images/homeHero/usp_01.svg')"
          alt="banner_1"
          :width="74"
          :height="69"
        />
        <p>
          Produkter er testet
          af egne eksperter
        </p>
      </div>

      <div class="flex items-center gap-5">
        <SfImage
          :src="require('/assets/images/homeHero/usp_02.svg')"
          alt="banner_1"
          :width="74"
          :height="69"
        />
        <p>
          14 dages returret
          2 års garanti
        </p>
      </div>

      <div class="flex items-center gap-5">
        <SfImage
          :src="require('/assets/images/homeHero/usp_03.svg')"
          alt="banner_1"
          :width="74"
          :height="69"
        />
        <p>
          Ombyt i én af vores
          10 butikker
        </p>
      </div>
    </div>

    <div class="layout">
      <HomeCategoryLinks />
      <!-- <div class="flex justify-between mt-14">
        <HomeCallToActionStand
          :title="$t('Stand')"
          :image="require('/assets/images/homeHero/image_01.svg')"
          background="#CABDBD"
        />
        <HomeCallToActionStand
          :title="$t('Stand')"
          :image="require('/assets/images/homeHero/image_02.svg')"
          description="Find stunning women's cocktail dresses and party dresses. Stand out in lace and metallic cocktail dresses and party dresses from all your favorite brands."
          background="#D6D4D4"
        />
        <HomeCallToActionStand
          :title="$t('Stand')"
          :image="require('/assets/images/homeHero/image_03.svg')"
          description="Find stunning women's cocktail dresses and party dresses. Stand out in lace and metallic cocktail dresses and party dresses from all your favorite brands."
          background="#E0D6C9"
        />
      </div> -->
    </div>

    <!-- <div class="div-popular-products mt-20">
      <GreenCarousel
        :title="$t('Popular products')"
        :products="products"
        :currency="currency"
      />
    </div> -->

    <div class="pt-40 call-to-hero-bottom-wrapper">
      <div
        style="height: 144px;"
        class="div-call-to-hero-bottom"
      >
        <SfCallToAction>
          <template #title>
            <SfImage
              :width="437"
              :height="240"
              :src="require('/assets/images/homeHero/samsung_phones.svg')"
              alt="samsumg"
            />
            <div class="title-subtitle">
              <h2 class="sf-call-to-action__title">
                {{ $t('Subscribe to newsletter') }}
              </h2> <p class="sf-call-to-action__description display-none" />
              <p class="sf-call-to-action__description">
                Be aware of upcoming sales and events. Receive gifts and special offers!
              </p>
            </div>
            <div class="div-button">
              <GreenButton
                class="sf-button-call-to-action"
                style-type="Primary"
                color="Green"
                shape="Round"
                @click="toggleNewsletterModal"
              >
                {{ $t('See More') }}
              </GreenButton>
            </div>
          </template>
        </sfcalltoaction>
      </div>
    </div>

    <div class="between-call-to-action-and-footer" />
    <!-- <NewsletterModal
      :loading="loading"
      @email-submitted="onSubscribe"
    /> -->
  </div>
</template>

<script>
import { SfImage, SfCallToAction} from '@storefront-ui/vue';
import { computed } from '@vue/composition-api';
import { productGetters, useFacet, facetGetters, useNewsLetter } from '@vue-storefront/odoo';
import { onSSR } from '@vue-storefront/core';
import { useUiState } from '~/composables';
import { useUiNotification, useUiHelpers } from '~/composables';
import NewsletterModal from '~/components/NewsletterModal.vue';

export default {
  components: {
    NewsletterModal,
    SfCallToAction,
    SfImage
  },
  setup() {
    const { result, search } = useFacet();
    const products = computed(() => facetGetters.getProducts(result.value));
    const { toggleNewsletterModal } = useUiState();
    const { loading, sendSubscription } = useNewsLetter();
    const { send } = useUiNotification();
    const { getFacetsFromURL } = useUiHelpers();

    const customQueryProducts = {
      getProductTemplatesList: 'greenGetProductListFormHomePage'
    };

    onSSR(async () => {
      const params = { ...getFacetsFromURL(), customQueryProducts };

      await search(params);
    });

    const onSubscribe = async (emailAddress) => {
      const data = await sendSubscription({ email: emailAddress });
      if (data.subscribed) {
        send({
          message: 'Subscribe successfull!',
          type: 'success'
        });
      }
      if (!data.subscribed) {
        send({
          message: 'Something wrong!',
          type: 'danger'
        });
      }
      toggleNewsletterModal();
    };

    return {
      loading,
      onSubscribe,
      toggleNewsletterModal,
      productGetters,
      useFacet,
      facetGetters,
      products
    };
  },
  data() {
    return {
      storage: ['128 Gb', '128 Gb', '128 Gb', '128 Gb', '128 Gb'],
      color: ['Gold', 'Red', 'Silver', 'Black', 'Gold'],
      currency: ['$']
    };
  }
};
</script>

<style lang="scss" scoped>
@import '~/assets/css/home.scss';
</style>
