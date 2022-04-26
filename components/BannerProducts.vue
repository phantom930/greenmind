<template>
  <div class="usp_banner_products flex">
    <div class="grid usp-div">
      <SfImage
        :src="require('/assets/images/productsUspBanner/banner_1.svg')"
        :width="63"
        :height="71"
        alt="Vue Storefront Next"
        style="margin-left: auto; margin-right: auto"
      />
      <span class="usp_text_product">Produkter er testet af egne eksperter</span>
    </div>
    <div class="grid usp-div">
      <SfImage
        :src="require('/assets/images/productsUspBanner/banner_2.svg')"
        :width="63"
        :height="71"
        alt="Vue Storefront Next"
        style="margin-left: auto; margin-right: auto"
      />
      <span class="usp_text_product">14 dages returret <br>2 års garanti</span>
    </div>
    <div class="grid usp-div">
      <SfImage
        :src="require('/assets/images/productsUspBanner/banner_3.svg')"
        :width="63"
        :height="71"
        alt="Vue Storefront Next"
        style="margin-left: auto; margin-right: auto"
      />
      <span class="usp_text_product">Ombyt i én af vores<br>10 butikker</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { SfImage } from '@storefront-ui/vue';
export default defineComponent({
  components: {
    SfImage
  },
  setup() {

  }
});
</script>
<style scoped lang="scss">
  .usp_banner_products {
    height: 120px;
    width: 531px;
    border-radius: 10px;
    background-color: #f3f3f3;
    margin-top: 7%;
    @include for-mobile {
      width: 100%;
      justify-content: center;
    }
  }

  .usp_text_product {
    width: 122px;
    font-family: var(--font-family--primary);
    font-size: 12px;
    font-weight: 500;
    line-height: 16px;
    text-align: center;
    @include for-mobile {
    }
  }

  .usp-div {
    padding-left: 8%;
    @include for-mobile {
      padding-left: 0;
    }
  }
</style>
