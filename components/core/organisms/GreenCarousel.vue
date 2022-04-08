<template>
  <div>
    <SfHeading
      class="pt-14 mb-12 carousel-heading"
      :title="title"
      :level="2"
    />

    <SfCarousel
      :style="{ maxWidth: '1312px', margin: 'auto' }"
      :settings="{
        type: 'carousel',
        rewind: true,
        perView: 4,
        slidePerPage: true,
        gap: 19,
        breakpoints: {
          1279: {
            perView: 2,
            peek: {
              before: 0,
              after: 50,
            },
          },
        },
      }"
    >
      <SfCarouselItem
        v-for="(product, i) in products"
        :key="i"
        class="hover:drop-shadow-xl"
      >
        <SfLink
          :link="
            localePath(
              `/p/${productGetters.getId(product)}`
            )
          "
        >
          <LazyGreenProductCard
            :product="product"
            :image-width="biggerThanSmall ? 216 : 125"
            :image-height="biggerThanSmall ? 326 : 171"
          />
        </SfLink>
      </SfCarouselItem>
    </SfCarousel>
  </div>
</template>

<script>
import { SfCarousel, SfLink, SfHeading } from '@storefront-ui/vue';
import { productGetters } from '@vue-storefront/odoo';
import { defineComponent } from '@vue/composition-api';
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';

export default defineComponent({
  components: {
    SfCarousel,
    SfLink,
    SfHeading
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    products: {
      type: Array,
      default() {
        return [''];
      }
    },
    feature1: {
      type: Array,
      default() {
        return [''];
      }
    },
    feature2: {
      type: Array,
      default() {
        return [''];
      }
    },
    currency: {
      type: [String, Array],
      default: ''
    },
    carouselTitle: {
      type: String,
      default: ''
    }
  },
  setup() {
    const breakpoints = useBreakpoints(breakpointsTailwind);

    const biggerThanSmall = breakpoints.greater('sm');

    return {
      biggerThanSmall,
      productGetters
    };
  }
});
</script>

<style lang="scss" scoped>

::v-deep .carousel-heading .sf-heading__title {
  font: var(--font-family--primary);
  font-size: 34px;
  font-weight: 700;
  line-height: 35px;
}

::v-deep .sf-link {
  border-radius: 14px;
}

::v-deep .sf-carousel__wrapper {
  padding-bottom: 10px;
}

::v-deep .sf-arrow.sf-button {
  left: 55px
}

::v-deep .sf-arrow, .carousel-prev-button, .carousel-next-button {
  border-radius: 50%;
}

::v-deep .sf-arrow:hover, ::v-deep .sf-arrow:active {
  background-color: var(--_c-greenmind-fern-secondary-medium-green);
  color: white !important;
  --button-background: white;
}

::v-deep .sf-arrow--right.sf-arrow.sf-button {
  left: -55px
}

::v-deep .sf-product-card {
  width: 256px !important;
  height: 493px !important;
}

</style>
