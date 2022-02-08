<template>
  <div>
    <!-- <GreenFooter /> -->
    <!-- <GreenEmailForm /> -->
    <!-- <GreenPrimaryButton :buttonPlaceholder="$t('SE FLERE')"/> -->
    <SfHero>
      <SfHeroItem
      title="Colorful summer dresses are already in store"
      buttonText="SE MERE"
      background="none"
      :image="require('/assets/images/homeHero/homeHero_1.svg')"
      style="background-size: auto; background-position-y: center;"
      />
      <SfHeroItem
      title="Colorful summer dresses are already in store"
      buttonText="SE MERE"
      background="none"
      :image="require('/assets/images/homeHero/homeHero_1.svg')"
      style="background-size: auto; background-position-y: center;"
      />
      <SfHeroItem
      title="Colorful summer dresses are already in store"
      buttonText="SE MERE"
      background="none"
      :image="require('/assets/images/homeHero/homeHero_1.svg')"
      style="background-size: auto; background-position-y: center;"
      />
    </SfHero>
    <div style="display: flex">
      <GreenBannerVertical
      banner_title="Stand"
      banner_description="Find stunning women's cocktail dresses and party dresses. Stand out in lace and metallic cocktail dresses and party dresses from all your favorite brands."
      banner_button="SE MERE"
      background= "#CABDBD"
      banner_image="banner_1"
      />
      <GreenBannerVertical
      banner_title="Stand"
      banner_description="Find stunning women's cocktail dresses and party dresses. Stand out in lace and metallic cocktail dresses and party dresses from all your favorite brands."
      banner_button="SE MERE"
      banner_image="banner_2"
      background= "#D6D4D4"
      style="padding: 0 32px;"
      />
      <GreenBannerVertical
      banner_title="Stand"
      banner_description="Find stunning women's cocktail dresses and party dresses. Stand out in lace and metallic cocktail dresses and party dresses from all your favorite brands."
      banner_button="SE MERE"
      banner_image="banner_3"
      background= "#E0D6C9"
      />
    </div>
    <GreenCarousel
    :item="item"
    :feature1="storage"
    :feature2="color"
    :price="price"
    :currency="currency"
    :carousel_title="$t('Populære produkter')"
    />
    <!-- <SfBreadcrumbs 
    :breadcrumbs= breadcrumb
    /> -->
    <br>
    <br>
    <br>
  </div>
</template>

<script>
import { SfBreadcrumbs, SfButton, SfHero } from '@storefront-ui/vue'
export default {
  components: {
    SfBreadcrumbs,
    SfButton,
    SfHero
  },
  data() {
    return {
        item: ["iPhone8", "iPhone13", "iPhone8", "iPhone8", "iPhone8"],
        storage: ["128 Gb","128 Gb","128 Gb","128 Gb","128 Gb"],
        color: ["Gold", "Red", "Silver", "Black", "Gold"],
        price: ["2,999", "2,999", "2,999", "2,999", "2,999",],
        currency: ["$"],
        breadcrumb: [
        {
          "text": "Home",
          "link": "#"
        },
        {
          "text": "Category",
          "link": "#"
        },
        {
          "text": "Pants",
          "link": "#"
        }
      ]
    }
  }
}
</script>

<style lang="scss">
:root {
  --font-family--primary: "Josefin Sans";
  @include generate-color-variants(--_c-green-primary, #7BA393);
  @include assign-color-variants(--c-primary, --_c-green-primary);
  @include assign-color-variants(--c-secondary, --_c-green-secondary); 
}
</style>

<style lang="scss" scoped>
::v-deep .sf-hero {
  height: 480px;
  margin-top: -75px;
}
::v-deep .sf-hero-item__title{
  font: var(--font-family--primary);
  color: #FFFFFF;
  font-size: 46px;
  font-weight: 700;
  line-height: 48px;
  width: 125%;
  margin-top: 0;
}
::v-deep .sf-hero-item__button .sf-button {
    border-radius: 40px;
    --button-background: #32463D;
    font-family: 'Josefin Sans', sans-serif;
    font-size: 14px;
    font-weight: 500;
    text-decoration: none;
    padding: 18px 52px;
    transform: translate(0%, -50%);
}
::v-deep .sf-hero-item__button .sf-button:hover{
    --button-background: #78A886;
    --button-box-shadow-opacity: 0.25;
    --button-background: #78A886 radial-gradient(circle, transparent 1%, #32463D 1%) center/15000%;
}
::v-deep .sf-hero-item__button .sf-button:active {
    --button-box-shadow: none;
    --button-background: #32463D radial-gradient(circle, transparent 40%, #78A886 1%) center/15000%;
    --button-transition: background 0s ;
    --button-text-decoration: underline;
  background-size: 100%;
}
::v-deep .sf-hero__bullets {
  transform: translate3d(-50%, -55px, 0);
  --bullet-background: #A5CEBE;
}
::v-deep .sf-bullet.is-active {
  --bullet-background: #32463D;
}
::v-deep .sf-hero__control--left {
  display: none;
}
::v-deep .sf-hero__control--right {
  display: none;
}
</style>