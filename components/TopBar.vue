<template>
  <SfTopBar class="topbar">
    <template #center>
      <!--<SfButton>{{ $t("See Offer") }}</SfButton>-->
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
  border-bottom: 1px solid #fff;
  font-weight: 500;
  font-size: 14px;
}
::v-deep .sf-button:active {
  text-decoration: none;
}
</style>
