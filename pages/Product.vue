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
          :thumb-width="160"
          :thumb-height="160"
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
          :title="product.websiteSubtitle"
          :level="3"
          class="sf-heading--no-underline sf-heading--left product_variants"
        />
        <div class="product__price-and-rating" />
        <div>
          <ProductSelectGrade :product-grades="productGrades" />

          <ProductDescription />

          <div
            v-if="accessoryProducts.length > 0"
            class="checkbox-title-wrap"
          >
            <div class="title">
              {{ $t("Purchases") }}
            </div>
            <GreenCheckbox
              v-for="accessoryProduct in product.accessoryProducts"
              :key="accessoryProduct.id"
              :title="accessoryProduct.name"
              :description="accessoryProduct.description"
              :price="$n(accessoryProduct.combinationInfoVariant.price, 'currency')"
              :has-image="true"
              :image="$image(accessoryProduct.image, 82, 70, accessoryProduct.name)"
              @change="selectAcessories"
            />
          </div>

          <div class="total-price-buttons">
            <p class="total-price">
              {{ $n(combinationInfo.price, 'currency') }}
            </p>
            <div class="buttons">
              <GreenButton
                type="Primary"
                color="Green"
                shape="Round"
                size="Medium"
                class="mb-3"
                :disabled="anyLoading"
                :loading="anyLoading"
                @click="handleAddItem()"
              >
                {{ $t("Add to Cart") }}
              </GreenButton>

              <GreenButton
                type="Secondary"
                color="Green"
                shape="Round"
                size="Medium"
                @click="handleStoreStatus"
              >
                {{ $t("SEE STOCK STATUS IN STORE") }}
              </GreenButton>
            </div>
          </div>
        </div>

        <BannerProducts />

        <LazyHydrate when-idle>
          <ProductTabs :product="product" />
        </LazyHydrate>
      </div>
    </div>
    <div class="product_carousel">
      <GreenCarousel
        v-if="sliderProducts.length > 0"
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
<script >
import { computed, defineComponent, reactive, useRoute } from '@nuxtjs/composition-api';
import { SfBreadcrumbs, SfGallery, SfHeading, SfIcon } from '@storefront-ui/vue';
import { CacheTagPrefix, useCache } from '@vue-storefront/cache';
import { onSSR } from '@vue-storefront/core';
import { facetGetters, useFacet, useMultipleProduct, useProduct } from '@vue-storefront/odoo';
import LazyHydrate from 'vue-lazy-hydration';
import { productGetters, useUiState } from '~/composables';
import { product } from '@odoogap/seo';

const { allHead } = product();
export default defineComponent({
  name: 'Product',
  components: {
    SfHeading,
    SfGallery,
    SfIcon,
    SfBreadcrumbs,
    LazyHydrate
  },
  transition: 'fade',
  setup(props, { root }) {
    const { path } = useRoute().value;
    const selectedAcessories = reactive(new Set([]));
    const { toggleStoreModal } = useUiState();
    const { products, search, loading } = useProduct(`products-${path}`);
    const { products: relatedProducts, loading: relatedLoading } = useProduct('relatedProducts');
    const { addMultipleProductsToCart, loading: addLoading } = useMultipleProduct();
    const { addTags } = useCache();

    const product = computed(() => {
      return {
        ...products.value
      };
    });

    const properties = computed(() => productGetters.getProperties(product.value));
    const code = computed(() => productGetters.getCode(product.value));
    const combinationInfo = computed(() => product.value?.combinationInfoVariant || {});
    const breadcrumbs = computed(() => facetGetters.getBreadcrumbsByProduct(product.value));
    const sliderProducts = computed(() => product.value.alternativeProducts || []);
    const accessoryProducts = computed(() => productGetters.getAccessoryProducts(product.value));
    const productGrades = computed(() => productGetters.getGrades(product.value));

    const productGallery = computed(() =>
      productGetters.getGallery(product.value).map((img) => ({
        mobile: { url: root.$image(img.small, 160, 160, product.value.name) },
        desktop: { url: root.$image(img.normal, 442, 664, product.value.name) },
        big: { url: root.$image(img.big, 442, 664, product.value.name) },
        alt: product.value.name || 'alt'
      }))
    );

    onSSR(async () => {
      await search({
        slug: path,
        customQuery: { getProductTemplate: 'greenGetProduct' }
      });

      addTags([{ prefix: CacheTagPrefix.Product, value: path }]);
    });

    const selectAcessories = (accessory) => {
      if (selectedAcessories.has(accessory)) {
        selectedAcessories.delete(accessory);
        return;
      }
      selectedAcessories.add(accessory);
    };

    const anyLoading = computed(() => {
      return loading.value || addLoading.value;
    });

    const handleAddItem = async () => {
      const params = {
        products: [{
          id: product.value.id,
          quantity: 1,
          accessoryToIds: [...selectedAcessories]
        }],
        customQuery: { cartAddMultipleItems: 'greenCartAddMultipleItem'}
      };

      await addMultipleProductsToCart(params);
    };

    const handleStoreStatus = () =>{
      toggleStoreModal();
    };

    return {
      productGrades,
      handleStoreStatus,
      handleAddItem,
      selectedAcessories,
      selectAcessories,
      anyLoading,
      combinationInfo,
      loading,
      breadcrumbs,
      product,
      code,
      properties,
      relatedProducts: computed(() =>
        productGetters.getFiltered(relatedProducts.value, { master: true })
      ),
      relatedLoading,
      productGetters,
      productGallery,
      useFacet,
      facetGetters,
      sliderProducts,
      accessoryProducts
    };
  },
  data() {
    return {
      storage: ['128 Gb', '128 Gb', '128 Gb', '128 Gb', '128 Gb'],
      color: ['Gold', 'Red', 'Silver', 'Black', 'Gold'],
      currency: ['$']
    };
  },
  head() {
    return allHead(this.product);
  }
});
</script>

<style lang="scss" scoped>
@import "~/assets/css/product.scss";
</style>
