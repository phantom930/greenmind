<template>
  <div>
    <div class="layout">
      <LazyHomeTopHero />
    </div>

    <div class="layout">
      <LazyHomeCategoryLinks />

      <GreenImage
        :src="require(mobileOrTabletSize ? '/assets/images/productsUspBanner/banner_mobile_1.webp' : '/assets/images/homeUspBanner/banner_desktop_1.webp')"
        alt="banner_desktop_1"
        class="usp_banner_products mt-5"
        :width="$breakpoints.xs ? 531 : 1440"
        :height="$breakpoints.xs ? 120 : 237"
      />
    </div>

    <div class="div-popular-products mt-7 lg:mt-20">
      <div
        v-if="productsLoading"
        style="height: 500px"
      >
        <SfLoader :loading="productsLoading" />
      </div>
      <LazyGreenCarousel
        v-else
        :title="$t('Popular products')"
        :products="products"
        :currency="currency"
      />
    </div>

    <div class="pt-40 call-to-hero-bottom-wrapper">
      <div
        style="height: 144px;"
        class="div-call-to-hero-bottom"
      >
        <SfCallToAction>
          <template #title>
            <GreenImage
              :width="mobileOrTabletSize ? 221 : 437"
              :height="mobileOrTabletSize ? 121 : 240"
              :src="require('/assets/images/homeHero/samsung_phones.svg')"
              alt="samsumg"
            />
            <div class="title-subtitle">
              <h2 class="sf-call-to-action__title">
                {{ $t('Subscribe to newsletter') }}
              </h2> <p class="sf-call-to-action__description display-none" />
              <p class="sf-call-to-action__description">
                {{ $t('Be aware of upcoming sales and events. Receive gifts and special offers!') }}
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
                {{ $t('Subscribe') }}
              </GreenButton>
            </div>
          </template>
        </sfcalltoaction>
      </div>
    </div>

    <div v-if="$device.isDesktop" class="between-call-to-action-and-footer" />
    <NewsletterModal
      :loading="loading"
      @email-submitted="onSubscribe"
    />
  </div>
</template>

<script>
import { SfCallToAction, SfLoader} from '@storefront-ui/vue';
import { computed } from '@vue/composition-api';
import { productGetters, useFacet, facetGetters, useNewsLetter } from '@vue-storefront/odoo';
import { onSSR } from '@vue-storefront/core';
import { useUiState } from '~/composables';
import { useUiNotification } from '~/composables';
import { useCache, CacheTagPrefix } from '@vue-storefront/cache';
import NewsletterModal from '~/components/NewsletterModal.vue';
import GreenImage from '~/components/core/atoms/GreenImage.vue';

export default {
  components: {
    NewsletterModal,
    SfCallToAction,
    SfLoader,
    GreenImage
  },
  setup(props, { root }) {
    const { addTags } = useCache();
    const { result, search, loading: productsLoading } = useFacet();
    const { toggleNewsletterModal } = useUiState();
    const { loading, sendSubscription } = useNewsLetter();
    const { send } = useUiNotification();
    const products = computed(() => facetGetters.getProducts(result.value));
    const mobileOrTabletSize = computed(() => root.$breakpoints.sMd);

    const customQueryProducts = {
      getProductTemplatesList: 'greenGetProductListFormHomePage'
    };

    onSSR(async () => {
      const params = { filter: { hero: true }, customQueryProducts };

      await search(params);

      addTags([{ prefix: CacheTagPrefix.View, value: 'Home' }]);
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
      mobileOrTabletSize,
      productsLoading,
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
@import '~/assets/css/home/index.scss';
</style>
