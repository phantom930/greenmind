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
            <div class="flex justify-end">
              <GreenButton
                type="Primary"
                color="Green"
                @click="changeItemsPerPage()"
              >
                {{ $t('See More') }}
              </GreenButton>
            </div>
          </div>

          <CategoryNoResults v-else />
        </SfLoader>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api';
import { SfLoader } from '@storefront-ui/vue';
import { CacheTagPrefix, useCache } from '@vue-storefront/cache';
import { onSSR } from '@vue-storefront/core';
import { facetGetters, useFacet } from '@vue-storefront/odoo';
import LazyHydrate from 'vue-lazy-hydration';
import { useUiCategoryHelpers, useUiHelpers, useUiState } from '~/composables';

export default defineComponent({
  name: 'Category',
  components: { SfLoader, LazyHydrate },
  transition: 'fade',
  emits: ['close'],
  setup() {
    const uiState = useUiState();

    const { getFacetsFromURL, changeItemsPerPage } = useUiHelpers();
    const { result, search, loading } = useFacet();
    const { categoryTree, currentRootCategory } = useUiCategoryHelpers(result.value);
    const { addTags } = useCache();

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

    const customQueryProducts = {
      getProductTemplatesList: 'greenGetProductList'
    };

    onSSR(async () => {
      const params = { ...getFacetsFromURL(), customQueryProducts };
      await search(params);

      addTags([
        {
          prefix: CacheTagPrefix.Category,
          value: currentRootCategory.value.id || params.slug_2
        }
      ]);
    });

    return {
      ...uiState,
      changeItemsPerPage,
      currentRootCategory,
      products,
      categoryTree,
      loading,
      pagination,

      facets,
      showProducts
    };
  }
});
</script>

<style lang="scss" scoped>
@import "~assets/css/category.scss";
</style>
