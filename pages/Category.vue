<template>
  <div>
    <CategoryTopBanner />

    <div id="category">
      <div class="navbar section">
        <div class="navbar__aside desktop-only">
          <SfBreadcrumbs
            class="breadcrumbs desktop-only"
            :breadcrumbs="breadcrumbs"
          />
        </div>
        <div class="navbar__main">
          <div class="navbar__title desktop-only">
            <SfHeading :title="$t('iPhones')" />
          </div>
          <div class="navbar__sort desktop-only">
            <span class="navbar__label">{{ $t("Sort by") }}:</span>
            <LazyHydrate on-interaction>
              <SfSelect
                :value="sortBy.selected"
                placeholder="Select sorting"
                data-cy="category-select_sortBy"
                class="navbar__select"
                @input="th.changeSorting"
              >
                <SfSelectOption
                  v-for="(option, index) in sortBy.options"
                  :key="index"
                  :value="option.value"
                  class="sort-by__option"
                >
                  {{ option.attrName }}
                </SfSelectOption>
              </SfSelect>
            </LazyHydrate>
          </div>
        </div>
      </div>

      <div class="main section">
        <CategorySidebarFilters :facets="facets" />

        <SfLoader
          :class="{ loading }"
          :loading="loading"
        >
          <div
            v-if="showProducts"
            class="products"
          >
            <transition-group
              v-if="isCategoryGridView"
              appear
              name="products__slide"
              tag="div"
              class="products__grid"
            >
              <LazyGreenProductCard
                v-for="product in products"
                :key="product.id"
                :product="product"
              />
            </transition-group>
            <transition-group
              v-else
              appear
              name="products__slide"
              tag="div"
              class="products__list"
            >
              <SfProductCardHorizontal
                v-for="(product, i) in products"
                :key="product.id"
                v-model="products[i].qty"
                v-e2e="'category-product-card'"
                :style="{ '--index': i }"
                :image-width="216"
                :image-height="288"
                :title="productGetters.getName(product)"
                :description="productGetters.getDescription(product)"
                :image="$image(productGetters.getCoverImage(product))"
                :nuxt-img-config="{ fit: 'cover' }"
                image-tag="nuxt-img"
                :regular-price="
                  $n(productGetters.getPrice(product).regular, 'currency')
                "
                :special-price="
                  productGetters.getPrice(product).special &&
                    $n(productGetters.getPrice(product).special, 'currency')
                "
                :max-rating="5"
                :score-rating="3"
                :is-in-wishlist="isInWishlist({ product })"
                class="products__product-card-horizontal"
                :link="
                  localePath(
                    `/p/${productGetters.getId(
                      product
                    )}/${productGetters.getSlug(product)}`
                  )
                "
                @click:wishlist="addItemToWishlist({ product })"
                @click:add-to-cart="
                  addItemToCart({ product, quantity: product.qty })
                "
              >
                <template #configuration>
                  <SfProperty
                    class="desktop-only"
                    name="Size"
                    value="XS"
                    style="margin: 0 0 1rem 0"
                  />
                  <SfProperty
                    class="desktop-only"
                    name="Color"
                    value="white"
                  />
                </template>
                <template #actions>
                  <SfButton
                    class="sf-button--text desktop-only"
                    style="margin: 0 0 1rem auto; display: block"
                    @click="() => {}"
                  >
                    {{ $t("Save for later") }}
                  </SfButton>
                </template>
              </SfProductCardHorizontal>
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
import {
  SfButton,
  SfList,
  SfIcon,
  SfHeading,
  SfMenuItem,
  SfProductCard,
  SfProductCardHorizontal,
  SfPagination,
  SfSelect,
  SfBreadcrumbs,
  SfLoader,
  SfProperty,
  SfImage,
  SfAccordion
} from '@storefront-ui/vue';
import { ref, computed, onMounted } from '@vue/composition-api';
import {
  useCart,
  useWishlist,
  productGetters,
  useFacet,
  facetGetters
} from '@vue-storefront/odoo';
import { useCache, CacheTagPrefix } from '@vue-storefront/cache';
import { useUiHelpers, useUiState } from '~/composables';
import { onSSR } from '@vue-storefront/core';
import LazyHydrate from 'vue-lazy-hydration';

export default {
  name: 'Category',
  components: {
    SfButton,
    SfIcon,
    SfProductCard,
    SfProductCardHorizontal,
    SfPagination,
    SfMenuItem,
    SfSelect,
    SfBreadcrumbs,
    SfAccordion,
    SfList,
    SfLoader,
    SfHeading,
    SfProperty,
    LazyHydrate,
    SfImage
  },
  transition: 'fade',
  setup(props, { root }) {
    const th = useUiHelpers();

    const { addTags } = useCache();
    const uiState = useUiState();
    const { addItem: addItemToCart, isInCart } = useCart();
    const {
      addItem: addItemToWishlist,
      removeItem: removeItemFromWishList,
      isInWishlist
    } = useWishlist();
    const { result, search, loading } = useFacet();
    const { params, query } = root.$router.history.current;

    const products = computed(() => facetGetters.getProducts(result.value));
    const categoryTree = computed(() =>
      facetGetters.getCategoryTree(result.value)
    );
    const sortBy = computed(() =>
      facetGetters.getSortOptions({ input: { sort: query?.sort } } || '')
    );
    const facets = computed(() =>
      facetGetters.getGrouped(result.value, ['color', 'size'])
    );
    const pagination = computed(() => facetGetters.getPagination(result.value));
    const showProducts = computed(
      () => !loading.value && products.value?.length > 0
    );

    const currentCategory = computed(() => {
      const categories = result.value?.data?.categories || [];
      return categories[0] || {};
    });

    const currentCategoryNameForAccordion = computed(() => {
      const name =
        currentCategory.value?.parent?.name ||
        categoryTree.value?.items[0]?.label ||
        '';
      return name;
    });

    const currentRootCategory = computed(() => {
      const categories = result.value?.data?.categories || [];
      const category = categories.find((category) => {
        return category.slug === params.slug_1;
      });

      const categoryFromParent = currentCategory.value?.parent?.parent;

      return category || categoryFromParent || {};
    });

    const breadcrumbs = computed(() =>
      facetGetters.getBreadcrumbs({
        input: {
          params,
          currentRootCategory: currentRootCategory.value
        }
      })
    );

    onSSR(async () => {
      const params = {
        ...th.getFacetsFromURL()
      };

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
      currentCategory,
      th,
      products,
      categoryTree,
      loading,
      productGetters,
      pagination,
      sortBy,
      facets,
      breadcrumbs,
      addItemToWishlist,
      removeItemFromWishList,
      addItemToCart,
      isInWishlist,
      isInCart,
      showProducts,
      currentCategoryNameForAccordion
    };
  }
};
</script>

<style lang="scss" scoped>
@import "~assets/css/category.scss";

</style>
