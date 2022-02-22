<template>
  <div id="product">
    <SfBreadcrumbs
      class="breadcrumbs desktop-only"
      :breadcrumbs="breadcrumbs"
    />
    <div class="product">
      <LazyHydrate when-idle>
        <SfGallery :images="productGallery" class="product__gallery" />
      </LazyHydrate>
      <div class="product__info">
        <div class="product__header">
          <SfHeading
            :title="productGetters.getName(product)"
            :level="3"
            class="sf-heading--no-underline sf-heading--left product_title"
          />
          <SfIcon
            icon="drag"
            size="xxl"
            color="var(--c-text-disabled)"
            class="product__drag-icon smartphone-only"
          />
        </div>
        <SfHeading
            title="128GB | Space Grey"
            :level="3"
            class="sf-heading--no-underline sf-heading--left product_variants"
          />
        <div class="product__price-and-rating">
        </div>
        <div>
          <ProductDetails />
          <div class="checkbox-title-wrap">
            <div class="title">Tilkøb</div>
            <GreenCheckbox
              title="Screenprotection"
              link_title="Læs mere"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              price="149,-"
              img="productimg"
            />
            <GreenCheckbox
              title="Adapter"
              link_title=""
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              price="99,-"
              img="productimg"
            />      
          </div>
          <div v-if="accessoryProducts.length > 0" class="checkbox-title-wrap">
            <div class="title">Tilkøb</div>
            <GreenCheckbox
              title="Screenprotection"
              link_title="Læs mere"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              price="149,-"
              img="productimg"
            />
            <GreenCheckbox
              title="Adapter"
              link_title=""
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              price="99,-"
              img="productimg"
            />      
          </div>
          <div v-if="options.color" class="product__colors desktop-only">
            <template v-for="(option, colorKey) in options.color">
              <p class="product__color-label" :key="colorKey">
                {{ $t("Color") }}:
              </p>

              <SfColor
                required
                v-for="(color, itemKey) in option.values"
                :key="`${colorKey}_${itemKey}`"
                :color="color.label"
                class="product__color"
                :selected="checkSelected(option.label, color.value)"
                @click="updateFilter({ [option.label]: color.value })"
              >
              </SfColor>
            </template>
          </div>
          <div class="total-price-buttons">
            <!-- This is not working, maybe due to the price getting overwritten on category page (?) -->
            <!-- <SfPrice
              :regular="$n(productGetters.getPrice(product).regular, 'currency')"
              :special="
                productGetters.getPrice(product).special &&
                $n(productGetters.getPrice(product).special, 'currency')
              "
              class="total-price"
            /> --> 
            <p class="total-price">2.395,-</p>
            <div class="buttons">
                <SfAddToCart
                    data-cy="product-cart_add"
                    :stock="stock"
                    v-model="qty"
                    :disabled="loading || !allOptionsSelected"
                    :canAddToCart="stock > 0"
                    v-bind:class="{ 'add-to-cart': allOptionsSelected, 'add-to-cart-disabled': !allOptionsSelected}"
                    @click="addItem({ product, quantity: parseInt(qty) })"
                />
                <a href="#" class="status">SE LAGERSTATUS I BUTIK</a>
            </div>
          </div>
        </div>
        <div class="usp_banner_products">
          <div style="display: grid; padding-left: 8%">
            <SfImage
              :src="require('/assets/images/productsUspBanner/banner_1.svg')"
              :width="63"
              :height="71"
              alt="Vue Storefront Next"
              style="margin-left: auto; margin-right: auto"
            />
            <span class="usp_text_product"
              >Produkter er testet af egne eksperter</span
            >
          </div>
          <div style="display: grid; padding-left: 8%">
            <SfImage
              :src="require('/assets/images/productsUspBanner/banner_2.svg')"
              :width="63"
              :height="71"
              alt="Vue Storefront Next"
              style="margin-left: auto; margin-right: auto"
            />
            <span class="usp_text_product"
              >14 dages returret <br />2 års garanti</span
            >
          </div>
          <div style="display: grid; padding-left: 8%">
            <SfImage
              :src="require('/assets/images/productsUspBanner/banner_3.svg')"
              :width="63"
              :height="71"
              alt="Vue Storefront Next"
              style="margin-left: auto; margin-right: auto"
            />
            <span class="usp_text_product"
              >Ombyt i én af vores<br />10 butikker</span
            >
          </div>
        </div>

        <LazyHydrate when-idle>
          <SfTabs :open-tab="1" class="product__tabs">
            <SfTab data-cy="product-tab_description" title="Description">
              <div class="product__description">
                {{ description }}
              </div>
            </SfTab>
            <SfTab
              :title="$t('Specifikationer')"
              data-cy="product-tab_additional"
              class="product__additional-info"
            >
              <div class="product__additional-info">
                <p class="product__additional-info__title">
                  {{ $t("Brand") }}
                </p>
                <p>{{ brand }}</p>
                <p class="product__additional-info__title">
                  {{ $t("Instruction1") }}
                </p>
                <p class="product__additional-info__paragraph">
                  {{ $t("Instruction2") }}
                </p>
                <p class="product__additional-info__paragraph">
                  {{ $t("Instruction3") }}
                </p>
                <p>{{ careInstructions }}</p>
              </div>
            </SfTab>
            <!-- <SfTab :title="$t('Reviews')" data-cy="product-tab_reviews">
              <SfReview
                v-for="review in reviews"
                :key="reviewGetters.getReviewId(review)"
                :author="reviewGetters.getReviewAuthor(review)"
                :date="reviewGetters.getReviewDate(review)"
                :message="reviewGetters.getReviewMessage(review)"
                :max-rating="5"
                :rating="reviewGetters.getReviewRating(review)"
                :char-limit="250"
                read-more-text="Read more"
                hide-full-text="Read less"
                class="product__review"
              />
            </SfTab> -->
          </SfTabs>
        </LazyHydrate>
      </div>
    </div>
    <div class="product_carousel">
      <GreenCarousel
      :item="slider_products"
      :feature1="storage"
      :feature2="color"
      :currency="currency"
      :carousel_title="$t('Populære produkter')"
      style="padding-top: 5%"
    />
    </div>
  </div>
