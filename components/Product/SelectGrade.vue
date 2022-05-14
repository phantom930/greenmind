<template>
  <div class="product-details">
    <div class="link-prices-wrap">
      <div class="links">
        <p>{{ $t('Select stand') }}</p>
        <nuxt-link :to="{ name: 'stand-descriptions' }">
          {{ $t('read more') }}
        </nuxt-link>
      </div>
      <div class="prices-wrap">
        <button
          v-for="(grade, index) in productGrades"
          :key="index"
          custom
          class="price-discount-wrap"
          :class="isSelectedGrade(grade) ? 'active' : ''"
        >
          <span role="link">
            <div
              class="price-wrap"
              @click="chooseGrade(grade)"
            >
              <p v-for="(name, index) in breakName(grade.grade_name)" :key="index"> {{ name }} </p>
              <div class="price">
                {{ isPriceLessThanFiveOrWithoutstock(grade) ? $t('Out of stock') :$currency(grade.price) }}
              </div>
            </div>
            <div
              v-if="grade.has_discounted_price"
              class="discount"
            >
              {{ $currency(grade.list_price) }}
            </div>

          </span>
        </button>
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

      emit('update', info.slug);
    };

    const breakName = (name: string) : string[] => name.split('-');

    const isPriceLessThanFiveOrWithoutstock = (info : CombinationInfo): boolean => {
      if (info.stock_qty === 0 || info.price < 5) {
        return true;
      }
      return false;
    };

    return {
      isSelectedGrade,
      chooseGrade,
      breakName,
      isPriceLessThanFiveOrWithoutstock
    };
  }
});
</script>

<style scoped lang="scss">
@import '~/assets/css/selectGrade.scss';
</style>
