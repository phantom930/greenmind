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
        <div id="logo">
          <nuxt-link
            v-show="mobileOrTabletSize"
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
            v-show="!mobileOrTabletSize"
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
        </div>
      </template>
      <template #header-icons>
        <div class="flex justify-self-end	justify-end">
          <!-- temporary removed -->
          <!-- <SfButton
            class="sf-button--pure sf-header__action"
            @click="handleAccountClick"
          >
            <SfIcon :icon="accountIcon" size="1.25rem" />
          </SfButton> -->
          <SfSearchBar
            v-show="showSearchInput && !mobileOrTabletSize"
            ref="searchBarRef"
            :style="{'transform: scale(0.7)': showSearchInput}"
            :placeholder="$t('Search for items and promotions')"
            aria-label="Search"
            class="sf-header__search none"
            :value="term"
            :icon="{
              icon: isSearchOpen || showSearchInput ? 'cross' : 'search',
              size: '1.25rem',
              color: '#43464E',
            }"
            @keydown.esc="closeSearch"
            @click:icon="closeOrFocusSearchBar"
          />
          <SfButton
            :class="{ hidden: showSearchInput}"
            class="sf-button--pure sf-header__action"
            @click="toggleSearchBar"
          >
            <SfIcon
              class="sf-header__icon"
              icon="search"
              size="1.25rem"
            />
          </SfButton>
          <SfButton
            class="sf-button--pure sf-header__action"
            @click="handleToggleCartSidebar"
          >
            <SfIcon
              class="sf-header__icon"
              icon="empty_cart"
              :color="isCartSidebarOpen ? '#78A886' : ''"
              size="1.40rem"
            />

            <SfBadge class="sf-badge--number cart-badge" :class="{ hidden: !cartTotalItems }">
              {{ cartTotalItems }}
            </SfBadge>
          </SfButton>
          <SfButton
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
        <transition
          name="sf-fade"
          mode="out-in"
          type="transition"
        >
          <div v-if="showSearchInput && mobileOrTabletSize" class="flex">
            <SfSearchBar
              ref="searchBarRef"
              :placeholder="$t('Search for items and promotions')"
              aria-label="Search"
              class="sf-header__search none"
              :value="term"
              :icon="{
                icon: isSearchOpen || showSearchInput ? 'cross' : 'search',
                size: '1.25rem',
                color: '#43464E',
              }"
              @keydown.esc="closeSearch"
              @click:icon="closeOrFocusSearchBar"
            />
          </div>
        </transition>
      </template>

      <!-- End of Search bar -->
    </SfHeader>
    <GreenSearchClerk />
    <!-- <SearchResults
      :visible="isSearchOpen"
      :term="term"
      :search-loading="searchLoading"
      :result="formatedResult"
      @close="closeSearch"
      @seeMore="handleSearchMore"
      @removeSearchResults="removeSearchResults"
    /> -->
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
import { useCart, useUser, useFacet } from '@vue-storefront/odoo';
import { computed, ref, watch } from '@nuxtjs/composition-api';
import { onSSR } from '@vue-storefront/core';
import { useUiHelpers, cartGetters } from '~/composables';

export default {
  components: {
    SfHeader,
    SfImage,
    SfIcon,
    SfButton,
    SfSearchBar,
    SfOverlay,
    SfBadge
  },
  setup(props, { root }) {
    const showSearchInput = ref(false);
    const searchBarRef = ref(null);
    const term = ref(null);
    const formatedResult = ref(null);
    const isSearchOpen = ref(false);

    const { changeSearchTerm } = useUiHelpers();
    const { isCartSidebarOpen, isHamburguerMenuOpen, toggleCartSidebar, toggleLoginModal, toggleHamburguerMenu } =
      useUiState();

    const { load: loadUser, isAuthenticated } = useUser();
    const { load: loadCart, cart } = useCart();
    const { loading: searchLoading } = useFacet('AppHeader:Search');

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
      showSearchInput.value = false;
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

    const toggleSearchBar = () => {
      showSearchInput.value = !showSearchInput.value;
      searchBarRef.value?.$el?.children[0].focus();
    };

    const handleToggleHamburguerMenu = () => {
      closeSearch();
      toggleHamburguerMenu();
    };

    const mobileOrTabletSize = computed(() => root.$breakpoints.sMd);

    const closeOrFocusSearchBar = () => {
      if (mobileOrTabletSize.value) {
        return closeSearch();
      }
      term.value = '';
      if (isSearchOpen.value) {
        return closeSearch();
      }
      isSearchOpen.value = true;
    };
    // TODO: https://github.com/DivanteLtd/vue-storefront/issues/4927
    const handleAccountClick = () => {
      if (isAuthenticated.value) {
        return root.$router.push('/Checkout');
      }

      toggleLoginModal();
    };

    watch(
      () => showSearchInput.value,
      () => {
        const element = root.$el.querySelector('.sf-header__actions');
        if (mobileOrTabletSize.value) {
          element.style['grid-template-columns'] = showSearchInput.value ? '1fr 1fr fit-content' : '2fr 1fr';
        }
        if (!mobileOrTabletSize.value) {
          element.style['grid-template-columns'] = '2fr 1fr';
        }
      }
    );

    watch(
      () => term.value,
      (newVal, oldVal) => {
        const shouldSearchBeOpened = term.value.length > 0 && ((!oldVal && newVal) || (newVal.length !== oldVal.length && isSearchOpen.value === false));

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
      toggleSearchBar,
      mobileOrTabletSize,
      isCartSidebarOpen,
      isHamburguerMenuOpen,
      handleToggleHamburguerMenu,
      handleToggleCartSidebar,
      showSearchInput,
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