</template>
<script>
import {
  SfProperty,
  SfHeading,
  SfPrice,
  SfRating,
  SfSelect,
  SfAddToCart,
  SfTabs,
  SfGallery,
  SfRadio,
  SfIcon,
  SfImage,
  SfBanner,
  SfAlert,
  SfSticky,
  SfReview,
  SfBreadcrumbs,
  SfButton,
  SfColor,
  SfColorPicker,
  SfLoader,
  SfCheckbox,
} from "@storefront-ui/vue";

import InstagramFeed from "~/components/InstagramFeed.vue";
import RelatedProducts from "~/components/RelatedProducts.vue";
import { ref, computed, reactive } from "@vue/composition-api";
import { useCache, CacheTagPrefix } from "@vue-storefront/cache";
import {
  useProduct,
  useCart,
  productGetters,
  useReview,
  useProductVariant,
  reviewGetters,
  facetGetters,
  useFacet,
} from "@vue-storefront/odoo";

import { onSSR } from "@vue-storefront/core";
import { useRoute } from "@nuxtjs/composition-api";

import MobileStoreBanner from "~/components/MobileStoreBanner.vue";
import LazyHydrate from "vue-lazy-hydration";
export default {
  name: "Product",
  transition: "fade",
  setup(props, { root }) {
    const route = useRoute();

    const qty = ref(1);
    const { id } = route.value.params;
    const { query } = root.$route;
    const { size, color } = root.$route.query;
    const configuration = reactive({ size, color });
    const {
      products,
      search,
      loading: productloading,
    } = useProduct(`products-${id}`);
    const { searchRealProduct, productVariants, realProduct, elementNames } =
      useProductVariant(query);
    const { products: relatedProducts, loading: relatedLoading } =
      useProduct("relatedProducts");
    const { addItem, loading } = useCart();
    const { addTags } = useCache();

    const { reviews: productReviews } = useReview("productReviews");

    const product = computed(() => {
      return {
        ...products.value,
        realProduct: realProduct.value,
      };
    });

    const options = computed(() =>
      productGetters.getAttributes(product.value, ["color", "size"])
    );
    const description = computed(() =>
      productGetters.getDescription(product.value)
    );
    const properties = computed(() =>
      productGetters.getProperties(product.value)
    );
    const code = computed(() => productGetters.getCode(product.value));

    const breadcrumbs = computed(() =>
      facetGetters.getBreadcrumbsByProduct(product.value)
    );

    const reviews = computed(() =>
      reviewGetters.getItems(productReviews.value)
    );

    const productGallery = computed(() =>
      productGetters.getGallery(product.value).map((img) => ({
        mobile: { url: root.$image(img.small) },
        desktop: { url: root.$image(img.normal) },
        big: { url: root.$image(img.big) },
        alt: product.value.name || "alt",
      }))
    );

    const { result, search:search_facet } = useFacet();
    const { params } = root.$router.history.current;
    const slider_products = computed(() => facetGetters.getProducts(result.value).slice(0,10));

    onSSR(async () => {
      await searchRealProduct({
        productTemplateId: parseInt(id),
        combinationIds: Object.values(root.$route.query),
      });
      await search({
        id: parseInt(id),
        customQuery: { getRealProduct: 'greenGetProductAccessories' }
      });

      console.log(products.value)
      await search_facet(params);
      addTags([{ prefix: CacheTagPrefix.Product, value: id }]);
      // await searchRelatedProducts({ catId: [categories.value[0]], limit: 8 });
      // await searchReviews({ productId: id });
    });

    const accessoryProducts = computed(() => products?.value?.accessoryProducts || [])

    const updateFilter = (filter) => {
      root.$router.push({
        path: root.$route.path,
        query: { ...root.$route.query, ...filter },
      });
    };

    const allOptionsSelected = computed(() => {
      let keys = [];
      Object.keys(options.value).forEach((item) => {
        keys = [
          ...options.value[item].map((element) => element.label),
          ...keys,
        ];
      });
      const queryParams = Object.keys(root.$route.query);

      return keys.every((param) => queryParams.includes(param));
    });

    const checkSelected = (attribute, value) => {
      return root.$route.query[attribute] === value;
    };

    return {
      productloading,
      breadcrumbs,
      allOptionsSelected,
      checkSelected,
      elementNames,
      updateFilter,
      configuration,
      product,
      code,
      description,
      properties,
      reviews,
      reviewGetters,
      averageRating: computed(() =>
        productGetters.getAverageRating(product.value)
      ),
      totalReviews: computed(() =>
        productGetters.getTotalReviews(product.value)
      ),
      relatedProducts: computed(() =>
        productGetters.getFiltered(relatedProducts.value, { master: true })
      ),
      relatedLoading,
      options,
      qty,
      addItem,
      loading,
      productGetters,
      productVariants,
      productGallery,
      useFacet,
      facetGetters,
      slider_products,
      accessoryProducts
    };
  },
  components: {
    SfAlert,
    SfColor,
    SfProperty,
    SfRadio,
    SfHeading,
    SfPrice,
    SfRating,
    SfSelect,
    SfAddToCart,
    SfTabs,
    SfGallery,
    SfIcon,
    SfImage,
    SfBanner,
    SfSticky,
    SfReview,
    SfBreadcrumbs,
    SfButton,
    InstagramFeed,
    SfLoader,
    RelatedProducts,
    MobileStoreBanner,
    SfColorPicker,
    LazyHydrate,
    SfCheckbox
  },
  data() {
    return {
      stock: 5,
      detailsIsActive: false,
      brand:
        "Brand name is the perfect pairing of quality and design. This label creates major everyday vibes with its collection of modern brooches, silver and gold jewellery, or clips it back with hair accessories in geo styles.",
      careInstructions: "Do not wash!",
      storage: ["128 Gb", "128 Gb", "128 Gb", "128 Gb", "128 Gb"],
      color: ["Gold", "Red", "Silver", "Black", "Gold"],
      currency: ["$"],
    };
  },
};
</script>

