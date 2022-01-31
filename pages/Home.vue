<template>
  <div>
    <h2>Comming soon</h2>
    <!-- <GreenFooter /> -->
    <!-- <GreenEmailForm /> -->
    <!-- <GreenPrimaryButton :buttonPlaceholder="$t('SE FLERE')"/> -->
    <!-- <GreenCarousel
    :item="item"
    :feature1="storage"
    :feature2="color"
    :price="price"
    :currency="currency"
    /> -->
    <!-- <GreenBannerVertical
    banner_title="Stand"
    banner_description="Find stunning women's cocktail dresses and party dresses. Stand out in lace and metallic cocktail dresses and party dresses from all your favorite brands."
    banner_button="SE MERE"
    banner_image="banner_1"
    /> -->
    <SfBreadcrumbs 
    :breadcrumbs= breadcrumb
    />
    <SfButton />
    <br>
    <br>
    <br>
  </div>
</template>

<script>
import { SfBreadcrumbs, SfButton } from '@storefront-ui/vue'
export default {
  components: {
    SfBreadcrumbs,
    SfButton
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