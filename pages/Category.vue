<template>
  <div>
    <LazyCategoryTopBanner v-if="$device.isDesktop" />

    <div id="category">
      <LazyCategoryNavbar />

      <div class="main section">
        <LazyHydrate when-idle>
          <LazyCategoryTopBanner v-if="$device.isMobile" />
        </LazyHydrate>

        <LazyHydrate when-idle>
          <LazyCategorySidebarFilter
            :show-filters="showProducts"
            :facets="facets"
            :range-attributes="rangeAttributes"
            :current-category="currentCategory"
          />
        </LazyHydrate>

        <SfLoader
          :class="{ loading }"
          :loading="loading && !buttonLoading"
        >
          <div
            v-if="showProducts"
            class="products"
          >
            <transition-group
              appear
              tag="div"
              name="sf-fade"
              class="products__grid"
            >
              <LazyGreenProductCard
                v-for="product in products"
                :key="product.id"
                :product="product"
                :image-width="$device.isMobile ? 160 : 248"
                :image-height="$device.isMobile ? 206 : 375"
              />
            </transition-group>
            <div class="flex justify-end">
              <GreenButton
                v-if="hasMoreProductsToLoad"
                style-type="Primary"
                color="Green"
                :loading="buttonLoading"
                :disabled="buttonLoading"
                @click="changeItemsPerPage()"
              >
                {{ $t("See More") }}
              </GreenButton>
            </div>
          </div>

          <LazyCategoryNoResults v-else />
        </SfLoader>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, useRouter } from '@nuxtjs/composition-api';
import { SfLoader } from '@storefront-ui/vue';
import { CacheTagPrefix, useCache } from '@vue-storefront/cache';
import { onSSR } from '@vue-storefront/core';
import { facetGetters, useFacet } from '@vue-storefront/odoo';
import LazyHydrate from 'vue-lazy-hydration';
import { useUiCategoryHelpers, useUiHelpers, useUiState } from '~/composables';
import { category } from '@odoogap/seo';

const { jsonLdStrucutredData } = category();
export default defineComponent({
  name: 'Category',
  components: { SfLoader, LazyHydrate },
  transition: 'fade',
  emits: ['close'],
  setup() {
    const uiState = useUiState();
    const pageSize = ref(21);
    const buttonLoading = ref(false);

    const { getFacetsFromURL } = useUiHelpers();
    const { result, search, loading } = useFacet();
    const { categoryTree, currentCategory } = useUiCategoryHelpers(
      result.value
    );

    const { push } = useRouter();
    const { addTags } = useCache();

    const products = computed(() => facetGetters.getProducts(result.value));

    const facets = computed(() =>
      facetGetters.getGrouped(result.value, ['color', 'size'])
    );

    const rangeAttributes = computed(() => ({
      minPrice: result.value?.data?.minPrice,
      maxPrice: result.value?.data?.maxPrice
    }));

    const pagination = computed(() => facetGetters.getPagination(result.value));

    const showProducts = computed(
      () =>
        (!loading.value && products.value?.length > 0) || buttonLoading.value
    );

    const hasMoreProductsToLoad = computed(
      () => pageSize.value < pagination.value?.totalItems
    );

    const customQueryProducts = {
      getProductTemplatesList: 'greenGetProductList'
    };

    const changeItemsPerPage = async () => {
      buttonLoading.value = true;
      pageSize.value += 21;
      const params = {
        ...getFacetsFromURL(),
        pageSize: pageSize,
        customQueryProducts
      };

      await search(params);
      buttonLoading.value = false;
    };

    onSSR(async () => {
      const params = { ...getFacetsFromURL(), customQueryProducts };

      await search(params);
      addTags([
        {
          prefix: CacheTagPrefix.Category,
          value: currentCategory.value?.id || params.slug_1
        }
      ]);
    });

    return {
      rangeAttributes,
      ...uiState,
      hasMoreProductsToLoad,
      buttonLoading,
      changeItemsPerPage,
      currentCategory,
      products,
      categoryTree,
      loading,
      pagination,

      facets,
      showProducts
    };
  },
  head () {
    return {
      title: 'Category page',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Category description'
        }
      ],
      script: [{
        type: 'application/ld+json',
        json: jsonLdStrucutredData
      }]
    };
  }
});
</script>

<style lang="scss" scoped>
@import "~assets/css/category.scss";
</style>