<style lang="scss" scoped>
#product {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1272px;
    margin: 0 auto;
  }
}
.product {
  @include for-desktop {
    display: flex;
  }

  &__info {
    margin: var(--spacer-sm) auto;
    @include for-desktop {
      max-width: 32.625rem;
      margin: 0 0 0 7.5rem;
    }
  }
  &__header {
    --heading-title-color: var(--c-link);
    --heading-title-font-weight: var(--font-weight--bold);
    --heading-padding: 0;
    margin: 0 var(--spacer-sm);
    display: flex;
    justify-content: space-between;
    @include for-desktop {
      --heading-title-font-weight: var(--font-weight--semibold);
      margin: 0 auto;
    }
  }
  &__drag-icon {
    animation: moveicon 1s ease-in-out infinite;
  }
  &__price-and-rating {
    margin: 0 var(--spacer-sm) var(--spacer-base);
    align-items: center;
    @include for-desktop {
      display: flex;
      justify-content: space-between;
      margin: var(--spacer-sm) 0 var(--spacer-lg) 0;
    }
  }
  &__rating {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin: var(--spacer-xs) 0 var(--spacer-xs);
  }
  &__count {
    @include font(
      --count-font,
      var(--font-weight--normal),
      var(--font-size--sm),
      1.4,
      var(--font-family--secondary)
    );
    color: var(--c-text);
    text-decoration: none;
    margin: 0 0 0 var(--spacer-xs);
  }
  &__description {
    @include font(
      --product-description-font,
      var(--font-weight--light),
      var(--font-size--base),
      1.6,
      var(--font-family--primary)
    );
  }
  &__select-size {
    margin: 0 var(--spacer-sm);
    @include for-desktop {
      margin: 0;
    }
  }
  &__colors {
    @include font(
      --product-color-font,
      var(--font-weight--normal),
      var(--font-size--lg),
      1.6,
      var(--font-family--secondary)
    );
    display: flex;
    align-items: center;
    margin-top: var(--spacer-xl);
  }
  &__radio-label {
    @include font(
      --product-color-font,
      var(--font-weight--normal),
      var(--font-size--lg),
      1.6,
      var(--font-family--secondary)
    );
    margin: 0 var(--spacer-lg) 0 0;
  }
  &__color-label {
    margin: 0 var(--spacer-lg) 0 0;
  }
  &__color {
    margin: 0 var(--spacer-2xs);
  }
  &__add-to-cart {
    margin: var(--spacer-base) var(--spacer-sm) 0;
    @include for-desktop {
      margin-top: var(--spacer-2xl);
    }
  }
  &__guide,
  &__compare,
  &__save {
    display: block;
    margin: var(--spacer-xl) 0 var(--spacer-base) auto;
  }
  &__compare {
    margin-top: 0;
  }
  &__tabs {
    margin: var(--spacer-lg) auto var(--spacer-2xl);
    --tabs-title-font-size: var(--font-size--lg);
    @include for-desktop {
      margin-top: var(--spacer-2xl);
    }
  }
  &__property {
    margin: var(--spacer-base) 0;
    &__button {
      --button-font-size: var(--font-size--base);
    }
  }
  &__review {
    line-height: var(--line-height--primary);
    border-bottom: var(--c-light) solid 1px;
    margin-bottom: var(--spacer-base);
  }
  &__additional-info {
    color: var(--c-link);
    @include font(
      --additional-info-font,
      var(--font-weight--light),
      var(--font-size--sm),
      1.6,
      var(--font-family--primary)
    );
    &__title {
      font-weight: var(--font-weight--normal);
      font-size: var(--font-size--base);
      margin: 0 0 var(--spacer-sm);
      &:not(:first-child) {
        margin-top: 3.5rem;
      }
    }
    &__paragraph {
      margin: 0;
    }
  }
  &__gallery {
    flex: 1;
  }
}

