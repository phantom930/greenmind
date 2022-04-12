<template>
  <div class="product-details">
    <div class="link-prices-wrap">
      <div class="links">
        <p>{{ $t('Select stand') }}</p>
        <a href="/standbeskrivelser">{{ $t('read more') }}</a>
      </div>
      <div class="prices-wrap">
        <nuxt-link
          v-for="(grade, index) in productGrades"
          :key="index"
          tag="span"
          :to="{ name: 'product', params: {id: grade.product_id }}"
          class="price-discount-wrap"
          :class="isSelectedGrade(grade) ? 'active' : ''"
        >
          <div
            class="price-wrap cursor-pointer"
            @click="chooseGrade(grade)"
          >
            <p> {{ grade.grade_name }} </p>
            <div class="price">
              {{ $n(grade.price, 'currency') }}
            </div>
          </div>
          <div
            v-if="grade.has_discounted_price"
            class="discount"
          >
            {{ $n(grade.list_price, 'currency') }}
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, useRoute } from '@nuxtjs/composition-api';
import { useCurrency } from '~/composables';
import { CombinationInfo } from '~/green-api/types';

export default defineComponent({
  props: {
    productGrades: {
      type: Array as PropType<Array<CombinationInfo>>,
      default: () => ([])
    },
    selectedGrade: {
      type: String,
      default: ''
    }
  },
  emits: ['update'],
  setup (props, { emit }) {
    const { params } = useRoute().value;

    const isSelectedGrade = (info : CombinationInfo): boolean =>
      Number(params.id) === info.product_id;

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
