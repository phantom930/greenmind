<template>
  <div
    v-if="loading"
    style="height: 500px"
  >
    <SfLoader :loading="loading" />
  </div>
  <div v-else id="product">
    <SfBreadcrumbs
      class="breadcrumbs desktop-only"
      :breadcrumbs="breadcrumbs"
    />
    <div class="product">
      <LazyHydrate when-idle>
        <GreenGallery
          :bullets="$breakpoints.sMd"
          :images="productGallery"
          :image-width="mainImageWidth"
          :image-height="mainImageHeigth"
          :thumb-width="160"
          :thumb-height="160"
          :slider-options="{ classes: 'items-center'}"
          image-tag="nuxt-picture"
          :nuxt-img-config="{ fit: 'cover', sizes: `md:${mainImageWidth}px`}"
          :thumb-nuxt-img-config="{ fit: 'cover' }"
          class="product__gallery"
        >
          <template v-show="$breakpoints.sMd" #thumbs>
            <div />
          </template>
        </GreenGallery>
      </LazyHydrate>
      <div class="product__info">
        <div class="product__header">
          <SfHeading
            :title="productGetters.getName(product)"
            :level="3"
            class="sf-heading--no-underline sf-heading--left product_title"
          />
          <!-- <SfIcon
            icon="drag"
            size="xxl"
            color="var(--c-text-disabled)"
            class="product__drag-icon smartphone-only"
          /> -->
        </div>
        <SfHeading

          :title="product.websiteSubtitle"
          :level="3"
          class="sf-heading--no-underline sf-heading--left product_variants"
        />
        <div>
          <LazyProductSelectGrade
            v-if="productGrades && productGrades.length > 0"
            :product-grades="productGrades"
            :product-variant-id="combinationInfo.product_id"
            @update="handleSelectNewGrade"
          />

          <div
            v-if="accessoryProducts && accessoryProducts.length > 0"
            class="checkbox-title-wrap"
          >
            <div class="title">
              {{ $t("Purchases") }}
            </div>
            <GreenCheckbox
              v-for="accessoryProduct in product.accessoryProducts"
              :key="accessoryProduct.id"
              :value="accessoryProduct.id"
              :emit-value="true"
              :title="accessoryProduct.combinationInfoVariant.display_name"
              :description="accessoryProduct.description"
              :price="$currency(accessoryProduct.combinationInfoVariant.price)"
              :has-image="true"
              :disabled="!productInStock"
              :image="$image(accessoryProduct.image, 82, 70, accessoryProduct.imageFilename)"
              @change="selectAcessories(accessoryProduct.id)"
            />
          </div>

          <div class="total-price-buttons mt-7">
            <p class="total-price">
              {{ productInStock ? $currency(combinationInfo.price) : $t('Out of stock') }}
            </p>
            <div class="buttons">
              <GreenButton
                style-type="Primary"
                color="Green"
                shape="Round"
                size="Medium"
                class="mb-3"
                :disabled="anyLoading || !productInStock"
                :loading="anyLoading"
                @click="handleAddItem()"
              >
                {{ productInStock ? $t("Add to Cart") : $t('Out of stock') }}
              </GreenButton>

              <!-- <GreenButton
                style-type="Secondary"
                color="Green"
                shape="Round"
                size="Medium"
                @click="handleStoreStatus"
              >
                {{ $t("SEE STOCK STATUS IN STORE") }}
              </GreenButton> -->
            </div>
          </div>
        </div>

        <LazyHydrate when-idle>
          <LazyBannerProducts />
        </LazyHydrate>

        <LazyHydrate when-idle>
          <LazyProductTabs :product="product" />
        </LazyHydrate>
      </div>
    </div>
    <div class="product_carousel">
      <LazyHydrate when-idle>
        <LazyGreenCarousel
          v-if="sliderProducts && sliderProducts.length > 0"
          :item="sliderProducts"
          :carousel_title="$t('Popular products')"
          style="padding-top: 5%"
        />
      </LazyHydrate>
    </div>
  </div>