.breadcrumbs {
  margin: var(--spacer-base) auto var(--spacer-lg);
  text-transform: capitalize;
}
@keyframes moveicon {
  0% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(0, 30%, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}
::v-deep .product_carousel .sf-heading {
  background-color: transparent;
}
::v-deep .product_carousel .sf-carousel {
  background-color: transparent;
}
.usp_banner_products {
  height: 120px;
  width: 531px;
  border-radius: 10px;
  background-color: #f3f3f3;
  display: flex;
  margin-top: 7%;
}
.usp_text_product {
  width: 122px;
  font-family: var(--font-family--primary);
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  text-align: center;
}
::v-deep .product__tabs {
  margin-top: 7%;
}
::v-deep .sf-tabs__title {
  margin-right: 15%;
}
.total-price-buttons .total-price {
    font-size: 34px;
    font-weight: 700;
}

.total-price-buttons {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
}

.total-price-buttons .buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 280px;
}

.total-price-buttons .buttons .add-to-cart {
    font-size: 14px;
    color: #fff;
    background: var(--_c-greenmind-pine-primary-dark-green);
    padding-top: 18px;
    padding-bottom: 18px;
    width: 100%;
    border-radius: 100px;
    text-align: center;
    margin-bottom: 8px;
}
.total-price-buttons .buttons .add-to-cart-disabled {
    font-size: 14px;
    color: var(--_c-greenmind-dark-grey-accent);
    background: var(--_c-greenmind-light-grey-accent);
    padding-top: 18px;
    padding-bottom: 18px;
    width: 100%;
    border-radius: 100px;
    text-align: center;
    margin-bottom: 8px;
    cursor: not-allowed;
}

.total-price-buttons .buttons .status {
    font-size: 14px;
    color: #fff;
    background: var(--_c-greenmind-fern-primary-medium-green);
    padding-top: 18px;
    padding-bottom: 18px;
    width: 100%;
    border-radius: 100px;
    text-align: center;
}
::v-deep .sf-add-to-cart__select-quantity {
  display: none;
}
::v-deep .sf-add-to-cart__button {
    background: none;
    padding: 0;
}
::v-deep .add-to-cart .sf-button {
    font-size: 14px;
    font-family: var(--font-family--primary);
}
.product_variants {
  text-align: left;
  --heading-title-color: var(--_c-greenmind-secondary-black);
  --heading-title-font-size: 26px;
  --heading-title-font-weight: 500;
}
.product_title {
  --heading-title-color: var(--_c-greenmind-primary-black);
  --heading-title-font-weight: 700;
  --heading-title-font-size: 34px;
  --heading-title-font-line-height: 48px;
  margin-bottom:-10px;
}
.checkbox-title-wrap .title {
    font-size: 20px;
    color: #1D1F22;
    font-weight: 500;
    margin-bottom: 25px;
}

.checkbox-title-wrap {
    padding-bottom: 8px;
    border-bottom: 1px solid #F1F2F3;
    margin-bottom: 40px;
}
</style>
