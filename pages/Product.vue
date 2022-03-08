<template>
  <div id="product">
    <SfBreadcrumbs
      class="breadcrumbs desktop-only"
      :breadcrumbs="breadcrumbs"
    />
    <div class="product">
      <LazyHydrate when-idle>
        <SfGallery
          :images="productGallery"
          :image-width="422"
          :image-height="644"
          :nuxt-img-config="{ fit: 'cover' }"
          :thumb-nuxt-img-config="{ fit: 'cover' }"
          class="product__gallery"
        />
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
        <div class="product__price-and-rating" />
        <div>
          <ProductSelectGrade :product-attributes="product.attributeValues" />

          <div
            v-if="accessoryProducts.length > 0"
            class="checkbox-title-wrap"
          >
            <div class="title">
              Tilkøb
            </div>
            <GreenCheckbox
              v-for="accessoryProduct in product.accessoryProducts"
              :key="accessoryProduct.id"
              :title="accessoryProduct.name"
              :description="accessoryProduct.description"
              :price="accessoryProduct.price"
              :has-image="true"
              :image="$image(accessoryProduct.image)"
            />
          </div>
          <div
            v-if="options.color"
            class="product__colors desktop-only"
          >
            <template v-for="(option, colorKey) in options.color">
              <p
                :key="colorKey"
                class="product__color-label"
              >
                {{ $t("Color") }}:
              </p>

              <SfColor
                v-for="(color, itemKey) in option.values"
                :key="`${colorKey}_${itemKey}`"
                required
                :color="color.label"
                class="product__color"
                :selected="checkSelected(option.label, color.value)"
                @click="updateFilter({ [option.label]: color.value })"
              />
            </template>
          </div>
          <div class="total-price-buttons">
            <!-- This is not working -->
            <!-- <SfPrice
              :regular="$n(productGetters.getPrice(product).regular, 'currency')"
              :special="
                productGetters.getPrice(product).special &&
                $n(productGetters.getPrice(product).special, 'currency')
              "
              class="total-price"
            />  -->
            <p class="total-price">
              2.395,-
            </p>
            <div class="buttons">
              <SfAddToCart
                v-model="qty"
                data-cy="product-cart_add"
                :stock="stock"
                :disabled="loading || !allOptionsSelected"
                :can-add-to-cart="stock > 0"
                :class="{
                  'add-to-cart': allOptionsSelected,
                  'add-to-cart-disabled': !allOptionsSelected,
                }"
                @click="addItem({ product, quantity: parseInt(qty) })"
              />
              <SfButton class="status">
                {{ $t("SEE STOCK STATUS IN STORE") }}
              </SfButton>
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
            <span class="usp_text_product">Produkter er testet af egne eksperter</span>
          </div>
          <div style="display: grid; padding-left: 8%">
            <SfImage
              :src="require('/assets/images/productsUspBanner/banner_2.svg')"
              :width="63"
              :height="71"
              alt="Vue Storefront Next"
              style="margin-left: auto; margin-right: auto"
            />
            <span class="usp_text_product">14 dages returret <br>2 års garanti</span>
          </div>
          <div style="display: grid; padding-left: 8%">
            <SfImage
              :src="require('/assets/images/productsUspBanner/banner_3.svg')"
              :width="63"
              :height="71"
              alt="Vue Storefront Next"
              style="margin-left: auto; margin-right: auto"
            />
            <span class="usp_text_product">Ombyt i én af vores<br>10 butikker</span>
          </div>
        </div>

        <LazyHydrate when-idle>
          <SfTabs
            :open-tab="1"
            class="product__tabs"
          >
            <SfTab
              data-cy="product-tab_description"
              title="Description"
            >
              <div class="product__description">
                {{ description }}
              </div>
            </SfTab>
            <SfTab
              :title="$t('Specifications')"
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
          </SfTabs>
        </LazyHydrate>
      </div>
    </div>
    <div class="product_carousel">
      <GreenCarousel
        :item="sliderProducts"
        :feature1="storage"
        :feature2="color"
        :currency="currency"
        :carousel_title="$t('Popular products')"
        style="padding-top: 5%"
      />
    </div>
  </div>
</template>
<script>
import {
  SfHeading,
  SfAddToCart,
  SfTabs,
  SfGallery,
  SfIcon,
  SfImage,
  SfBreadcrumbs,
  SfButton,
  SfColor
} from '@storefront-ui/vue';

import { ref, computed, reactive } from '@vue/composition-api';
import { useCache, CacheTagPrefix } from '@vue-storefront/cache';
import {
  useProduct,
  useCart,
  productGetters,
  useReview,
  useProductVariant,
  reviewGetters,
  facetGetters,
  useFacet
} from '@vue-storefront/odoo';

import { onSSR } from '@vue-storefront/core';
import { useRoute } from '@nuxtjs/composition-api';
import LazyHydrate from 'vue-lazy-hydration';
export default {
  name: 'Product',
  components: {
    SfColor,
    SfHeading,
    SfAddToCart,
    SfTabs,
    SfGallery,
    SfIcon,
    SfImage,
    SfBreadcrumbs,
    SfButton,
    LazyHydrate
  },
  transition: 'fade',
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
      loading: productloading
    } = useProduct(`products-${id}`);
    const { searchRealProduct, productVariants, realProduct, elementNames } =
      useProductVariant(query);
    const { products: relatedProducts, loading: relatedLoading } =
      useProduct('relatedProducts');
    const { addItem, loading } = useCart();
    const { addTags } = useCache();

    const { reviews: productReviews } = useReview('productReviews');

    const product = computed(() => {
      return {
        ...products.value,
        realProduct: realProduct.value
      };
    });

    const options = computed(() =>
      productGetters.getAttributes(product.value, ['color', 'size'])
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
        alt: product.value.name || 'alt'
      }))
    );

    const { result, search: searchFacet } = useFacet();
    const { params } = root.$router.history.current;
    const sliderProducts = computed(() => facetGetters.getProducts(result.value).slice(0, 4));

    onSSR(async () => {
      await searchRealProduct({
        productTemplateId: parseInt(id),
        combinationIds: Object.values(root.$route.query)
      });
      await search({
        id: parseInt(id),
        customQuery: { getProductTemplate: 'greenGetProductAccessories' }
      });
      await searchFacet(params);
      addTags([{ prefix: CacheTagPrefix.Product, value: id }]);
      // await searchRelatedProducts({ catId: [categories.value[0]], limit: 8 });
      // await searchReviews({ productId: id });
    });

    const accessoryProducts = computed(() => products?.value?.accessoryProducts || []);

    const updateFilter = (filter) => {
      root.$router.push({
        path: root.$route.path,
        query: { ...root.$route.query, ...filter }
      });
    };

    const allOptionsSelected = computed(() => {
      let keys = [];
      Object.keys(options.value).forEach((item) => {
        keys = [
          ...options.value[item].map((element) => element.label),
          ...keys
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
      sliderProducts,
      accessoryProducts
    };
  },
  data() {
    return {
      stock: 5,
      detailsIsActive: false,
      brand:
        'Brand name is the perfect pairing of quality and design. This label creates major everyday vibes with its collection of modern brooches, silver and gold jewellery, or clips it back with hair accessories in geo styles.',
      careInstructions: 'Do not wash!',
      storage: ['128 Gb', '128 Gb', '128 Gb', '128 Gb', '128 Gb'],
      color: ['Gold', 'Red', 'Silver', 'Black', 'Gold'],
      currency: ['$']
    };
  }
};
</script>

<style lang="scss" scoped>
@import url('~/assets/css/product.scss');
</style>
