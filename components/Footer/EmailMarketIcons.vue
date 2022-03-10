<template>
  <div>
    <SfImage
      class="footer__social-image"
      :src="require('/assets/images/footer/emarket.svg')"
      alt="emarket"
      :width="size"
      :height="size"
    />
    <SfImage
      class="footer__social-image"
      :src="require('/assets/images/footer/emarket.svg')"
      alt="emarket"
      :width="size"
      :height="size"
    />
    <SfImage
      class="footer__social-image"
      :src="require('/assets/images/footer/emarket.svg')"
      alt="emarket"
      :width="size"
      :height="size"
    />
  </div>
</template>

<script lang="ts">
import { SfImage } from '@storefront-ui/vue';
import { defineComponent, computed } from '@vue/composition-api';

export default defineComponent({
  components: {
    SfImage
  },
  setup({}, {root}) {
    const size = computed(() => root.$device.isDesktop ? 58 : 33);

    return {
      size
    };
  }
});
</script>
