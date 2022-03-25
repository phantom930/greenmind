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
          :class="isSelectedGrade(attribute) ? 'active' : ''"
        >
          <div
            class="price-wrap cursor-pointer"
            :class="{'border-solid border-2 border-emerald-200 ': parseInt(selectedGrade) === attribute.id}"
            @click="chooseGrade(attribute)"
          >
            <p>{{ attribute.name }}</p>
            <div class="price">{{ combinationInfo.price }}</div>
          </div>
          <div
            v-if="isSelectedGrade(attribute) && combinationInfo.has_discounted_price"
            class="discount"
          >{{ formatDolar(combinationInfo.list_price) }}</div>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, PropType } from '@nuxtjs/composition-api';
import { AttributeValue } from '@vue-storefront/odoo-api';
import { useCurrency } from '~/composables';
import { CombinationInfo } from '~/green-api/types';

export default defineComponent({
  props: {
    productAttributes: {
      type: Array as PropType<Array<AttributeValue>>,
      default: () => ([])
    },
    combinationInfo: {
      type: Object as PropType<CombinationInfo>,
      default: () => ({})
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

    const isSelectedGrade = (attribute : AttributeValue): boolean =>
      props.combinationInfo.display_name.includes(attribute.name);

    const chooseGrade = (attribute : AttributeValue) => {
      if (isSelectedGrade(attribute)) return;

      emit('update', attribute.id);
    };

    return {
      isSelectedGrade,
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
