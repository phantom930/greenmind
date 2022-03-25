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
              :price="accessoryProduct.price"
              :has-image="true"
              :image="$image(accessoryProduct.image)"
              @change="selectAcessories"
            />
          </div>

          <div class="total-price-buttons">
            <p class="total-price">
              {{ formatDinamarques(combinationInfo.price) }}
            </p>
            <div class="buttons">
              <GreenButton
                type="Primary"
                color="Green"
                shape="Round"
                size="Medium"
                class="mb-3"
                :disabled="addToCartDisabled"
                :loading="loadingProducts"
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
import { SfHeading, SfGallery, SfIcon, SfBreadcrumbs } from '@storefront-ui/vue';
import { ref, computed, reactive, defineComponent } from '@nuxtjs/composition-api';
import { useCache, CacheTagPrefix } from '@vue-storefront/cache';
import { useProduct, useProductVariant, facetGetters, useFacet, useMultipleProduct } from '@vue-storefront/odoo';
import { useCurrency, useUiState, productGetters } from '~/composables';
import { GreenGraphQlAddMultipleProductsParams } from 'green-api/types';
import { onSSR } from '@vue-storefront/core';
import { useRoute } from '@nuxtjs/composition-api';
import LazyHydrate from 'vue-lazy-hydration';

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
    const { query, params} = useRoute().value;
    const loadingProducts = ref(false);
    const selectedAcessories = reactive(new Set([]));
    const { toggleStoreModal } = useUiState();
    const { formatDinamarques } = useCurrency();
    const { products, search, loading } = useProduct(`products-${params.id}`);
    const { searchRealProduct, realProduct, elementNames } = useProductVariant(query);
    const { products: relatedProducts, loading: relatedLoading } = useProduct('relatedProducts');
    const { addMultipleProductsToCart } = useMultipleProduct(GreenGraphQlAddMultipleProductsParams);
    const { addTags } = useCache();

    const product = computed(() => {
      return {
        ...products.value,
        ...realProduct.value?.product
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
        mobile: { url: root.$image(img.small) },
        desktop: { url: root.$image(img.normal) },
        big: { url: root.$image(img.big) },
        alt: product.value.name || 'alt'
      }))
    );

    const searchRealProductWithGradeSelected = async() => {
      if (!query.Grade) return;

      await searchRealProduct({
        productTemplateId: product.value?.productTemplate?.id,
        combinationIds: Object.values(root.$route.query),
        customQuery: { getRealProduct: 'greenGetRealProduct'}
      });
    };

    onSSR(async () => {
      loadingProducts.value = true;
      try {
        await search({
          id: parseInt(params.id),
          customQuery: { getProductTemplate: 'greenGetProduct' }
        });

        // await searchRealProductWithGradeSelected();

      } finally {
        loadingProducts.value = false;
      }

      addTags([{ prefix: CacheTagPrefix.Product, value: params.id }]);
    });

    const selectAcessories = (accessory) => {
      if (selectedAcessories.has(accessory)) {
        selectedAcessories.delete(accessory);
        return;
      }
      selectedAcessories.add(accessory);
    };

    const addToCartDisabled = computed(() => {
      return loadingProducts.value;
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
      loadingProducts,
      addToCartDisabled,
      combinationInfo,
      formatDinamarques,
      loading,
      breadcrumbs,
      elementNames,
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
      realProduct,
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
  }
});
</script>

<style lang="scss" scoped>
@import "~/assets/css/product.scss";
</style>
