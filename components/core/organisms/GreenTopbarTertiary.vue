<template>
  <SfHeader>
    <template #header-icons>
      <div />
    </template>

    <template #search>
      <div />
    </template>

    <template #navigation>
      <div @mouseleave="toggleActive(false)">
        <div class="header-links">
          <div
            v-for="(category, index) in parentCategories"
            :key="index"
            class="dropdown-wrap"
            @mouseenter="toggleActive(true)"
          >
            <SfHeaderNavigationItem
              :label="category.name"
              :link="localePath(`/c/${category.slug}/${category.id}`)"
            />
          </div>
        </div>
        <div class="dropdown">
          <SfMegaMenu
            title="Man"
            :visible="true"
          >
            <SfMegaMenuColumn
              v-for="(child, indexChildCategories) in childCategories"
              :key="indexChildCategories"
            >
              <template #title>
                <nuxt-link
                  class="parent-menu-title"
                  to=""
                >
                  {{ child.name }}
                </nuxt-link>
              </template>
              <SfList class="mt-3">
                <SfListItem
                  v-for="(link, indexLink) in child.links"
                  :key="indexLink"
                >
                  <SfMenuItem
                    :label="link.name"
                    :link="`/c/${link.url}`"
                  />
                </SfListItem>
              </SfList>
            </SfMegaMenuColumn>
          </SfMegaMenu>
        </div>
      </div>
    </template>
  </SfHeader>
</template>

<script>
import { defineComponent, computed } from '@nuxtjs/composition-api';
import { SfHeader, SfList, SfMegaMenu, SfMenuItem } from '@storefront-ui/vue';
import { onSSR } from '@vue-storefront/core';
import { useCart, useCategory, useUser, useWishlist } from '@vue-storefront/odoo';
import { useUiStyleState } from '~/composables';

export default defineComponent({
  components: {
    SfHeader,
    SfMegaMenu,
    SfList,
    SfMenuItem
  },
  setup () {
    const { load: loadCart } = useCart();
    const { load: loadUser } = useUser();
    const { load: loadWishlist } = useWishlist();

    const { active, toggleActive } = useUiStyleState('mega-menu');
    const { categories: topCategories, search: searchTopCategoryApi } =
      useCategory('AppHeader:TopCategories');

    onSSR(async () => {
      await Promise.all([
        searchTopCategoryApi(),
        loadUser(),
        loadWishlist(),
        loadCart()
      ]);
    });

    const parentCategories = computed(() =>
      topCategories.value.filter((category) => category.childs === null)
    );

    return {
      parentCategories,
      active,
      toggleActive
    };
  },
  data() {
    return {
      childCategories: [
        {
          name: 'Samsung',
          links: [
            { name: 'Boots', url: 'boots' },
            { name: 'S20', url: 's20' },
            { name: 'Acessories', url: 'acessories' }
          ]
        },
        {
          name: 'Huawei',
          links: [
            { name: 'Boots', url: 'boots' },
            { name: 'S20', url: 's20' },
            { name: 'Acessories', url: 'acessories' }
          ] },
        {
          name: 'Sony',
          links: [
            { name: 'Boots', url: 'boots' },
            { name: 'S20', url: 's20' },
            { name: 'Acessories', url: 'acessories' }
          ] },
        {
          name: 'One Plus',
          links: [
            { name: 'Boots', url: 'boots' },
            { name: 'S20', url: 's20' },
            { name: 'Acessories', url: 'acessories' }
          ] },
        {
          name: 'Category',
          links: [
            { name: 'Boots', url: 'boots' },
            { name: 'S20', url: 's20' },
            { name: 'Acessories', url: 'acessories' }
          ] },
        {
          name: 'Category',
          links: [
            { name: 'Boots', url: 'boots' },
            { name: 'S20', url: 's20' },
            { name: 'Acessories', url: 'acessories' }
          ] },
        {
          name: 'Category',
          links: [
            { name: 'Boots', url: 'boots' },
            { name: 'S20', url: 's20' },
            { name: 'Acessories', url: 'acessories' }
          ] }
      ]
    };
  }
});
</script>

<style scoped>
@import url("~/assets/css/greenTopbarTertiary.scss");
</style>
