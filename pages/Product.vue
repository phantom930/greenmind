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
          <ProductSelectGrade
            :product-attributes="product.attributeValues"
            :base-product-price="price"
            :selected-grade="selectedGrade"
            @update="updateFilter"
          />

          <ProductDescription />

          <div v-if="accessoryProducts.length > 0" class="checkbox-title-wrap">
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
              {{ formatDolar(price) }}
            </p>
            <div class="buttons">
              <GreenButton
                type="Primary"
                color="Green"
                shape="Round"
                size="Medium"
                class="mb-3"
                :disabled="addToCartDisabled"
                :loading="loadingProducts || loading"
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
          <SfTabs :open-tab="1" class="product__tabs">
            <SfTab data-cy="product-tab_description" title="Description">
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
import { SfHeading, SfTabs, SfGallery, SfIcon, SfBreadcrumbs } from '@storefront-ui/vue';
import { ref, computed, reactive, defineComponent } from '@nuxtjs/composition-api';
import { useCache, CacheTagPrefix } from '@vue-storefront/cache';
import { useProduct, useCart, productGetters, useProductVariant, facetGetters, useFacet } from '@vue-storefront/odoo';
import { useCurrency, useUiState } from '~/composables';
import { onSSR } from '@vue-storefront/core';
import { useRoute } from '@nuxtjs/composition-api';
import LazyHydrate from 'vue-lazy-hydration';

export default defineComponent({
  name: 'Product',
  components: {
    SfHeading,
    SfTabs,
    SfGallery,
    SfIcon,
    SfBreadcrumbs,
    LazyHydrate
  },
  transition: 'fade',
  setup(props, { root }) {
    const route = useRoute();
    const loadingProducts = ref(false);
    const selectedAcessories = reactive(new Set([]));
    const { toggleStoreModal } = useUiState();
    const { id } = route.value.params;
    const { formatDolar } = useCurrency();
    const { query } = root.$route;
    const { products, search, loading: productloading } = useProduct(`products-${id}`);
    const { searchRealProduct, productVariants, realProduct, elementNames } = useProductVariant(query);
    const { products: relatedProducts, loading: relatedLoading } = useProduct('relatedProducts');
    const { addItem, loading } = useCart();
    const { addTags } = useCache();

    const product = computed(() => {
      return {
        ...products.value,
        realProduct: realProduct.value
      };
    });

    const options = computed(() => productGetters.getAttributes(product.value, ['color', 'size']));
    const description = computed(() => productGetters.getDescription(product.value));
    const properties = computed(() => productGetters.getProperties(product.value));
    const code = computed(() => productGetters.getCode(product.value));
    const price = computed(() => productGetters.getPrice(product.value)?.regular || 0);
    const breadcrumbs = computed(() => facetGetters.getBreadcrumbsByProduct(product.value));
    const sliderProducts = computed(() => product.value.alternativeProducts || []);
    const accessoryProducts = computed(() => products?.value?.accessoryProducts || []);
    const attributesWithoutGrade = computed(() => product.value?.variantAttributeValues?.filter(attribute => attribute.attribute?.name !== 'Grade'));
    const selectedGrade = computed(() => route.value?.query?.Grade);

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
        combinationIds: Object.values(root.$route.query)
      });
    };

    onSSR(async () => {
      loadingProducts.value = true;
      try {
        await search({
          id: parseInt(id),
          customQuery: { getProductTemplate: 'greenGetProduct' }
        });

        await searchRealProductWithGradeSelected();

      } finally {
        loadingProducts.value = false;
      }

      addTags([{ prefix: CacheTagPrefix.Product, value: id }]);
    });

    const updateFilter = (filter) => {
      const attributesParams = {};
      attributesWithoutGrade.value?.forEach(item => {
        attributesParams[item.attribute?.name] = item.id;
      });

      root.$router.push({
        path: root.$route.path,
        query: { ...root.$route.query, ...filter, ...attributesParams }
      });
    };

    const checkSelected = (attribute, value) => {
      return root.$route.query[attribute] === value;
    };

    const selectAcessories = (accessory) => {
      if (selectedAcessories.has(accessory)) {
        selectedAcessories.delete(accessory);
        return;
      }
      selectedAcessories.add(accessory);
    };

    const addToCartDisabled = computed(() => {
      if (!selectedGrade.value) {
        return true;
      }
      return loadingProducts.value || loading.value;
    });

    const handleAddItem = async () => {
      await addItem({
        product: { firstVariant: product.value.id },
        quantity: 1,
        customQuery: { cartAddItem: 'greenCartAddItem'}
      });
    };

    const handleStoreStatus = () =>{
      toggleStoreModal();
    }

    return {
      handleStoreStatus,
      handleAddItem,
      selectedAcessories,
      selectAcessories,
      loadingProducts,
      addToCartDisabled,
      selectedGrade,
      price,
      formatDolar,
      productloading,
      breadcrumbs,
      checkSelected,
      elementNames,
      updateFilter,
      product,
      code,
      description,
      properties,
      relatedProducts: computed(() =>
        productGetters.getFiltered(relatedProducts.value, { master: true })
      ),
      relatedLoading,
      options,
      loading,
      productGetters,
      productVariants,
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
});
</script>

<style lang="scss" scoped>
@import "~/assets/css/product.scss";
</style>
