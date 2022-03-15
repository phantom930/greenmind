<template>
  <div>
    <div class="layout">
      <SfHero class="top-hero">
        <SfHeroItem
          title="Colorful summer dresses are already in store"
          class="top-hero"
          background="none"
          :image="require('/assets/images/homeHero/homeHero_1.svg')"
          style="background-size: auto; background-position-y: center"
        >
          <template #call-to-action>
            <GreenButton
              type="Tertiary"
              color="Grey"
            >
              {{ $t('See More') }}
            </GreenButton>
          </template>
        </SfHeroItem>

        <SfHeroItem
          title="Colorful summer dresses are already in store"
          button-text="SE MERE2"
          class="top-hero"
          background="none"
          :image="require('/assets/images/homeHero/homeHero_1.svg')"
          style="background-size: auto; background-position-y: center"
        >
          <template #call-to-action>
            <GreenButton
              type="Tertiary"
              color="Grey"
            >
              {{ $t('See More') }}
            </GreenButton>
          </template>
        </SfHeroItem>

        <SfHeroItem
          title="Colorful summer dresses are already in store"
          button-text="SE MERE"
          class="top-hero"
          background="none"
          :image="require('/assets/images/homeHero/homeHero_1.svg')"
          style="background-size: auto; background-position-y: center"
        >
          <template #call-to-action>
            <GreenButton
              type="Tertiary"
              color="Grey"
            >
              {{ $t('See More') }}
            </GreenButton>
          </template>
        </SfHeroItem>
      </SfHero>

      <SfBanner
        title=""
        subtitle=""
        description=""
        button-text=""
        background=""
        :image="require('/assets/images/homeUspBanner/banner_1.svg')"
        style="
        background-size: auto;
        background-position-y: center;
        margin-top: -10%;
      "
      />
      <div
        style="display: flex"
        class="category_card"
      >
        <SfLink :link="localePath(`/c/iphones/3`)">
          <SfButton style="display: initial; background: none; border-radius: 14px">
            <SfImage
              :src="require('/assets/images/categoryCards/homeCategoryCard_1.svg')"
              alt="iPhones"
              :width="295"
              :height="223"
              class="categoryCardImage"
            />
            <p style="color: #000">
              iPhones
            </p>
          </SfButton>
        </SfLink>
        <SfLink :link="localePath(`/c/smartphones/1`)">
          <SfButton style="display: initial; background: none; border-radius: 14px">
            <SfImage
              :src="require('/assets/images/categoryCards/homeCategoryCard_2.svg')"
              alt="iPhones"
              :width="295"
              :height="223"
              class="categoryCardImage"
            />
            <p style="color: #000">
              Smartphones
            </p>
          </SfButton>
        </SfLink>
        <SfLink :link="localePath(`/c/tablets/96`)">
          <SfButton style="display: initial; background: none; border-radius: 14px">
            <SfImage
              :src="require('/assets/images/categoryCards/homeCategoryCard_3.svg')"
              alt="iPhones"
              :width="295"
              :height="223"
              class="categoryCardImage"
            />
            <p style="color: #000">
              Tablets
            </p>
          </SfButton>
        </SfLink>
        <SfLink :link="localePath(`/c/computers/99`)">
          <SfButton style="display: initial; background: none; border-radius: 14px;">
            <SfImage
              :src="require('/assets/images/categoryCards/homeCategoryCard_4.svg')"
              alt="iPhones"
              :width="295"
              :height="223"
              class="categoryCardImage"
            />
            <p style="color: #000">
              Computers
            </p>
          </SfButton>
        </SfLink>
      </div>
    </div>
    <div class="div-popular-products mt-20 ">
      <GreenCarousel
        :title="$t('Popular products')"
        :products="products"
        :feature1="storage"
        :feature2="color"
        :currency="currency"
      />
    </div>

    <div>
      <SfCallToAction
        title="Subscribe to Newsletters"
        description="Be aware of upcoming sales and events. Receive gifts and special offers!"
        :image="require('/assets/images/homeHero/homeHero_2.svg')"
      >
        <template #button>
          <GreenButton
            class="sf-button-call-to-action"
            type="Primary"
            color="Green"
            shape="Round"
            @click="toggleNewsletterModal"
          >
            {{ $t('See More') }}
          </GreenButton>
        </template>
      </sfcalltoaction>
    </div>

    <div class="between-call-to-action-and-footer" />
    <NewsletterModal
      :loading="loading"
      @email-submitted="onSubscribe"
    />
  </div>
