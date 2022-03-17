<template>
  <div>
    <div class="layout">
      <SfHero class="top-hero">
        <SfHeroItem
          title="Colorful summer dresses are already in store"
          class="top-hero"
          button-text="SE MERE3"
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

    <div
      style="height: 144px;"
      class="div-call-to-hero-bottom"
    >
      <SfCallToAction>
        <template #title>
          <SfImage
            width="437"
            height="240"
            :src="require('/assets/images/homeHero/samsung_phones.svg')"
            alt="samsumg"
          />
          <div class="title-subtitle">
            <h2 class="sf-call-to-action__title">
              Subscribe to Newsletters
            </h2> <p class="sf-call-to-action__description display-none" />
            <p class="sf-call-to-action__description">
              Be aware of upcoming sales and events. Receive gifts and special offers!
            </p>
          </div>
          <div class="div-button">
            <GreenButton
              class="sf-button-call-to-action"
              type="Primary"
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

::v-deep .sf-call-to-action__text-container{
  flex-direction: row;
  gap: 6%;
  --call-to-action-text-container-width: 100%;
  justify-content: center;
}

.title-subtitle {
  min-width: 411px;
}

::v-deep .sf-call-to-action .sf-image--wrapper{
  transform: translate(0, -51.5%);
  min-width: 393px;;
}
::v-deep .sf-call-to-action {
  --call-to-action-height: 9.625rem;
  --call-to-action-flex-direction: unset;
  --call-to-action-padding: 2%;
  background-color  : #7ba393;
}

@media (max-width: 1024px) {
 ::v-deep .sf-call-to-action__text-container {
    flex-direction: column;
    align-items: center;
    height: 324px;
  }
  .title-subtitle {
    transform: translate(0, -35%);
  }

  .div-button{
    transform: translate(0, -145%);
  }
  ::v-deep .sf-call-to-action__text-container .sf-image--wrapper {
    transform: translate(0, -8%);
  }
  ::v-deep .sf-call-to-action {
    margin: 2%;
    border-radius: 14px;
    transform: translate(0, -68%);
  }

  ::v-deep .sf-call-to-action__description{
    font-size: 16px;
    line-height: 20px;
    padding: 0 20% 0 20%;
  }

}

.div-call-to-hero-bottom {
  height: 144px;
  background-color: #F3F3F3;
}

::v-deep .sf-call-to-action__title {
  line-height: 35px;
  font-weight: 700;
  font-size: 34px;
    @include for-mobile {
      line-height: 26px;
      font-size: 24px;
      text-align: center;
  }
}
::v-deep .sf-call-to-action__description {
  font-family: var(--font-family--primary);
  font-weight: 400;
  line-height: 22px;
  font-size: 18px;
  color: #ffffff;
  @include for-mobile {
      text-align: center;
  }
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
