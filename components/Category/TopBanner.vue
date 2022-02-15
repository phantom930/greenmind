<template>
  <div class="usp_banner_products flex justify-center content-center gap-1">
    <div class="flex items-center gap-10">
      <SfImage
        :src="require('/assets/images/productsUspBanner/banner_1.svg')"
        :width="74"
        :height="69"
        :nuxtImgConfig="{ fit: 'cover' }"
        alt="Vue Storefront Next"
      />
      <span class="usp_text_product"
        >Produkter er testet af egne eksperter</span
      >
    </div>
    <div class="flex items-center gap-10">
      <SfImage
        :src="require('/assets/images/productsUspBanner/banner_2.svg')"
        :width="74"
        :height="69"
        :nuxtImgConfig="{ fit: 'cover' }"
        alt="Vue Storefront Next"
      />
      <span class="usp_text_product"
        >14 dages returret <br />2 års garanti</span
      >
    </div>
    <div class="flex items-center gap-10">
      <SfImage
        :src="require('/assets/images/productsUspBanner/banner_3.svg')"
        :width="74"
        :height="69"
        :nuxtImgConfig="{ fit: 'cover' }"
        alt="Vue Storefront Next"
        style="margin-left: auto; margin-right: auto"
      />
      <span class="usp_text_product">Ombyt i én af vores<br />10 butikker</span>
    </div>
  </div>
</template>

<script>
import { SfImage } from "@storefront-ui/vue";
export default {
  components: { SfImage },
};
</script>

<style scoped lang="scss">
.usp_banner_products {
  height: 80px;
  border-radius: 10px;
  background-color: #f3f3f3;
}
.usp_text_product {
  width: 166px;
  font-family: var(--font-family--primary);
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
}
</style>