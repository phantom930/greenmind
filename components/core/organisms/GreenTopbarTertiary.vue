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
            v-for="(category, index) in sbCategories"
            :key="index"
            class="dropdown-wrap"
            @mouseenter="toggleActive(true)"
          >
            <nuxt-link
              to=""
              class="custom-link"
            >
              {{ category.name }}
            </nuxt-link>
          </div>
        </div>
        <div class="dropdown">
          <SfMegaMenu
            title="Man"
            :visible="active"
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
                    :link="link.url"
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
import { SfHeader, SfMegaMenu, SfList, SfMenuItem } from '@storefront-ui/vue';
import { useUiStyleState } from '~/composables';
import { defineComponent } from '@nuxtjs/composition-api';
export default defineComponent({
  components: {
    SfHeader,
    SfMegaMenu,
    SfList,
    SfMenuItem
  },
  setup () {
    const { active, toggleActive } = useUiStyleState('mega-menu');

    return {
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
      ],
      sbCategories: [
        { name: 'IPHONES'},
        { name: 'SMARTPHONES'},
        { name: 'TABLETS'},
        { name: 'COMPUTERE'},
        { name: 'ANDRE PRODUKTER'},
        { name: 'TILBEHØR'}
      ]
    };
  }
});
</script>

<style scoped>
@import url("~/assets/css/greenTopbarTertiary.scss");
</style>
