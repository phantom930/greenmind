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
    <GreenBannerVertical
    banner_title="Stand"
    banner_description="Find stunning women's cocktail dresses and party dresses. Stand out in lace and metallic cocktail dresses and party dresses from all your favorite brands."
    banner_button="SE MERE"
    banner_image="banner_1"
    />
    <br>
    <br>
    <br>
  </div>
</template>

<script>
export default {
  data() {
    return {
        item: ["iPhone8", "iPhone13", "iPhone8", "iPhone8", "iPhone8"],
        storage: ["128 Gb","128 Gb","128 Gb","128 Gb","128 Gb"],
        color: ["Gold", "Red", "Silver", "Black", "Gold"],
        price: ["2,999", "2,999", "2,999", "2,999", "2,999",],
        currency: ["$"]
    }
  }
}
</script>