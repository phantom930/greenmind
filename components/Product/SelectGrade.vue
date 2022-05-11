<template>
  <div class="product-details">
    <div class="link-prices-wrap">
      <div class="links">
        <p>{{ $t('Select stand') }}</p>
        <a href="/standbeskrivelser">{{ $t('read more') }}</a>
      </div>
      <div class="prices-wrap">
        <div
          v-for="(grade, index) in productGrades"
          :key="index"
          custom
          :to="{ name: 'product', params: {id: grade.product_id }}"
          class="price-discount-wrap"
          :class="isSelectedGrade(grade) ? 'active' : ''"
        >
          <span
            role="link"
            @keypress.enter="navigate"
          >
            <div
              class="price-wrap cursor-pointer"
              @click="chooseGrade(grade)"
            >
              <p> {{ grade.grade_name }} </p>
              <div class="price">
                {{ $currency(grade.price) }}
              </div>
            </div>
            <div
              v-if="grade.has_discounted_price"
              class="discount"
            >
              {{ $currency(grade.list_price) }}
            </div>

          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api';
import { CombinationInfo } from '~/green-api/types';

export default defineComponent({
  props: {
    productGrades: {
      type: Array as PropType<Array<CombinationInfo>>,
      default: () => ([])
    },
    productVariantId: {
      type: Number,
      default: 0
    }
  },
  emits: ['update'],
  setup (props, { emit }) {

    const isSelectedGrade = (info : CombinationInfo): boolean =>
      props.productVariantId === info.product_id;

    const chooseGrade = (info : CombinationInfo) => {
      if (isSelectedGrade(info)) return;

      emit('update', info.product_id);
    };

    return {
      isSelectedGrade,
      chooseGrade
    };
  }
});
</script>

<style scoped lang="scss">
@import '~/assets/css/selectGrade.scss';
</style>
