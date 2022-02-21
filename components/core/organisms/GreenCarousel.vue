<template>
  <div>
    <SfHeading :title="carousel_title" :level="2" />
    <SfCarousel
      :style="{ maxWidth: '1312px', margin: 'auto' }"
      :settings="{
        type: 'carousel',
        rewind: true,
        perView: 4,
        slidePerPage: true,
        gap: 16,
        breakpoints: {
          1279: {
            perView: 2,
            peek: {
              before: 0,
              after: 50,
            },
          },
        },
      }"
    >
      <SfCarouselItem v-for="(item, i) in item.slice(0, 10)" :key="i">
        <SfLink
          :link="localePath(
            `/p/${productGetters.getId(item)}/${productGetters.getSlug(item)}`
          )"
          data-testid="product-link"
        >
          <div class="carousel-item">
            <div>
              <SfImage
                :key="item.id"
                :src="$image(productGetters.getCoverImage(item))"
                alt="product image"
                :width="136"
                :height="266"
                class="carousel-image"
              />
            </div>
            <div class="carousel-item__title">
              {{ item.name }}
            </div>
            <div class="carousel-item__features">
              {{ feature1[i] + " | " + feature2[i] }}
            </div>
            <div class="carousel-item-price__wrapper">
              <div class="carousel-item-bfr__price">
                {{ $t("Fra") }}
              </div>
              <div class="carousel-item__price">
                {{ item.price + currency }}
              </div>
            </div>
          </div>
        </SfLink>
      </SfCarouselItem>
    </SfCarousel>
  </div>
</template>

<script>
import { SfCarousel, SfImage, SfHeading, SfButton, SfLink } from "@storefront-ui/vue";
import { productGetters } from "@vue-storefront/odoo";
import { defineComponent } from "@vue/composition-api";
export default defineComponent({
  components: {
    SfCarousel,
    SfImage,
    SfHeading,
    SfButton,
    SfLink
  },
  props: {
    item: {
      type: Array,
      default: [""],
    },
    feature1: {
      type: Array,
      default: [""],
    },
    feature2: {
      type: Array,
      default: [""],
    },
    currency: {
      type: [String, Array],
      default: "",
    },
    carousel_title: {
      type: String,
      default: "",
    },
  },
  setup() {
    return {
      productGetters,
    };
  },
});
</script>

<style lang="scss" scoped>
::v-deep .sf-image {
  object-fit: contain;
}
::v-deep .sf-heading {
  padding: 3% 0;
  background-color: #f3f3f3;
}
::v-deep .sf-heading__title {
  font: var(--font-family--primary);
  font-size: 34px;
  font-weight: 700;
  line-height: 35px;
}
.carousel-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 493px;
  background-color: #ffffff;
  color: #1d1f22;
  border-radius: 10px;
  font-size: 2.5rem;
}
.carousel-item:hover {
  box-shadow: 0 8px 10px -2px rgba(11, 12, 13, 0.1);
  cursor: pointer;
}
.carousel-image {
  transform: translate(0px, -10px);
}
.carousel-item__title {
  display: flex;
  font-family: "Josefin Sans", sans-serif;
  color: #1d1f22;
  font-size: 26px;
  font-weight: 500;
  text-align: center;
  // line-height: 24;
}
.carousel-item__features {
  display: flex;
  font-family: "Josefin Sans", sans-serif;
  color: #72757e;
  font-size: 18px;
  font-weight: 400;
}
.carousel-item-price__wrapper {
  display: flex;
  flex-direction: row;
  padding-top: 15px;
}
.carousel-item-bfr__price {
  display: flex;
  font-family: "Josefin Sans", sans-serif;
  color: #1d1f22;
  font-size: 18px;
  font-weight: 400;
  padding-right: 5px;
  margin-bottom: auto;
  margin-top: auto;
}
.carousel-item__price {
  display: flex;
  font-family: "Josefin Sans", sans-serif;
  color: #1d1f22;
  font-size: 26px;
  font-weight: 500;
}
::v-deep .sf-carousel__wrapper {
  height: 650px;
}
::v-deep .glide__track {
  transform: scale(0.98, 1);
  padding-top: 10px;
}
::v-deep .sf-carousel__controls {
  width: 90%;
  transform: translate(5%, -100%);
}
::v-deep .sf-button {
  border-radius: 40px;
  background-color: #f1f2f3;
}
::v-deep .sf-button:hover {
  background-color: #7ba393;
}
::v-deep .sf-button:active {
  background-color: #43464e;
}
::v-deep .sf-carousel {
  background-color: #f3f3f3;
}
::v-deep .sf-link {
  text-decoration: none;
}
</style>