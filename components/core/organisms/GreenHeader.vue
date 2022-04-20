<template>
  <div>
    <SfHeader
      class="sf-header--has-mobile-search"
      :class="{
        'header-on-top': isSearchOpen,
      }"
    >
      <template #logo />
      <template #navigation>
        <div class="grid grid-cols-3 auto-cols-min header-links">
          <SfHeaderNavigationItem
            v-for="(category, index) in sbCategories"
            :key="index"
            data-cy="app-header-top-categories"
            class="nav-item"
            :label="category.name"
            :link="localePath(`/${category.slug}`)"
          />
        </div>
        <nuxt-link :to="localePath('/')" class="sf-header__logo">
          <SfImage
            :width="35"
            :height="35"
            src="/icons/logo.svg"
            alt="Vue Storefront Next"
            class="sf-header__logo-image"
          />
        </nuxt-link>
      </template>
      <template #header-icons>
        <div class="sf-header__icons">
          <!-- temporary removed -->
          <!-- <SfButton
            class="sf-button--pure sf-header__action"
            @click="handleAccountClick"
          >
            <SfIcon :icon="accountIcon" size="1.25rem" />
          </SfButton> -->
          <SfButton
            class="sf-button--pure sf-header__action"
            @click="toggleCartSidebar"
          >
            <SfIcon
              class="sf-header__icon"
              icon="empty_cart"
              size="1.25rem"
            />

            <SfBadge v-if="cartTotalItems" class="sf-badge--number cart-badge">
              {{ cartTotalItems }}
            </SfBadge>
          </SfButton>
          <SfButton
            class="sf-button--pure sf-header__action list"
            @click="toggleHamburguerMenu"
          >
            <SfIcon
              class="sf-header__icon"
              icon="list"
              size="1.25rem"
            />
          </SfButton>
        </div>
      </template>
      <template #search>
        <SfSearchBar
          ref="searchBarRef"
          :placeholder="$t('Search for items and promotions')"
          aria-label="Search"
          class="sf-header__search none"
          :value="term"
          :icon="{
            icon: !!term ? 'cross' : 'search',
            size: '1.25rem',
            color: '#43464E',
          }"
          @input="handleSearch"
          @keydown.enter="handleSearch($event)"
          @focus="isSearchOpen = true"
          @keydown.esc="closeSearch"
          @click:icon="closeOrFocusSearchBar"
        />
      </template>
      <!-- End of Search bar -->
    </SfHeader>
    <SearchResults
      :visible="isSearchOpen"
      :term="term"
      :search-loading="searchLoading"
      :result="formatedResult"
      @close="closeSearch"
      @seeMore="handleSearchMore"
      @removeSearchResults="removeSearchResults"
    />
    <SfOverlay :visible="isSearchOpen" />
  </div>
</template>

<script>
import {
  SfImage,
  SfSearchBar,
  SfIcon,
  SfButton,
  SfOverlay,
  SfBadge,
  SfHeader
} from '@storefront-ui/vue';
import { useUiState } from '~/composables';
import {
  useCart,
  useUser,
  categoryGetters,
  useFacet
} from '@vue-storefront/odoo';
import { clickOutside } from '@storefront-ui/vue/src/utilities/directives/click-outside/click-outside-directive.js';
import { computed, ref, watch } from '@nuxtjs/composition-api';
import { onSSR } from '@vue-storefront/core';
import { useUiHelpers, cartGetters } from '~/composables';
import SearchResults from '~/components/SearchResults';

import debounce from 'lodash.debounce';
import { mapMobileObserver } from '@storefront-ui/vue/src/utilities/mobile-observer.js';
export default {
  components: {
    SfHeader,
    SfImage,
    SfIcon,
    SfButton,
    SfSearchBar,
    SearchResults,
    SfOverlay,
    SfBadge
  },
  directives: { clickOutside },
  setup(props, { root }) {
    const searchBarRef = ref(null);
    const term = ref(null);
    const formatedResult = ref(null);
    const isSearchOpen = ref(false);
    const searchSize = ref(12);

    const { changeSearchTerm } = useUiHelpers();
    const { toggleCartSidebar, toggleLoginModal, toggleHamburguerMenu } =
      useUiState();

    const { load: loadUser, isAuthenticated } = useUser();
    const { load: loadCart, cart } = useCart();
    const { search, result, loading: searchLoading } = useFacet('AppHeader:Search');

    const isMobile = computed(() => mapMobileObserver().isMobile.get());

    const cartTotalItems = computed(() => {
      const count = cartGetters.getTotalItems(cart.value);
      return count ? count.toString() : null;
    });
    const accountIcon = computed(() =>
      isAuthenticated.value ? 'profile_fill' : 'profile'
    );

    const removeSearchResults = () => {
      formatedResult.value = null;
    };

    const closeSearch = () => {
      if (!isSearchOpen.value) return;
      term.value = '';
      isSearchOpen.value = false;
    };

    const handleSearch = debounce(async (paramValue) => {
      if (!paramValue?.target) {
        term.value = paramValue;
      } else {
        term.value = paramValue.target.value;
      }
      if (term.value.length < 2) return;

      const customQueryProducts = {
        getProductTemplatesList: 'greenGetProductList'
      };

      await search({
        search: term.value,
        pageSize: searchSize.value,
        currentPage: 1,
        fetchCategory: true,
        customQueryProducts
      });
      formatedResult.value = {
        total: result?.value?.data?.totalProducts,
        products: result?.value?.data?.products,
        categories: result?.value?.data?.categories
          .filter((category) => category.childs === null)
          .map((category) => categoryGetters.getTree(category))
      };
    }, 100);

    const handleSearchMore = async () => {
      searchSize.value += 12;
      await handleSearch(term.value);
    };

    const closeOrFocusSearchBar = () => {
      if (isMobile.value) {
        return closeSearch();
      }
      term.value = '';
      closeSearch();
      return searchBarRef.value.$el.children[0].focus();
    };
    // TODO: https://github.com/DivanteLtd/vue-storefront/issues/4927
    const handleAccountClick = () => {
      if (isAuthenticated.value) {
        return root.$router.push('/Checkout');
      }

      toggleLoginModal();
    };

    watch(
      () => term.value,
      (newVal, oldVal) => {
        const shouldSearchBeOpened =
          !isMobile.value &&
          term.value.length > 0 &&
          ((!oldVal && newVal) ||
            (newVal.length !== oldVal.length && isSearchOpen.value === false));
        if (shouldSearchBeOpened) {
          isSearchOpen.value = true;
        }
      }
    );

    onSSR(async () => {
      await Promise.all([
        loadUser(),
        loadCart({ customQuery: { cartLoad: 'greenCartLoad' } })
      ]);
    });

    return {
      accountIcon,
      closeOrFocusSearchBar,
      cartTotalItems,
      removeSearchResults,
      isSearchOpen,
      searchBarRef,
      handleAccountClick,
      toggleCartSidebar,
      toggleHamburguerMenu,
      changeSearchTerm,
      formatedResult,
      term,
      isMobile,
      handleSearchMore,
      handleSearch,
      closeSearch,
      searchLoading
    };
  },
  data() {
    return {
      sbCategories: [
        {
          name: 'SÆLG TIL OS',
          slug: 'saelg-til-os'
        },
        {
          name: 'REPARATION',
          slug: 'reparation'
        },
        {
          name: 'FIND BUTIK',
          slug: 'find-butik'
        }
      ]
    };
  }
};
</script>

<style lang='scss' scoped >
@import '~/assets/css/greenHeader.scss';
</style>
