<template>
  <div />
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
  },
  head: {
    script: [
      {
        src: 'https://widget.emaerket.dk/js/7e5413feebe9ed1205f0aedc91685109',
        async: true
      }
    ]
  }
});
</script>
