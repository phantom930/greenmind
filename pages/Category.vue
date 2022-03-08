<template>
  <div>
    <CategoryTopBanner />

    <div id="category">
      <CategoryNavbar />

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
import { SfButton, SfImage, SfLoader, SfProductCardHorizontal, SfProperty } from '@storefront-ui/vue';
import { CacheTagPrefix, useCache } from '@vue-storefront/cache';
import { onSSR } from '@vue-storefront/core';
import { facetGetters, productGetters, useCart, useFacet, useWishlist} from '@vue-storefront/odoo';
import { computed, onMounted } from '@nuxtjs/composition-api';
import { useUiHelpers, useUiState, useUiCategoryHelpers } from '~/composables';

export default {
  name: 'Category',
  components: {
    SfButton,
    SfProductCardHorizontal,
    SfLoader,
    SfProperty,
    SfImage
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
