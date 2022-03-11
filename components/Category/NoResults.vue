<template>
  <div
    class="text-center mt-20"
    style="min-height: 400px;"
  >
    <SfImage
      :width="256"
      :height="176"
      src="/error/error.svg"
      class="before-results__picture"
      alt="error"
      loading="lazy"
    />
    <p class="before-results__paragraph">
      {{ $t("Sorry, we didnt find what youre looking for") }}
    </p>
    <SfButton
      class="before-results__button color-secondary smartphone-only"
      @click="$emit('close')"
    >
      {{ $t("Go back") }}
    </SfButton>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
import { SfImage, SfButton } from '@storefront-ui/vue';
export default defineComponent({
  components: {
    SfImage, SfButton
  },
  setup() {

  }
});
</script>
<style scoped lang="scss">

</style>
