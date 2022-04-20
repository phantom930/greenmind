<template>
  <div>
    <SfMegaMenu
      :visible="isSearchOpen"
      :title="$t('Search results')"
      class="search"
    >
      <transition name="sf-fade" mode="out-in">
        <div
          v-if="products && products.length > 0"
          key="results"
          class="search__wrapper-results"
        >
          <SfMegaMenuColumn
            :title="$t('Categories')"
            class="
              sf-mega-menu-column--pined-content-on-mobile
              search__categories
            "
          >
            <template #title="{ title }">
              <SfMenuItem
                :label="title"
                class="sf-mega-menu-column__header"
                @click="megaMenu.changeActive(title)"
              >
                <template #mobile-nav-icon>
                  &#8203;
                </template>
              </SfMenuItem>
            </template>
            <SfList v-if="categories.length">
              <SfListItem v-for="(category, key) in categories" :key="key">
                <SfMenuItem
                  :label="category.label"
                  :link="uiHelper.getCatLinkForSearch(category)"
                  icon="chevron_right"
                >
                  <template #label>
                    <div v-html="higthlightText(category.label)" />
                  </template>
                </SfMenuItem>
              </SfListItem>
            </SfList>
          </SfMegaMenuColumn>
          <SfMegaMenuColumn
            :title="$t('Product suggestions')"
            class="sf-mega-menu-column--pined-content-on-mobile search__results"
          >
            <template #title="{ title }">
              <SfMenuItem
                :label="title"
                class="sf-mega-menu-column__header search__header"
              >
                <template #mobile-nav-icon>
                  &#8203;
                </template>
                <template #count>
                  <span style="margin-left: 45%">Total results: {{ result.total }}</span>
                </template>
              </SfMenuItem>
            </template>
            <div class="results--desktop desktop-only">
              <div class="results-listing">
                <LazyGreenProductCard
                  v-for="product in products"
                  :key="product.id"
                  :product="product"
                  :image-width="$device.isMobile ? 125 : 216"
                  :image-height="$device.isMobile ? 171 : 288"
                />
              </div>
              <div class="flex justify-end">
                <SfButton
                  class="color-primary sf-button search_result"
                  @click="$emit('seeMore')"
                >
                  {{ $t("See More") }}
                </SfButton>
              </div>
            </div>
            <div class="results--mobile smartphone-only">
              <LazyGreenProductCard
                v-for="product in products"
                :key="product.id"
                :product="product"
                :image-width="$device.isMobile ? 125 : 216"
                :image-height="$device.isMobile ? 171 : 288"
              />
            </div>
          </SfMegaMenuColumn>
          <div class="action-buttons smartphone-only">
            <SfButton
              class="color-primary sf-button search_result"
              @click="$emit('seeMore')"
            >
              {{ $t("See More") }}
            </SfButton>
            <SfButton
              class="color-primary sf-button search_result mt-4"
              @click="$emit('close')"
            >
              {{ $t("Cancel") }}
            </SfButton>
          </div>
        </div>
        <div v-else class="before-results">
          <SfImage
            :width="256"
            :height="276"
            src="/error/error.svg"
            class="before-results__picture"
            alt="error"
            loading="lazy"
          />
          <div v-if="term">
            <div v-if="searchLoading">
              <p class="before-results__paragraph">
                {{ $t("Loading...") }}
              </p>
            </div>
            <div v-else>
              <p class="before-results__paragraph">
                {{ $t("Sorry, we didn't find what you're looking for.") }}
              </p>
            </div>
          </div>
          <div v-else key="no-results">
            <p class="before-results__paragraph">
              {{ $t("You haven’t searched for items yet") }}
            </p>
            <p class="before-results__paragraph">
              {{ $t("Let’s start now – we’ll help you") }}
            </p>
            <SfButton
              class="before-results__button color-secondary smartphone-only"
              @click="$emit('close')"
            >
              {{ $t("Go back") }}
            </SfButton>
          </div>
        </div>
      </transition>
    </SfMegaMenu>
  </div>
</template>
<script>
import {
  SfMegaMenu,
  SfList,
  SfMenuItem,
  SfButton,
  SfImage
} from '@storefront-ui/vue';
import { ref, watch, computed } from '@nuxtjs/composition-api';
import { productGetters, categoryGetters, useCart } from '@vue-storefront/odoo';
import { useUiHelpers } from '~/composables';
import sanitizeHtml from 'sanitize-html';

export default {
  name: 'SearchResults',
  components: {
    SfMegaMenu,
    SfList,
    SfMenuItem,
    SfButton,
    SfImage
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    result: {
      type: Object,
      default: () => ({})
    },
    term: {
      type: String,
      default: ''
    },
    searchLoading: {
      type: Boolean
    }
  },
  emits: ['seeMore', 'close'],
  setup(props, { emit, root }) {
    const uiHelper = useUiHelpers();
    const isSearchOpen = ref(props.visible);
    const products = computed(() => props.result?.products);

    const categories = computed(() => props.result?.categories);

    const { addItem: addItemToCart, isInCart } = useCart();

    const higthlightText = (text) => {
      const cleanText = sanitizeHtml(text);
      const reg = new RegExp(`(${props.term})`, 'gi');

      return cleanText.replace(reg, '<span class="text-fern-secondary">$&</span>');
    };

    watch(
      () => props.visible,
      (newVal) => {
        isSearchOpen.value = newVal;
        if (isSearchOpen.value) {
          document.body.classList.add('no-scroll');
        } else {
          document.body.classList.remove('no-scroll');
          emit('removeSearchResults');
        }
      }
    );
    return {
      uiHelper,
      isSearchOpen,
      categoryGetters,
      productGetters,
      products,
      categories,
      addItemToCart,
      isInCart,
      higthlightText
    };
  },
  watch: {
    $route() {
      this.$emit('close');
      this.$emit('removeSearchResults');
    }
  }
};
</script>
<style lang="scss" scoped>
@import '~/assets/css/searchResults.scss';
</style>
