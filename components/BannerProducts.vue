<template>
  <div>
    <SfImage
      :src="require('/assets/images/productsUspBanner/banner_mobile_1.webp')"
      :width="531"
      :height="120"
      alt="Banner Mobile"
      class="usp_banner_products"
    />
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

  ::v-deep .usp_banner_products .sf-image{
    min-width: 100%;
    min-height: 100%;
    margin-left: auto;
    margin-right: auto;
    border-radius: 10px;
    margin-top: 7%;
    /* --- Resize according size of screen --- */
    max-width: 100%;
    height: auto;
    width: auto\9;
    @include for-mobile {
      justify-content: center;
    }
    
  }

</style>
