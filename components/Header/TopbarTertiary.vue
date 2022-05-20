<template>
  <SfHeader>
    <template #navigation>
      <HeaderMegaMenu />
    </template>
  </SfHeader>
</template>

<script>
import { SfHeader } from '@storefront-ui/vue';
export default {
  components: {
    SfHeader
  }
};
</script>

<style scoped lang="scss">
::v-deep .sf-header__icons{
    display: none;
}

::v-deep .sf-header__navigation {
  width: 100%;
  z-index: 1;
}

::v-deep .header-links {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
</style>
