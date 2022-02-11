<template>
  <SfHeader>
      <template #navigation>
        <div class="grid grid-cols-3 auto-cols-min header-links">
          <SfHeaderNavigationItem
            v-for="(category, index) in sbCategories"
            :key="index"
            data-cy="app-header-top-categories"
            class="nav-item"
            :label="category.name"
            :link="localePath(`/c/${category.slug}/${category.id}`)"
          />
        </div>
      </template>
  </SfHeader>
</template>

<script>
import { SfHeader } from '@storefront-ui/vue';
export default {
  components: {
    SfHeader
  },
  data() {
      return {
      sbCategories: [
          {   name: "IPHONES"},
          {   name: "SMARTPHONES"},
          {   name: "TABLETS"},
          {   name: "COMPUTERE"},
          {   name: "ANDRE PRODUKTER"},
          {   name: "TILBEHØR"}
          ]
      }
  }
}
</script>

<style scoped>
::v-deep .sf-search-bar{
    display: none;
}
::v-deep .sf-header__icons{
    display: none;
}
</style>