<template>
  <div class="layout">
    <SfHero>
      <SfHeroItem
        title="Colorful summer dresses are already in store"
        button-text="SE MERE"
        background="none"
        :image="require('/assets/images/homeHero/homeHero_1.svg')"
        style="background-size: auto; background-position-y: center"
      />
      <SfHeroItem
        title="Colorful summer dresses are already in store"
        button-text="SE MERE"
        background="none"
        :image="require('/assets/images/homeHero/homeHero_1.svg')"
        style="background-size: auto; background-position-y: center"
      />
      <SfHeroItem
        title="Colorful summer dresses are already in store"
        button-text="SE MERE"
        background="none"
        :image="require('/assets/images/homeHero/homeHero_1.svg')"
        style="background-size: auto; background-position-y: center"
      />
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
      <SfLink :link="localePath(`/c/iphones`)">
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
      <SfLink :link="localePath(`/c/smartphones`)">
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
      <SfLink :link="localePath(`/c/tablets`)">
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
      <SfLink :link="localePath(`/c/computers`)">
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
    <!-- <div style="display: flex; padding-top: 5%">
      <GreenBannerVertical
        banner_title="Stand"
        banner_description="Find stunning women's cocktail dresses and party dresses. Stand out in lace and metallic cocktail dresses and party dresses from all your favorite brands."
        banner_button="SE MERE"
        background="#CABDBD"
        banner_image="banner_1"
      />
      <GreenBannerVertical
        banner_title="Stand"
        banner_description="Find stunning women's cocktail dresses and party dresses. Stand out in lace and metallic cocktail dresses and party dresses from all your favorite brands."
        banner_button="SE MERE"
        banner_image="banner_2"
        background="#D6D4D4"
        style="padding: 0 41px"
      />
      <GreenBannerVertical
        banner_title="Stand"
        banner_description="Find stunning women's cocktail dresses and party dresses. Stand out in lace and metallic cocktail dresses and party dresses from all your favorite brands."
        banner_button="SE MERE"
        banner_image="banner_3"
        background="#E0D6C9"
      />
    </div> -->
    <GreenCarousel
      :item="products"
      :feature1="storage"
      :feature2="color"
      :currency="currency"
      :carousel_title="$t('Populære produkter')"
      style="padding-top: 5%"
    />
    <div class="bottom_hero">
      <SfHero>
        <SfHeroItem
          title="Subscribe to Newsletters"
          subtitle="Be aware of upcoming sales and events. Receive gifts and special offers!"
          button-text="SE MERE"
          background="none"
          :image="require('/assets/images/homeHero/homeHero_2.svg')"
          style="
            background-size: auto;
            background-position-y: center;
            margin-top: -15%;
          "
        />
      </SfHero>
    </div>
    <NewsletterModal @email-submitted="onSubscribe" />
  </div>
</template>

<script>
import {
  SfHero,
  SfBanner,
  SfButton,
  SfImage,
  SfLink
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
import { useUiNotification } from '~/composables';

export default {
  components: {
    NewsletterModal,
    SfHero,
    SfBanner,
    SfButton,
    SfImage,
    SfLink
  },
  setup(props, { root }) {
    const { result, search } = useFacet();
    const { params } = root.$router.history.current;
    const products = computed(() => facetGetters.getProducts(result.value).slice(0, 10));
    const { toggleNewsletterModal } = useUiState();
    const { sendSubscription } = useNewsLetter();
    const { send } = useUiNotification();

    onSSR(async () => {
      await search(params);
    });

    const onSubscribe = (emailAddress) => {
      const data = sendSubscription({ email: emailAddress });
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
::v-deep .sf-hero {
  height: 480px;
  margin-top: -75px;
}
::v-deep .sf-hero-item__title {
  font: var(--font-family--primary);
  color: #ffffff;
  font-size: 46px;
  font-weight: 700;
  line-height: 48px;
  width: 125%;
  margin-top: 0;
}
::v-deep .sf-hero-item__button .sf-button {
  border-radius: 40px;
  --button-background: #f1f2f3;
  --button-color: #72757e;
  font-family: "Josefin Sans", sans-serif;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  padding: 18px 52px;
  padding-top: 20px;
  transform: translate(0%, -50%);
}
::v-deep .sf-hero-item__button .sf-button:hover {
  --button-background: #e0e0e1;
  --button-box-shadow-opacity: 0.25;
  --button-background: #e0e0e1
    radial-gradient(circle, transparent 1%, #e0e0e1 1%) center/15000%;
}
::v-deep .sf-hero-item__button .sf-button:active {
  --button-box-shadow: none;
  --button-background: #f1f2f3
    radial-gradient(circle, transparent 40%, #e0e0e1 1%) center/15000%;
  --button-transition: background 0s;
  --button-text-decoration: underline;
  background-size: 100%;
}
::v-deep .sf-hero__bullets {
  transform: translate3d(-50%, -55px, 0);
  --bullet-background: #a5cebe;
}
::v-deep .sf-bullet.is-active {
  --bullet-background: #32463d;
}
::v-deep .sf-hero__control--left {
  display: none;
}
::v-deep .sf-hero__control--right {
  display: none;
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
