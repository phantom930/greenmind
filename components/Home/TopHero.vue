<template>
  <SfHero class="top-hero mt-1.5">
    <!-- <nuxt-link :to="{ name: 'home' }" :title="$t('Home')">
      <SfHeroItem
        class="top-hero-item"
        :image="require(`/assets/images/homeHero/homeHero_red.webp`)"
      />
    </nuxt-link> -->
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
@import '~/assets/css/home/topHero.scss'
</style>
