<template>
  <div class="product-details">
    <div class="link-prices-wrap">
      <div class="links">
        <p>Vælg stand</p>
        <a href="#">Læs mere</a>
      </div>
      <div class="prices-wrap">
        <span
          v-for="(attribute, index) in gradeAttributes"
          :key="index"
          class="price-discount-wrap"
        >
          <div
            class="price-wrap cursor-pointer"
            :class="{'border-solid border-2 border-emerald-200 ': parseInt(selectedGrade) === attribute.id}"
            @click="chooseGrade(attribute)"
          >
            <p>{{ attribute.name }}</p>
            <div class="price">{{ baseProductPrice }}</div>
          </div>
          <div class="discount">0</div>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, PropType } from '@nuxtjs/composition-api';
import { AttributeValue } from '@vue-storefront/odoo-api';

export default defineComponent({
  props: {
    productAttributes: {
      type: Array as PropType<Array<AttributeValue>>,
      default: () => ([])
    },
    baseProductPrice: {
      type: Number,
      required: true
    },
    selectedGrade: {
      type: String,
      default: ''
    }
  },
  emits: ['update'],
  setup (props, { emit }) {
    const gradeAttributes : ComputedRef<AttributeValue[]> =
      computed(() => props.productAttributes?.filter(item => item.attribute.name === 'Grade'));

    const chooseGrade = (attribute : AttributeValue) => {
      emit('update', { Grade: attribute.id });
    };

    return {
      chooseGrade,
      gradeAttributes
    };
  }
});
</script>

<style scoped lang="scss">
@import url(~/assets/css/selectGrade.scss);
</style>
