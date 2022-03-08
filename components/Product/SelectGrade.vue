<template>
  <div class="product-details">
    <div class="link-prices-wrap">
      <div class="links">
        <p>Vælg stand</p>
        <a href="#">Læs mere</a>
      </div>
      <div class="prices-wrap">
        <a
          href="#"
          class="price-discount-wrap"
        >
          <div class="price-wrap">
            <p>Ny vare</p>
            <div class="price">2.395,-</div>
          </div>
          <div class="discount">2.989,-</div>
        </a>
        <a
          href="#"
          class="price-discount-wrap"
        >
          <div class="price-wrap">
            <p>Som ny</p>
            <div class="price">2.395,-</div>
          </div>
        </a>
        <a
          href="#"
          class="price-discount-wrap"
        >
          <div class="price-wrap">
            <p>Meget flot</p>
            <div class="price">2.395,-</div>
          </div>
        </a>
        <a
          href="#"
          class="price-discount-wrap"
        >
          <div class="price-wrap">
            <p>Okay</p>
            <div class="price">2.395,-</div>
          </div>
        </a>
        <a
          href="#"
          class="price-discount-wrap"
        >
          <div class="price-wrap">
            <p>Slidt</p>
            <div class="price">2.395,-</div>
          </div>
        </a>
      </div>
    </div>
    <div class="description-wrap">
      <div class="title-main">
        Meget flot
      </div>
      <p class="description-main">
        Screen: May have micro-scratches which are not noticeable when<br>
        the screen is turned on. Body: Has visible scratches and/or dents
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
export default defineComponent({
  props: {
    productAttributes: {
      type: Array,
      default: () => ([])
    }
  },
  setup () {

  },
  data() {
    return {
      stock: 5
    };
  }
});
</script>

<style scoped lang="scss">
@import url(~/assets/css/selectGrade.scss);
</style>
