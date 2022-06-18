<template>
  <SfHero class="top-hero mt-1.5">
    <nuxt-link :to="{ name: 'home' }" :title="$t('Home')">
      <SfHeroItem
        class="top-hero-item"
        :image="require(`/assets/images/homeHero/homeHero_1.webp`)"
      />
    </nuxt-link>
    <nuxt-link :to="{ name: 'how-to-sell' }" :title="$t('How do you sell?')">
      <SfHeroItem
        class="top-hero-item"
        :image="require('/assets/images/homeHero/homeHero_2.webp')"
      />
    </nuxt-link>
    <nuxt-link :to="{ name: 'reparation'}" :title="$t('Reparation')">
      <SfHeroItem
        class="top-hero-item"
        :image="require('/assets/images/homeHero/homeHero_3.webp')"
      />
    </nuxt-link>
    <nuxt-link :to="{ name: 'home'}" :title="$t('Home')">
      <SfHeroItem
        class="top-hero-item"
        :image="require('/assets/images/homeHero/homeHero_4.webp')"
      />
    </nuxt-link>
  </SfHero>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { computed } from '@nuxtjs/composition-api';
import { SfHero } from '@storefront-ui/vue';
export default defineComponent({
  components: {
    SfHero
  },
  setup(props, { root }) {
    const getSufixSize = computed(() => {
      if (root.$breakpoints.sLg) return '_768';

      if (root.$breakpoints.sMd) return '_576';

      if (root.$breakpoints.sSm) return '_384';

      return '';
    });

    return {
      getSufixSize
    };
  }
});
</script>
<style scoped lang="scss">
::v-deep .glide__slides, ::v-deep .glide__track{
  @include for-mobile {
    overflow: visible !important;
  }

}
::v-deep .sf-image--wrapper {
  bottom: 30px;
  left: 54%;
  position: absolute;
  & img{
    z-index: 10;
    position: relative;
    object-fit: contain;
  }
}
::v-deep .sf-hero__bullets {
  @include for-mobile {
    display: none;;
  }
}

::v-deep .nuxt-link-active {
  width: 100%;
}
@media (min-width: 1024px) {

  ::v-deep .top-hero-item {
    object-fit: contain;
    background-position: center;
    border-radius: 10px;
    max-width: 100%;
    max-height: 250px;
    height: auto;
    margin-bottom: 3%;
  }
}

@media (min-width: 768px) and (max-width: 1024px){
    .top-hero {
      max-height: 16rem;
    }

    ::v-deep .top-hero-item {
      background-position-y: 10px;
      background-size: contain;
      border-radius: 10px;
      max-width: 100%;
      width: auto\9;
      margin-bottom: 2%;
    }
}

@media (min-width: 577px) and (max-width: 767px){
  .top-hero {
    max-height: 11.5rem;
  }
  ::v-deep .top-hero-item {
    background-position-y: 13px;
    background-position-y: 10px;
    background-size: contain;
  }
}

@media (max-width: 576px) {
  .top-hero {
    max-height: 8.5rem;
  }
  ::v-deep .top-hero-item {
    background-position-y: 13px;
    background-position-y: 10px;
    background-size: contain;
  }
}

@media (max-width: 400px) {
  .top-hero {
    max-height: 6.5rem;
  }
  ::v-deep .top-hero-item {
    background-position-y: 13px;
    background-position-y: 10px;
    background-size: contain;
  }
}

</style>
