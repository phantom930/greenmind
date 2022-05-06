<template>
  <div class="perks">
    <div class="perk">
      <img :src="require('/assets/images/personaldetails/clock.svg')">
      <p class="label">
        {{ $t('Faster') }}<br>{{ $t('checkout') }}
      </p>
    </div>
    <div class="perk">
      <img :src="require('/assets/images/personaldetails/coins.svg')">
      <p class="label">
        {{ $t('Earn credits with every') }}<br>
        {{ $t('purchase') }}
      </p>
    </div>
    <div class="perk">
      <img :src="require('/assets/images/personaldetails/award.svg')">
      <p class="label">
        {{ $t('Full rewards program') }}<br>
        {{ $t('benefits') }}
      </p>
    </div>
    <div class="perk perk-favourite">
      <img
        :src="require('/assets/images/personaldetails/favourites.svg')"
      >
      <p class="label">
        {{ $t('Manage your wishlist') }}
      </p>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  setup() {

  }
});
</script>
