<template>
  <div class="product-details">
    <div class="link-prices-wrap">
      <div class="links">
        <p>{{ $t('Select stand') }}</p>
        <a href="/standbeskrivelser">{{ $t('read more') }}</a>
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
            <div class="price">{{ 0 }}</div>
          </div>
          <div class="discount">{{ formatDolar(baseProductPrice) }}</div>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, PropType } from '@nuxtjs/composition-api';
import { AttributeValue } from '@vue-storefront/odoo-api';
import { useCurrency } from '~/composables';

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
    const { formatDolar } = useCurrency();

    const gradeAttributes : ComputedRef<AttributeValue[]> =
      computed(() => props.productAttributes?.filter(item => item.attribute.name === 'Grade'));

    const chooseGrade = (attribute : AttributeValue) => {
      emit('update', { Grade: attribute.id });
    };

    return {
      chooseGrade,
      gradeAttributes,
      formatDolar
    };
  }
});
</script>

<style scoped lang="scss">
@import '~/assets/css/selectGrade.scss';
</style>
