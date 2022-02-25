<template>
  <SfCheckbox
    v-model="checked"
    name="shipping"
    label="I want to create an account"
    hint-message=""
    :required="false"
    info-message=""
    error-message=""
    valid
    :disabled="false"
    :selected="false"
    style="--checkbox-border-radius:100px"
  >
    <div
      slot="label"
    >
      <div class="general_wrapper">
        <div
          v-if="has_image"
          class="img-description-wrap"
        >
          <img
            :src="image"
            class="checkbox_image"
          >
          <div class="description-wrap">
            <div class="title-link">
              <div class="product-title">
                {{ title }}
              </div>
              <a href="#">{{ link_title }}</a>
            </div>
            <p class="product-description">
              {{ description }}
            </p>
          </div>
        </div>
        <div
          v-else
          class="img-description-wrap"
        >
          <div class="description-wrap">
            <div class="title-link">
              <div class="product-title">
                {{ title }}
              </div>
              <a href="#">{{ link_title }}</a>
            </div>
            <p class="product-description">
              {{ description }}
            </p>
          </div>
        </div>
        <div class="price">
          {{ price }}
        </div>
      </div>
    </div>
  </SfCheckbox>
</template>

<script>
import { SfCheckbox } from '@storefront-ui/vue';
import { ref } from '@vue/composition-api';
export default {
  components: {
    SfCheckbox
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    link_title: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    price: {
      type: String,
      default: ''
    },
    img: {
      type: String,
      default: ''
    },
    has_image: {
      type: Boolean,
      default: false
    },
    image: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const checked = ref(false);

    return {
      checked
    };
  }
};
</script>

<style scoped>
.img-description-wrap {
    display: flex;
    align-items: center;
    padding-left: 6%;
}
.description-wrap {
    margin-left: 16px;
}
.title-link {
    display: flex;
    align-items: center;
}
.product-title {
    font-size: 20px;
    font-weight: 500;
    color: var(--_c-greenmind-secondary-black);
    margin-right: 16px;
}
.title-link a {
    color: var(--_c-greenmind-primary-blue);
    border-bottom: 1px solid var(--_c-greenmind-primary-blue);
    line-height: 12px;
}
.product-description {
    font-size: 14px;
    font-weight: 400;
    color: var(--_c-greenmind-primary-grey);
    max-width: 285px;
}
.price {
    position: absolute;
    top: 3px;
    right: 0;
    font-size: 20px;
    font-weight: 500;
    color: var(--_c-greenmind-secondary-black);
}
::v-deep .sf-checkbox__checkmark.is-active {
    background: var(--_c-greenmind-fern-primary-medium-green, transparent);
}
.checkbox_image {
    max-width: 82px;
    max-height: 70px;
}
</style>
