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
    :disabled="disabled"
    :selected="false"
    style="--checkbox-border-radius:100px"
    @change="$emit('change', $vnode.key)"
  >
    <template #label>
      <div
        v-if="hasGeneralWrapper"
        class="general_wrapper"
      >
        <div
          v-if="hasImage"
          class="img-description-wrap"
        >
          <img
            :src="image"
            :width="82"
            :height="70"
            class="checkbox_image"
          >
          <div class="description-wrap">
            <div class="title-link">
              <div class="product-title">
                {{ title }}
              </div>
              <a href="#">{{ linkTitle }}</a>
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
              <a href="#" />
            </div>
            <p class="product-description">
              {{ description }}
            </p>
          </div>
        </div>
        <div class="price">
          {{ price }},-
        </div>
      </div>
    </template>
  </SfCheckbox>
</template>

<script lang="ts">
import { SfCheckbox } from '@storefront-ui/vue';
import { ref, defineComponent } from '@nuxtjs/composition-api';
export default defineComponent({
  components: {
    SfCheckbox
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    linkTitle: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    price: {
      type: [String, Number],
      default: ''
    },
    img: {
      type: String,
      default: ''
    },
    isChecked: {
      type: Boolean,
      default: false
    },
    hasImage: {
      type: Boolean,
      default: false
    },
    image: {
      type: String,
      default: ''
    },
    hasGeneralWrapper: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['change'],
  setup() {
    const checked = ref(false);

    return {
      checked
    };
  },
  watch: {
    isChecked () {
      this.checked = this.isChecked;
    }
  },
  mounted () {
    this.checked = this.isChecked;
  }
});
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
    margin-right: 80px;
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
