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
                  >{{ option.attrName }}</SfSelectOption
                >
              </SfSelect>
            </LazyHydrate>
          </div>
        </div>
      </div>

      <div class="main section">
        <CategorySidebarFilters :facets="facets" />

        <SfLoader :class="{ loading }" :loading="loading">
          <div class="products" v-if="showProducts">
            <transition-group
              v-if="isCategoryGridView"
              appear
              name="products__slide"
              tag="div"
              class="products__grid"
            >
              <LazyGreenProductCard
                :product="product"
                v-for="product in products"
                :key="product.id"
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
                v-e2e="'category-product-card'"
                v-for="(product, i) in products"
                :key="product.id"
                :style="{ '--index': i }"
                :imageWidth="216"
                :imageHeight="288"
                :title="productGetters.getName(product)"
                :description="productGetters.getDescription(product)"
                :image="$image(productGetters.getCoverImage(product))"
                :nuxtImgConfig="{ fit: 'cover' }"
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
                :isInWishlist="isInWishlist({ product })"
                class="products__product-card-horizontal"
                @click:wishlist="addItemToWishlist({ product })"
                @click:add-to-cart="
                  addItemToCart({ product, quantity: product.qty })
                "
                v-model="products[i].qty"
                :link="
                  localePath(
                    `/p/${productGetters.getId(
                      product
                    )}/${productGetters.getSlug(product)}`
                  )
                "
              >
                <template #configuration>
                  <SfProperty
                    class="desktop-only"
                    name="Size"
                    value="XS"
                    style="margin: 0 0 1rem 0"
                  />
                  <SfProperty class="desktop-only" name="Color" value="white" />
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
          <div v-else key="no-results" class="before-results">
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
  SfAccordion,
} from "@storefront-ui/vue";
import { ref, computed, onMounted } from "@vue/composition-api";
import {
  useCart,
  useWishlist,
  productGetters,
  useFacet,
  facetGetters,
} from "@vue-storefront/odoo";
import { useCache, CacheTagPrefix } from "@vue-storefront/cache";
import { useUiHelpers, useUiState } from "~/composables";
import { onSSR } from "@vue-storefront/core";
import LazyHydrate from "vue-lazy-hydration";

export default {
  name: "Category",
  transition: "fade",
  setup(props, { root }) {
    const th = useUiHelpers();

    const { addTags } = useCache();
    const uiState = useUiState();
    const { addItem: addItemToCart, isInCart } = useCart();
    const {
      addItem: addItemToWishlist,
      removeItem: removeItemFromWishList,
      isInWishlist,
    } = useWishlist();
    const { result, search, loading } = useFacet();
    const { params, query } = root.$router.history.current;

    const products = computed(() => facetGetters.getProducts(result.value));
    const categoryTree = computed(() =>
      facetGetters.getCategoryTree(result.value)
    );
    const sortBy = computed(() =>
      facetGetters.getSortOptions({ input: { sort: query?.sort } } || "")
    );
    const facets = computed(() =>
      facetGetters.getGrouped(result.value, ["color", "size"])
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
        "";
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
          currentRootCategory: currentRootCategory.value,
        },
      })
    );

    onSSR(async () => {
      const params = {
        ...th.getFacetsFromURL(),
      };

      await search(params);

      addTags([
        {
          prefix: CacheTagPrefix.Category,
          value: currentRootCategory.value.id || params.slug_2,
        },
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
      currentCategoryNameForAccordion,
    };
  },
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
    SfImage,
  },
};
</script>

<style lang="scss" scoped>
#category {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1240px;
    margin: 0 auto;
  }
}
.main {
  &.section {
    padding: var(--spacer-xs);
    @include for-desktop {
      padding: 0 0 15px 0;
    }
  }
}
::v-deep .breadcrumbs {
  --breadcrumbs-font: var(--font-family--primary);
  margin-top: auto;
}

