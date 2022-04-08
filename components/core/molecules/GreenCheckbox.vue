<template>
  <SfCheckbox
    v-model="model"
    :name="name"
    :label="label"
    hint-message=""
    :required="required"
    info-message=""
    error-message=""
    valid
    :disabled="disabled"
    style="--checkbox-border-radius: 100px; margin-right: 7px"
    @change="$emit('input', model)"
  >
    <template
      v-if="hasGeneralWrapper"
      #label
    >
      <div
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
          {{ price }}
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
    name: {
      type: String,
      default: ''
    },
    label: {
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
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  emits: ['input'],
  setup() {
    const model = ref(false);

    return {
      model
    };
  },
  watch: {
    isChecked() {
      this.model = this.isChecked;
    }
  },
  mounted() {
    this.model = this.isChecked;
  }
});
</script>

<style scoped>
@import '~/assets/css/greenCheckbox.scss';
</style>
