<template>
  <component
    :is="$device.isMobile ? 'SfCarousel' : 'div'"
    class="category_card flex"
    :settings="settings"
  >
    <nuxt-link to="/telefoner/iphones" class="hover:shadow rounded-md mr-1">
      <GreenImage
        :src="require('/assets/images/categoryCards/homeCategoryCard2_1.webp')"
        alt="iPhones"
        :title="$t('iPhones')"
        :width="295"
        :height="295"
        class="categoryCardImage"
      />
      <p class="text-center">
        {{ $t('iPhones') }}
      </p>
    </nuxt-link>

    <nuxt-link to="/telefoner/smartphones" class="hover:shadow rounded-md mr-1">
      <GreenImage
        :src="require('/assets/images/categoryCards/homeCategoryCard2_2.webp')"
        alt="Smartphones"
        :width="295"
        :title="$t('Smartphones')"
        :height="295"
        class="categoryCardImage"
      />
      <p class="text-center">
        {{ $t('Smartphones') }}
      </p>
    </nuxt-link>
    <nuxt-link to="/tablets" class="hover:shadow rounded-md mr-1">
      <GreenImage
        :src="require('/assets/images/categoryCards/homeCategoryCard2_3.webp')"
        alt="Tablets"
        :width="295"
        :title="$t('Tablets')"
        :height="295"
        class="categoryCardImage"
      />
      <p class="text-center">
        {{ $t('Tablets') }}
      </p>
    </nuxt-link>
    <nuxt-link to="/computere" class="hover:shadow rounded-md">
      <GreenImage
        :src="require('/assets/images/categoryCards/homeCategoryCard2_4.webp')"
        alt="Computers"
        :title="$t('Computers')"
        :width="295"
        :height="295"
        class="categoryCardImage"
      />
      <p class="text-center">
        {{ $t('Computers') }}
      </p>
    </nuxt-link>
  </component>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { SfCarousel } from '@storefront-ui/vue';
import GreenImage from '../core/atoms/GreenImage.vue';

export default defineComponent({
  components: {
    SfCarousel,
    GreenImage
  },
  setup() {
    const settings = {
      type: 'carousel',
      rewind: false,
      perView: 4,
      slidePerPage: true,
      gap: 19,
      peek: {
        before: 0,
        after: 0
      },
      breakpoints: {
        gap: 15,
        1023: {
          perView: 2
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
@include for-mobile {
  ::v-deep .sf-carousel__wrapper {
    margin: 0;
    max-width: 100%;
  }
}
</style>