</template>
<script >
import { computed, defineComponent, reactive, useRoute, useRouter, watch } from '@nuxtjs/composition-api';
import { SfBreadcrumbs, SfHeading, SfLoader } from '@storefront-ui/vue';
import { CacheTagPrefix, useCache } from '@vue-storefront/cache';
import { onSSR } from '@vue-storefront/core';
import { useFacet, useMultipleProduct, useProduct } from '@vue-storefront/odoo';
import LazyHydrate from 'vue-lazy-hydration';
import { facetGetters, productGetters, useUiState } from '~/composables';
import {setAddToCart, setTrackViewItem} from "~/resources/tracking";
export default defineComponent({
  name: 'Product',
  components: {
    SfHeading,
    SfLoader,
    SfBreadcrumbs,
    LazyHydrate
  },
  transition: 'fade',
  setup(props, { root }) {
    const { path } = useRoute().value;
    const selectedAcessories = reactive(new Set([]));
    const { toggleStoreModal } = useUiState();
    const { toggleCartSidebar, isCartSidebarOpen } = useUiState();
    const { products, search, loading } = useProduct(`products-${path}`);
    const { products: relatedProducts, loading: relatedLoading } = useProduct('relatedProducts');
    const { addMultipleProductsToCart, loading: addLoading } = useMultipleProduct();
    const { addTags } = useCache();
    const router = useRouter();

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
    const productInStock = computed(() => product.value?.isInStock);

    const mainImageWidth = computed(() => {
      return root.$breakpoints.sSm ? 375 : root.$breakpoints.sLg ? 288 : 442;
    });
    const mainImageHeigth = computed(() => {
      return root.$breakpoints.sSm ? 500 : root.$breakpoints.sLg ? 375 : 664;
    });

    const productGallery = computed(() =>
      [
        ...productGetters.getGallery(product.value).map((img) => ({
          mobile: { url: root.$image(img.small, 160, 160, productGetters.getImageFilename(product.value)) },
          desktop: { url: root.$image(img.normal, mainImageWidth.value, mainImageHeigth.value, productGetters.getImageFilename(product.value)) },
          big: { url: root.$image(img.big, mainImageWidth.value, mainImageHeigth.value, productGetters.getImageFilename(product.value)) },
          alt: product.value.name || 'alt'
        })),
        ...product?.value?.mediaGallery?.map(img => ({
          mobile: { url: root.$image(img.image, 160, 160, productGetters.getImageFilename(img)) },
          desktop: { url: root.$image(img.image, mainImageWidth.value, mainImageHeigth.value, productGetters.getImageFilename(img)) },
          big: { url: root.$image(img.image, mainImageWidth.value, mainImageHeigth.value, productGetters.getImageFilename(img)) },
          alt: product.value.name || 'alt'
        })) || []

      ]
    );

    const handleSelectNewGrade = async (slug) => {
      router.push({ path: slug, params: { keepScroll: true}});
    };

    onSSR(async () => {
      await search({
        slug: path,
        customQuery: { getProductTemplate: 'greenGetProduct' }
      });

      if (!product.value.id) {
        root.$nuxt.error({ statusCode: 404, message: '' });
        return;
      }
      addTags([{ prefix: CacheTagPrefix.Product, value: path }]);
    });

    watch(products, () => {
       if(products.value) {
        setTrackViewItem(products.value);
      }
    })

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
      if (!productInStock.value) return;

      const params = {
        products: [{
          id: product.value.id,
          quantity: 1,
          accessoryToIds: [...selectedAcessories]
        }],
        customQuery: { cartAddMultipleItems: 'greenCartAddMultipleItem'}
      };

      await addMultipleProductsToCart(params);

      setAddToCart(product.value);

      // eslint-disable-next-line no-undef
      Clerk('cart', 'add', product.value.id);
      if (!isCartSidebarOpen.value) {
        toggleCartSidebar();
      }
    };

    const handleStoreStatus = () =>{
      toggleStoreModal();
    };

    return {
      productInStock,
      mainImageWidth,
      mainImageHeigth,
      handleSelectNewGrade,
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
  head() {
    return {
      title: this.product?.jsonLdname,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.product?.description
        },
        { hid: 'twitter-site', name: 'twitter:site', content: '@greenmind' },
        { hid: 'twitter-type', name: 'twitter:card', content: 'summary_large_image' },
        { hid: 'twitter-title', name: 'twitter:title', content: this.combinationInfo?.display_name || ''},
        { hid: 'twitter-desc', name: 'twitter:description', content: this.product?.description || '' },
        { hid: 'twitter-image', name: 'twitter:image', content: this.productGallery?.[0]?.desktop?.url || '' },
        { hid: 'twitter-image:alt', name: 'twitter:image:alt', content: this.productGallery?.[0]?.alt || 'product_image' }
      ],
      script: [{
        type: 'application/ld+json',
        json: this.product?.jsonLd
      }]
    };
  }
});
</script>

<style lang="scss" scoped>
@import "~/assets/css/product.scss";
</style>
