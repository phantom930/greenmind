<template>
  <div>
    <CategoryTopBanner />

    <div id="category">
      <CategoryNavbar />

      <div class="main section">
        <LazyHydrate when-idle>
          <CategorySidebarFilters :facets="facets" />
        </LazyHydrate>

        <SfLoader
          :class="{ loading }"
          :loading="loading"
        >
          <div
            v-if="showProducts"
            class="products"
          >
            <transition-group
              appear
              tag="div"
              class="products__grid"
            >
              <LazyGreenProductCard
                v-for="product in products"
                :key="product.id"
                :product="product"
              />
            </transition-group>
          </div>
          <div
            v-else
            key="no-results"
            class="before-results"
          >
            <SfImage
              :width="256"
              :height="176"
              src="/error/error.svg"
              class="before-results__picture"
              alt="error"
              loading="lazy"
            />
            <p class="before-results__paragraph">
              {{ $t("Sorry, we didnt find what youre looking for") }}
            </p>
            <SfButton
              class="before-results__button color-secondary smartphone-only"
              @click="$emit('close')"
            >
              {{ $t("Go back") }}
            </SfButton>
          </div>
        </SfLoader>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from '@nuxtjs/composition-api';
import { SfButton, SfImage, SfLoader } from '@storefront-ui/vue';
import { CacheTagPrefix, useCache } from '@vue-storefront/cache';
import { onSSR } from '@vue-storefront/core';
import { facetGetters, productGetters, useCart, useFacet, useWishlist } from '@vue-storefront/odoo';
import { useUiCategoryHelpers, useUiHelpers, useUiState } from '~/composables';
import LazyHydrate from 'vue-lazy-hydration';

export default {
  name: 'Category',
  components: {
    SfButton,
    SfLoader,
    SfImage,
    LazyHydrate
  },
  transition: 'fade',
  emits: ['close'],
  setup(props, { root }) {
    const th = useUiHelpers();
    const uiState = useUiState();

    const { result, search, loading } = useFacet();
    const { categoryTree, currentRootCategory } = useUiCategoryHelpers(result);
    const { addTags } = useCache();
    const { addItem: addItemToCart, isInCart } = useCart();
    const { addItem: addItemToWishlist, removeItem: removeItemFromWishList, isInWishlist } = useWishlist();

    const products = computed(() => facetGetters.getProducts(result.value));

    const facets = computed(() =>
      facetGetters.getGrouped(result.value, ['color', 'size'])
    );
    const pagination = computed(() =>
      facetGetters.getPagination(result.value)
    );
    const showProducts = computed(
      () => !loading.value && products.value?.length > 0
    );

    onSSR(async () => {
      const params = { ...th.getFacetsFromURL() };
      await search(params);

      addTags([
        {
          prefix: CacheTagPrefix.Category,
          value: currentRootCategory.value.id || params.slug_2
        }
      ]);
    });

    onMounted(() => {
      root.$scrollTo(root.$el, 2000);
    });

    return {
      ...uiState,
      currentRootCategory,
      th,
      products,
      categoryTree,
      loading,
      productGetters,
      pagination,

      facets,
      addItemToWishlist,
      removeItemFromWishList,
      addItemToCart,
      isInWishlist,
      isInCart,
      showProducts
    };
  }
};
</script>

<style lang="scss" scoped>
@import "~assets/css/category.scss";
</style>