</template>

<script>
import {
  SfHero,
  SfBanner,
  SfButton,
  SfImage,
  SfLink,
  SfCallToAction
} from '@storefront-ui/vue';
import { computed } from '@vue/composition-api';
import {
  productGetters,
  useFacet,
  facetGetters,
  useNewsLetter
} from '@vue-storefront/odoo';
import { onSSR } from '@vue-storefront/core';
import { useUiState } from '~/composables';
import NewsletterModal from '~/components/NewsletterModal.vue';
import { useUiNotification, useUiHelpers } from '~/composables';

export default {
  components: {
    NewsletterModal,
    SfHero,
    SfCallToAction,
    SfBanner,
    SfButton,
    SfImage,
    SfLink

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
.div-popular-products {
  height: 702px;
  background-color: #F3F3F3;
}

.between-call-to-action-and-footer{
  background-color: #F3F3F3;
   height: 16px;
   @include for-desktop {
      height: 35px;
   }
}

::v-deep .sf-hero {
  height: 480px;
  margin-top: -75px;
}
::v-deep .bottom_hero .sf-hero-item__title {
  transform: translate(70%, 100%);
  line-height: 35px;
  font-weight: 700;
  font-size: 34px;
}
::v-deep .bottom_hero .sf-hero-item__subtitle {
  transform: translate(86%, 256%);
  font-family: var(--font-family--primary);
  font-weight: 400;
  line-height: 22px;
  font-size: 18px;
  color: #ffffff;
  text-transform: none;
}
::v-deep .bottom_hero .sf-button {
  transform: translate(550%, -20px);
}
::v-deep .top-hero .sf-hero-item__title {
  font: var(--font-family--primary);
  color: #ffffff;
  font-size: 46px;
  font-weight: 700;
  line-height: 48px;
  width: 125%;
  margin-top: 0;
}

::v-deep .top-hero .sf-hero-item__button .sf-button:hover {
  --button-background: #e0e0e1;
  --button-box-shadow-opacity: 0.25;
  --button-background: #e0e0e1
    radial-gradient(circle, transparent 1%, #e0e0e1 1%) center/15000%;
}
::v-deep .top-hero .sf-hero-item__button .sf-button:active {
  --button-box-shadow: none;
  --button-background: #f1f2f3
    radial-gradient(circle, transparent 40%, #e0e0e1 1%) center/15000%;
  --button-transition: background 0s;
  --button-text-decoration: underline;
  background-size: 100%;
}
::v-deep .top-hero .sf-hero__bullets {
  transform: translate3d(-50%, -55px, 0);
  --bullet-background: #a5cebe;
}
::v-deep .top-hero .sf-bullet.is-active {
  --bullet-background: #32463d;
}
::v-deep .top-hero .sf-hero__control--left {
  display: none;
}
::v-deep .top-hero .sf-hero__control--right {
  display: none;
}

::v-deep .sf-call-to-action {
  background-color  : #F3F3F3;
  @include for-mobile {
      background-color  : #7ba393;
   }
}

::v-deep .sf-call-to-action__title {
  transform: translate(43%, 166%);
  line-height: 35px;
  font-weight: 700;
  font-size: 34px;
}
::v-deep .sf-call-to-action__description {
  transform: translate(43%, 245%);
  font-family: var(--font-family--primary);
  font-weight: 400;
  line-height: 22px;
  font-size: 18px;
  color: #ffffff;
  text-transform: none;
}
::v-deep  .sf-button-call-to-action {
  transform: translate(0%, 77%);
}
::v-deep .bottom_hero .sf-hero {
  height: 250px;
}
::v-deep .category_card .sf-category-card__label {
  font: var(--font-family--primary);
  font-size: 20px;
  font-weight: 500;
  line-height: var(--line-height--primary);
  color: #000000;
  margin-left: auto;
  margin-right: auto;
}
::v-deep .category_card .sf-category-card__details {
  background: none;
}
::v-deep .category_card .sf-category-card {
  height: 270px;
}
::v-deep .categoryCardImage .sf-image{
  object-fit: fill
}
::v-deep .sf-link {
  --button-width: var(--button-size, var(--button-width));
  text-decoration: none;
}
</style>
