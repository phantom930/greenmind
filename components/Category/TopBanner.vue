<template>
  <div>
    <SfImage
      image-tag="nuxt-img"
      src="/homepage/banner_desktop_1.webp"
      :width="2000"
      :height="250"

      class="usp_banner_products"
      alt="Banner Desktop"
    />
    <!--<div class="flex items-center gap-10">
      <SfImage
        :src="require('/assets/images/productsUspBanner/banner_1.svg')"
        :width="iconWidth"
        :height="iconHeight"
        :nuxt-img-config="{ fit: 'cover' }"
        alt="Vue Storefront Next"
      />
      <span class="usp_text_product">Produkter er testet af egne eksperter</span>
    </div>
    <div class="flex items-center gap-10">
      <SfImage
        :src="require('/assets/images/productsUspBanner/banner_2.svg')"
        :width="iconWidth"
        :height="iconHeight"
        :nuxt-img-config="{ fit: 'cover' }"
        alt="Vue Storefront Next"
      />
      <span class="usp_text_product">14 dages returret <br>2 års garanti</span>
    </div>
    <div class="flex items-center gap-10">
      <SfImage
        :src="require('/assets/images/productsUspBanner/banner_3.svg')"
        :width="iconWidth"
        :height="iconHeight"
        :nuxt-img-config="{ fit: 'cover' }"
        alt="Vue Storefront Next"
        style="margin-left: auto; margin-right: auto"
      />
      <span class="usp_text_product">Ombyt i én af vores<br>10 butikker</span>
    </div>-->
  </div>
</template>

<script lang="ts">
import { SfImage } from '@storefront-ui/vue';
import { computed, defineComponent } from '@nuxtjs/composition-api';
export default defineComponent({
  components: { SfImage },
  setup(_, { root }) {
    const iconWidth = computed(() => root.$device.isMobile ? 50 : 74);
    const iconHeight = computed(() => root.$device.isMobile ? 52 : 69);

    return {
      iconWidth,
      iconHeight
    };
  }
});
</script>

<style scoped lang="scss">

::v-deep .usp_banner_products .sf-image{
  border-radius: 10px;
  /* --- Resize according size of screen --- */
  max-width: 100%;
  height: auto;
  width: auto\9;
}
 ::v-deep .usp_banner_products  {
    display: flex;
    justify-content: center;
    & .sf-image--placeholder {
      text-align: center;
      width: 200px;
      height: 200px;
    }
  }
/*.usp_banner_products {
  height: 200px;
  border-radius: 10px;
  margin-bottom: 3%;
  @include for-mobile {
    height: 120px;
    margin: 3% 3% 0 3%;
    padding: 1% 4%;
    justify-content: space-between !important;
  }
}*/
/*.usp_banner_products div{
  @include for-mobile {
    flex-direction: column;
    gap: 0 !important;
  }
}*/

/*.usp_text_product {
  width: 166px;
  font-family: var(--font-family--primary);
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  @include for-mobile {
    width: 98px;
    font-size: 12px;
    text-align: center;
  }
}*/
</style>
