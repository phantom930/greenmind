<template>
  <div>
    <SfHeader
      class="sf-header--has-mobile-search"
      :class="{
        'header-on-top': isSearchOpen
      }"
    >
      <template #logo />
      <template #navigation>
        <div v-show="$device.isDesktop" class="lg:grid grid-cols-3 auto-cols-min header-links hidden">
          <SfHeaderNavigationItem
            v-for="(category, index) in sbCategories"
            :key="index"
            data-cy="app-header-top-categories"
            class="nav-item"
            :label="category.name"
            :title="category.name"
            :link="{ name: category.slug }"
          />
        </div>
        <nuxt-link
          v-if="$device.isMobile"
          v-show="!showSearchInputOnMobile"
          title="GreenMind"
          :to="localePath('/')"
          class="sf-header__logo"
        >
          <SfImage

            :width="61"
            :height="35"
            src="/icons/GreenMind_logo_stacked_green_02.svg"
            alt="GreenMind"
            class="sf-header__logo-image"
          />
        </nuxt-link>
        <nuxt-link
          v-if="!$device.isMobile"
          v-show="!showSearchInputOnMobile"
          title="GreenMind"
          :to="localePath('/')"
          class="sf-header__logo"
        >
          <SfImage

            :width="250"
            :height="35"
            src="/icons/GreenMind_logo_horizontal_green_02.svg"
            alt="GreenMind"
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
            v-if="$device.isMobile && !showSearchInputOnMobile"
            class="sf-button--pure sf-header__action"
            @click="showSearchInputOnMobile = !showSearchInputOnMobile"
          >
            <SfIcon
              class="sf-header__icon"
              icon="search"
              size="1.25rem"
            />
          </SfButton>
          <SfButton
            v-if="!showSearchInputOnMobile"
            class="sf-button--pure sf-header__action"
            @click="handleToggleCartSidebar"
          >
            <SfIcon
              class="sf-header__icon"
              icon="empty_cart"
              :color="isCartSidebarOpen ? '#78A886' : ''"
              size="1.25rem"
            />

            <SfBadge v-if="cartTotalItems" class="sf-badge--number cart-badge">
              {{ cartTotalItems }}
            </SfBadge>
          </SfButton>
          <SfButton
            v-if="!showSearchInputOnMobile"
            class="sf-button--pure sf-header__action list"
            @click="handleToggleHamburguerMenu"
          >
            <SfIcon
              class="sf-header__icon"
              icon="list"
              size="1.25rem"
              :color="isHamburguerMenuOpen ? '#78A886' : ''"
            />
          </SfButton>
        </div>
      </template>
      <template #search>
        <SfSearchBar
          v-show="$device.isDesktop || showSearchInputOnMobile"
          ref="searchBarRef"
          :placeholder="$t('Search for items and promotions')"
          aria-label="Search"
          class="sf-header__search none"
          :value="term"
          :icon="{
            icon: isSearchOpen || showSearchInputOnMobile ? 'cross' : 'search',
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
    <!-- <div v-html="test" /> -->
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
import { computed, ref, watch } from '@nuxtjs/composition-api';
import { onSSR } from '@vue-storefront/core';
import { useUiHelpers, cartGetters } from '~/composables';
import SearchResults from '~/components/SearchResults';

import debounce from 'lodash.debounce';
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
  setup(props, { root }) {
    const showSearchInputOnMobile = ref(false);
    const searchBarRef = ref(null);
    const term = ref(null);
    const formatedResult = ref(null);
    const isSearchOpen = ref(false);
    const searchSize = ref(12);

    const { changeSearchTerm } = useUiHelpers();
    const { isCartSidebarOpen, isHamburguerMenuOpen, toggleCartSidebar, toggleLoginModal, toggleHamburguerMenu } =
      useUiState();

    const { load: loadUser, isAuthenticated } = useUser();
    const { load: loadCart, cart } = useCart();
    const { search, result, loading: searchLoading } = useFacet('AppHeader:Search');

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

    const closeSearch = (e) => {
      showSearchInputOnMobile.value = false;
      if (!isSearchOpen.value) return;
      term.value = '';
      isSearchOpen.value = false;
    };

    const handleToggleCartSidebar = () => {
      if (isHamburguerMenuOpen.value) {
        toggleHamburguerMenu();
      }
      closeSearch();
      toggleCartSidebar();

    };

    const handleToggleHamburguerMenu = () => {
      closeSearch();
      toggleHamburguerMenu();
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
      if (root.$device.isMobile) {
        return closeSearch();
      }
      term.value = '';
      if (isSearchOpen.value) {
        return closeSearch();
      }
      isSearchOpen.value = true;
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
          !root.$device.isMobile &&
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

    const test = `<span 
  class="clerk"
  
  data-api="search/predictive"
  data-limit="6"
      
  data-instant-search="#search">
  
  <dl class="product-search-result-list">
    <dt>Products matching <i>{{ query }}</i></dt>
    
    {% for product in products %}
      <dd class="product clerk-instant-search-key-selectable">
        <h2 class="product-name">{{ product.name }}</h2> 
        <img src="{{ product.image }}" title="{{ product.name }}" />
        <div class="price">\${{ product.price | money }}</div>
        <a href="{{ product.url }}">Buy Now</a>
      </dd>
    {% endfor %}
  </dl>
</span>`;

    return {
      test,
      isCartSidebarOpen,
      isHamburguerMenuOpen,
      handleToggleHamburguerMenu,
      handleToggleCartSidebar,
      showSearchInputOnMobile,
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
      handleSearchMore,
      handleSearch,
      closeSearch,
      searchLoading
    };
  },
  data() {
    return {
      sbCategories: [
        // {
        //   name: 'SÆLG TIL OS',
        //   slug: 'sell-to-us'
        // },
        {
          name: 'REPARATION',
          slug: 'reparation'
        },
        {
          name: 'FIND BUTIK',
          slug: 'shops'
        }
      ]
    };
  }
};
</script>

<style lang='scss' scoped >
@import "~/assets/css/greenHeader.scss";
</style>
