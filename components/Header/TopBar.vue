<template>
  <SfTopBar class="topbar">
    <template #center>
      <nuxt-link
        :to="{ name: 'discountCampaign' }"
        class="underline text-center y-link sf-button"
        title="SE AKTIVE KAMPAGNER"
      >
        SE AKTIVE KAMPAGNER
      </nuxt-link>
    </template>
  </SfTopBar>
</template>

<script>
import { SfButton, SfTopBar } from '@storefront-ui/vue';

export default {
  components: {
    SfTopBar,
    SfButton
  }
};
</script>
<style lang="scss" scoped>
.topbar {
  position: relative;
  z-index: 2;
  background: #32463d;
  color: #fff;
  &__button {
    margin: 0 0 0 var(--spacer-xs);
  }
}

::v-deep .sf-button {
  padding: 0;
  background: transparent;
  font-weight: 500;
  font-size: 14px;
  cursor: unset;
}
::v-deep .sf-button:active {
  text-decoration: none;
}
</style>
