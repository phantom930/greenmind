<template>
  <component
    :is="$device.isMobile ? 'SfCarousel' : 'div'"
    class="category_card flex"
    :settings="settings"
  >
    <nuxt-link :to="localePath(`/iphones`)" class="hover:shadow rounded-md">
      <SfImage
        :src="require('/assets/images/categoryCards/homeCategoryCard_1.svg')"
        alt="iPhones"
        :width="295"
        :height="223"
        class="categoryCardImage"
      />
      <p class="text-center">
        iPhones
      </p>
    </nuxt-link>

    <nuxt-link :to="localePath(`/smartphones`)" class="hover:shadow rounded-md">
      <SfImage
        :src="require('/assets/images/categoryCards/homeCategoryCard_2.svg')"
        alt="iPhones"
        :width="295"
        :height="223"
        class="categoryCardImage"
      />
      <p class="text-center">
        Smartphones
      </p>
    </nuxt-link>
    <nuxt-link :to="localePath(`/tablets`)" class="hover:shadow rounded-md">
      <SfImage
        :src="require('/assets/images/categoryCards/homeCategoryCard_3.svg')"
        alt="iPhones"
        :width="295"
        :height="223"
        class="categoryCardImage"
      />
      <p class="text-center">
        Tablets
      </p>
    </nuxt-link>
    <nuxt-link :to="localePath(`/computere`)" class="hover:shadow rounded-md">
      <SfImage
        :src="require('/assets/images/categoryCards/homeCategoryCard_4.svg')"
        alt="iPhones"
        :width="295"
        :height="223"
        class="categoryCardImage"
      />
      <p class="text-center">
        Computers
      </p>
    </nuxt-link>
  </component>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { SfImage, SfCarousel } from '@storefront-ui/vue';

export default defineComponent({
  components: {
    SfImage, SfCarousel
  },
  setup() {
    const settings = {
      type: 'carousel',
      rewind: true,
      perView: 4,
      slidePerPage: true,
      gap: 19,
      breakpoints: {
        gap: 15,
        1279: {
          perView: 2,
          peek: {
            before: 10,
            after: 50
          }
        }
      }
    };

    return {
      settings
    };
  }
});
</script>
<style scoped lang="scss">
</style>
