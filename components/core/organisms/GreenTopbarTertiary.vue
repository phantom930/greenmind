<template>
  <SfHeader>
      <template #navigation>
        <div class="header-links">
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

::v-deep .header-links {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

::v-deep .sf-header-navigation-item {
  display: block;
}

::v-deep .sf-header__navigation {
  width: 100%;
  z-index: 1;
}

::v-deep .sf-header-navigation-item__link {
  font-weight: 500;
  font-size: 14px;
  color: #1D1F22;
}
</style>