.navbar {
  position: relative;
  display: flex;
  border: 1px solid var(--c-light);
  border-width: 0 0 1px 0;
  @include for-desktop {
    border-width: 0px 0 1px 0;
  }
  &.section {
    padding: var(--spacer-sm);
    @include for-desktop {
      padding: 0;
    }
  }
  &__aside,
  &__main {
    display: flex;
    align-items: center;
    padding: var(--spacer-sm) 0;
  }

  &__main {
    flex: 1;
    padding: 0;
    justify-content: space-between;
    @include for-desktop {
      padding: var(--spacer-xs) var(--spacer-xl);
    }
  }
  &__title {
    display: flex;
    align-items: center;
    margin: 0 16% 0 auto;
  }
  &__title .sf-heading__title {
    font-weight: bold;
  }
  &__label {
    font-family: var(--font-family--primary);
    font-weight: 400;
    color: #72757e;
    @include for-desktop {
      color: #72757e;
      margin: 0 var(--spacer-2xs) 0 0;
    }
  }
  &__select {
    --select-width: 220px;
    --select-padding: 0;
    --select-height: auto;
    --select-selected-padding: 0 var(--spacer-lg) 0 var(--spacer-2xs);
    --select-margin: 0;
    --select-option-font-size: var(--font-size-sm);
    --select-error-message-height: 0;
    ::v-deep .sf-select__dropdown {
      font-size: 16px;
      font-family: var(--font-family--primary);
      font-weight: 400;
      color: #1d1f22;
      margin: 0;
    }
    ::v-deep .sf-select__placeholder {
      --select-option-font-size: 16px;
    }
  }
  &__sort {
    display: flex;
    align-items: center;
    margin: 0 0 0 var(--spacer-2xl);
  }
  &__counter {
    font-family: var(--font-family--secondary);
    order: 1;
    @include for-desktop {
      margin: auto 0 auto auto;
      order: 0;
    }
  }
  &__view {
    display: flex;
    align-items: center;
    order: 0;
    @include for-desktop {
      margin: 0 0 0 var(--spacer-2xl);
      order: 0;
    }
    &-icon {
      cursor: pointer;
      margin: 0 var(--spacer-base) 0 0;
      &:last-child {
        margin: 0;
      }
    }
    &-label {
      margin: 0 var(--spacer-sm) 0 0;
      font: var(--font-weight--normal) var(--font-size--base) / 1.6
        var(--font-family--secondary);
      text-decoration: none;
      color: var(--c-link);
    }
  }
}
.sort-by {
  flex: unset;
  width: 11.875rem;
}
.main {
  display: flex;
}

.list {
  --menu-item-font-size: var(--font-size--sm);
  &__item {
    &:not(:last-of-type) {
      --list-item-margin: 0 0 var(--spacer-sm) 0;
    }

    .nuxt-link-exact-active {
      text-decoration: underline;
    }
  }
}
.products {
  box-sizing: border-box;
  flex: 1;
  margin: 0;
  &__grid {
    justify-content: space-between;
    @include for-desktop {
      gap: 20px;
      margin: 20px;
      justify-content: flex-start;
    }
  }
  &__grid,
  &__list {
    display: flex;
    flex-wrap: wrap;
  }
  &__product-card {
    --product-card-title-margin: var(--spacer-base) 0 0 0;
    --product-card-title-font-weight: var(--font-weight--medium);
    --product-card-title-margin: var(--spacer-xs) 0 0 0;
    flex: 1 1 50%;
    @include for-desktop {
      --product-card-title-font-weight: var(--font-weight--normal);
      --product-card-add-button-bottom: var(--spacer-base);
      --product-card-title-margin: var(--spacer-sm) 0 0 0;
    }
  }
  &__product-card-horizontal {
    flex: 0 0 100%;
  }
  &__slide-enter {
    opacity: 0;
    transform: scale(0.5);
  }
  &__slide-enter-active {
    transition: all 0.2s ease;
    transition-delay: calc(0.1s * var(--index));
  }
  @include for-desktop {
    &__pagination {
      display: flex;
      justify-content: flex-start;
      margin: var(--spacer-xl) 0 0 0;
    }
    &__product-card-horizontal {
      margin: var(--spacer-lg) 0;
    }
    &__product-card {
      flex: 1 1 25%;
    }
    &__list {
      margin: 0 0 0 var(--spacer-sm);
    }
  }
  &__show-on-page {
    display: flex;
    justify-content: flex-end;
    align-items: baseline;
    &__label {
      font-family: var(--font-family--secondary);
      font-size: var(--font-size--sm);
    }
  }
}
.loading {
  margin: var(--spacer-3xl) auto;
  @include for-desktop {
    margin-top: 6.25rem;
  }
}
::v-deep .sf-sidebar__aside {
  --sidebar-z-index: 3;
}

.before-results {
  box-sizing: border-box;
  padding: var(--spacer-lg) var(--spacer-sm) var(--spacer-2xl);
  width: 100%;
  text-align: center;
  @include for-desktop {
    padding: 0;
  }
  &__picture {
    --image-width: 230px;
    margin-top: var(--spacer-2xl);
    @include for-desktop {
      --image-width: 18.75rem;
      margin-top: var(--spacer-base);
    }
  }
  &__paragraph {
    font-family: var(--font-family--primary);
    font-weight: var(--font-weight--normal);
    font-size: var(--font-size--base);
    color: var(--c-text-muted);
    margin: 0;
    @include for-desktop {
      font-size: var(--font-size--lg);
    }
    &:first-of-type {
      margin: var(--spacer-xl) auto var(--spacer-xs);
    }
  }
  &__button {
    margin: var(--spacer-xl) auto;
    width: 100%;
  }
}
::v-deep .sf-accordion-item__content {
  list-style: none;
  padding: 0px 0px;
  font-size: 20px;
  font-weight: 500;
}

::v-deep .sf-color-picker {
  position: relative;
  width: 115%;
  margin: 0px 0px 0px -37px;
}
::v-deep .range-label {
  font-family: "Josefin Sans", sans-serif;
  line-height: var(--line-height--primary);
  font-size: 20px;
  font-weight: 500;
}

::v-deep .sf-breadcrumbs__breadcrumb.current {
  text-transform: capitalize;
}
</style>
